import { PathLike } from "fs"
import { readFile, writeFile, stat } from "fs/promises"

export async function transformFiles(
  sourceFiles: PathLike[],
  transform: (content: string, path: PathLike) => Promise<[string | Buffer, PathLike]>
) {
  await Promise.all([
    ...sourceFiles.map(async (inputFile) => {
      const content = await readFile(inputFile, "utf-8")
      const [new_content, outputFile] = await transform(content, inputFile)

      await writeFileWithStats(inputFile, outputFile, new_content)
    }),
  ])
}

export async function writeFileWithStats(inputFile: PathLike, outputFile: PathLike, new_content: string | Buffer) {
  const initialSize = (await stat(inputFile)).size / 1024
  await writeFile(outputFile, new_content)
  const postSize = (await stat(outputFile)).size / 1024
  console.log(`${outputFile}: ${initialSize} -> ${postSize} KB`)
}

import swc from "@swc/core"

import glob from "fast-glob"
import { transformFiles } from "./lib.js"
import { PathLike } from "fs"

async function main() {
  const htmlFiles = await glob(["./build/web/**/*.js"], {
    dot: true,
    cwd: process.cwd(),
    onlyFiles: true,
    absolute: true,
  })
  await transformFiles(htmlFiles, async (content: string, path: PathLike) => {
    const result = await swc.transform(content, {
      filename: path as string,
      swcrc: true,
    })

    return [result.code ?? "", path]
  })
}

await main()

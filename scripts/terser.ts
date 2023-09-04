import { minify } from "terser"

import { options } from "./.terserrc.js"

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
    const result = await minify({ [path as string]: content }, options)
    return [result.code ?? "", path]
  })
}

await main()

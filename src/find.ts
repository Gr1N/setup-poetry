import { addPath } from "@actions/core"
import { exec } from "@actions/exec"
import { cacheDir, downloadTool, find } from "@actions/tool-cache"
import { Inputs } from "./inputs"
import os from "os"
import path from "path"

const GET_POETRY_URL =
  "https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py"

export async function findPoetry(inputs: Inputs): Promise<void> {
  // If Poetry version is specified then we try to find a cached version and if it found
  // then we add it to the jobs PATH (should work only in case of private runners)
  if (inputs.version) {
    const poetryFoundPath = find("poetry", inputs.version)
    if (poetryFoundPath) {
      addPath(getPoetryBin(poetryFoundPath))
      return
    }
  }

  // Download get-poetry.py
  const getPoetryPath = await downloadTool(GET_POETRY_URL)

  // Run Poetry installation script
  await exec("python", [getPoetryPath, ...getPoetryArgs(inputs)])

  // If Poetry installed with specified version then add it to the cache and to the jobs
  // PATH, otherwise, just add it to the jobs PATH
  const poetryPath = path.join(os.homedir(), ".poetry")
  if (inputs.version) {
    const poetryCachedPath = await cacheDir(
      poetryPath,
      "poetry",
      inputs.version
    )
    addPath(getPoetryBin(poetryCachedPath))
  } else {
    addPath(getPoetryBin(poetryPath))
  }
}

function getPoetryArgs(inputs: Inputs): string[] {
  const args: string[] = ["--yes"]

  if (inputs.preview) {
    args.push("--preview")
  }
  if (inputs.version) {
    args.push(`--version=${inputs.version}`)
  }

  return args
}

function getPoetryBin(poetryPath: string): string {
  return path.join(poetryPath, "bin")
}

import * as core from "@actions/core"
import * as exec from "@actions/exec"
import * as tc from "@actions/tool-cache"
import { Inputs } from "./inputs"
import os from "os"
import path from "path"

const GET_POETRY_URL =
  "https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py"

export async function findPoetry(inputs: Inputs): Promise<void> {
  // If Poetry version is specified then we try to find a cached version and if it found
  // then we add it to the jobs PATH (should work only in case of private runners)
  if (inputs.version) {
    const poetryFoundPath = tc.find("poetry", inputs.version)
    if (poetryFoundPath) {
      core.addPath(getPoetryBin(poetryFoundPath))
      return
    }
  }

  // Download get-poetry.py
  const getPoetryPath = await tc.downloadTool(GET_POETRY_URL)

  // Run Poetry installation script
  await exec.exec("python", [getPoetryPath, ...getPoetryArgs(inputs)])

  // If Poetry installed with specified version then add it to the cache and to the jobs
  // PATH, otherwise, just add it to the jobs PATH
  const poetryPath = path.join(os.homedir(), ".poetry")
  if (inputs.version) {
    const poetryCachedPath = await tc.cacheDir(
      poetryPath,
      "poetry",
      inputs.version
    )
    core.addPath(getPoetryBin(poetryCachedPath))
  } else {
    core.addPath(getPoetryBin(poetryPath))
  }
}

function getPoetryArgs(inputs: Inputs): string[] {
  const args: string[] = ["--yes"]

  if (inputs.preview) {
    args.push("--preview=true")
  }
  if (inputs.version) {
    args.push(`--version=${inputs.version}`)
  }

  return args
}

function getPoetryBin(poetryPath: string): string {
  return path.join(poetryPath, "bin")
}

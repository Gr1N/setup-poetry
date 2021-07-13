import { addPath } from "@actions/core"
import { exec } from "@actions/exec"
import { downloadTool } from "@actions/tool-cache"
import { Inputs } from "./inputs"
import os from "os"
import path from "path"

const GET_POETRY_URL =
  "https://raw.githubusercontent.com/python-poetry/poetry/master/install-poetry.py"

export async function findPoetry(inputs: Inputs): Promise<void> {
  // Download get-poetry.py
  const getPoetryPath = await downloadTool(GET_POETRY_URL)

  // Run Poetry installation script
  await exec("python", [getPoetryPath, ...getPoetryInstallArgs(inputs)])

  // Add Poetry executable to the PATH
  const poetryPath = path.join(os.homedir(), ...getPoetryPathArgs())
  addPath(poetryPath)
}

function getPoetryInstallArgs(inputs: Inputs): string[] {
  const args: string[] = ["--yes"]

  if (inputs.preview) {
    args.push("--preview")
  }
  if (inputs.version) {
    args.push(`--version=${inputs.version}`)
  }

  return args
}

function getPoetryPathArgs(): string[] {
  switch (os.platform()) {
    case "win32":
      return ["AppData", "Roaming", "Python", "Scripts"]
    default:
      return [".local", "bin"]
  }
}

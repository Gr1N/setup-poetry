import { addPath, info } from "@actions/core"
import { getExecOutput } from "@actions/exec"
import { downloadTool } from "@actions/tool-cache"
import { Inputs } from "./inputs"
import { readFile } from "fs/promises"
import os from "os"
import path from "path"

const GET_POETRY_URL = "https://install.python-poetry.org"
const ERROR_LOG_PATH_RE = /See (.+\.log) for error logs\./

export async function findPoetry(inputs: Inputs): Promise<void> {
  // Download get-poetry.py
  const getPoetryPath = await downloadTool(GET_POETRY_URL)

  // Run Poetry installation script
  const { exitCode, stdout } = await getExecOutput(
    "python",
    [getPoetryPath, ...getPoetryInstallArgs(inputs)],
    { ignoreReturnCode: true }
  )
  if (exitCode !== 0) {
    await printErrorLog(stdout)
    throw new Error(`Poetry installation failed with exit code ${exitCode}`)
  }

  // Add Poetry executable to the PATH
  const poetryPath = path.join(os.homedir(), ...getPoetryPathArgs())
  addPath(poetryPath)
}

export function getErrorLogPath(output: string): string | null {
  const match = ERROR_LOG_PATH_RE.exec(output)
  return match ? match[1] : null
}

async function printErrorLog(output: string): Promise<void> {
  const errorLogPath = getErrorLogPath(output)
  if (!errorLogPath) {
    return
  }

  try {
    const errorLog = await readFile(errorLogPath, "utf8")
    info(`Poetry installer error log (${errorLogPath}):\n${errorLog}`)
  } catch {
    // The log is only a debugging aid, so a missing log must not hide the
    // installation failure itself
  }
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

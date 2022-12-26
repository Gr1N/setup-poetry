import { setFailed } from "@actions/core"
import { findPoetry } from "./find"
import { getInputs } from "./inputs"

async function run(): Promise<void> {
  try {
    const inputs = getInputs()

    await findPoetry(inputs)
  } catch (error) {
    setFailed(errorAsMessage(error))
  }
}

function errorAsMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}

run()

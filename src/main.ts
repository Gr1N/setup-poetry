import * as core from "@actions/core"
import { findPoetry } from "./find"
import { getInputs } from "./inputs"

async function run(): Promise<void> {
  try {
    const inputs = getInputs()

    await findPoetry(inputs)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

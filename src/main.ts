import { setFailed } from "@actions/core"
import { findPoetry } from "./find"
import { getInputs } from "./inputs"

async function run(): Promise<void> {
  try {
    const inputs = getInputs()

    await findPoetry(inputs)
  } catch (error) {
    setFailed(error.message)
  }
}

run()

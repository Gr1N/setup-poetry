import * as core from "@actions/core"

async function run(): Promise<void> {
  try {
    const test: string = core.getInput("test")
    core.debug(`Test input value is ${test}`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

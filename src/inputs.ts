import * as core from "@actions/core"
import * as semver from "semver"

export interface Inputs {
  // Finder related inputs
  preview: boolean
  version: string | null
}

export function getInputs(): Inputs {
  return {
    preview: getBooleanInput("poetry-preview"),
    version: getVersionInput("poetry-version")
  }
}

export function getBooleanInput(
  name: string,
  default_: boolean = false
): boolean {
  const value = core.getInput(name)
  if (!value) {
    return default_
  }

  return value === "true"
}

export function getVersionInput(name: string): string | null {
  const version = core.getInput(name)
  if (!version) {
    return null
  }

  const coerced = semver.coerce(version)
  if (!coerced) {
    throw new Error(`Passed Poetry version '${version}' is not a valid`)
  } else if (!semver.satisfies(coerced, ">=1.0")) {
    throw new Error(
      `Passed Poetry version '${coerced}' is not supported.
       Please use any other supported version >=1.0`
    )
  }

  return coerced.format()
}

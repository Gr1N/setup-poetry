import { getBooleanInput, getInputs, getVersionInput } from "../src/inputs"

const TEST_ENV_VARS = {
  INPUT_MISSING: "",
  INPUT_FALSY: "false",
  INPUT_TRUTHY: "true",
  INPUT_VERSION_UNSUPPORTED: "0.12.0",
  INPUT_VERSION_SUPPORTED: "1.0.0",
  INPUT_VERSION_ALPHA: "1.2.0a1",

  "INPUT_POETRY-PREVIEW": "true",
  "INPUT_POETRY-VERSION": "1.2.0"
}

describe("options", () => {
  beforeEach(() => {
    for (const key in TEST_ENV_VARS) {
      process.env[key] = TEST_ENV_VARS[key as keyof typeof TEST_ENV_VARS]
    }
  })

  afterEach(() => {
    for (const key in TEST_ENV_VARS) {
      Reflect.deleteProperty(TEST_ENV_VARS, key)
    }
  })

  it("getBooleanInput returns false if input is missing", () => {
    expect(getBooleanInput("missing")).toBeFalsy()
  })

  it("getBooleanInput returns false if input is falsy", () => {
    expect(getBooleanInput("falsy")).toBeFalsy()
  })

  it("getBooleanInput returns true if input is truthy", () => {
    expect(getBooleanInput("truthy")).toBeTruthy()
  })

  it("getVersionInput returns null if input is missing", () => {
    expect(getVersionInput("missing")).toBeNull()
  })

  it("getInputs returns inputs", () => {
    expect(getInputs()).toStrictEqual({ preview: true, version: "1.2.0" })
  })

  it("getVersionInput throws if input is not valid", () => {
    expect(() => getVersionInput("falsy")).toThrow(
      "Passed Poetry version 'false' is not a valid"
    )
  })

  it("getVersionInput throws if input is not supported", () => {
    expect(() => getVersionInput("version_unsupported")).toThrow(
      "Passed Poetry version '0.12.0' is not supported"
    )
  })

  it("getVersionInput returns version if input is supported", () => {
    expect(getVersionInput("version_supported")).toBe("1.0.0")
  })

  it("getVersionInput returns version if input is alpha", () => {
    expect(getVersionInput("version_alpha")).toBe("1.2.0a1")
  })
})

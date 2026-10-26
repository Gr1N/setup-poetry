import { getErrorLogPath } from "../src/find"

describe("find", () => {
  it("getErrorLogPath returns null if output has no error log", () => {
    expect(getErrorLogPath("Installing Poetry (2.5.1): Done")).toBeNull()
  })

  it("getErrorLogPath returns error log path", () => {
    const output = [
      "Installing Poetry (2.5.1): An error occurred. Removing partial environment.",
      "Poetry installation failed.",
      "See /home/runner/work/repo/poetry-installer-error-8841z44u.log for error logs.",
      ""
    ].join("\n")

    expect(getErrorLogPath(output)).toBe(
      "/home/runner/work/repo/poetry-installer-error-8841z44u.log"
    )
  })

  it("getErrorLogPath returns error log path with spaces and colors", () => {
    const output =
      "\u001b[31mSee C:\\Users\\runner admin\\poetry-installer-error-x1.log for error logs.\u001b[0m\n"

    expect(getErrorLogPath(output)).toBe(
      "C:\\Users\\runner admin\\poetry-installer-error-x1.log"
    )
  })
})

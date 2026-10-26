# setup-poetry

[![Build Status](https://github.com/Gr1N/setup-poetry/workflows/default/badge.svg)](https://github.com/Gr1N/setup-poetry/actions?query=workflow%3Adefault)

This action sets up a [Poetry](https://python-poetry.org) for use in actions by installing a version of Poetry and adding to PATH. The action will fail if no matching versions are found.

This action supports versions of:

- Python `>=3.10`
- Poetry `>=1.0`

## Changelog

### v10

- Action updated to use Node 24. Self-hosted runners must be v2.327.1 or newer, and Node 24 does not run on macOS 13.4 and lower
- Support for Python 3.13, 3.14 and 3.15
- Print the Poetry installer error log when installation fails #51
- **Breaking Change**, removed support for Python 3.8 and 3.9, Poetry 2.x requires Python 3.10 or newer #49

### v9

- Action updated to use Node 20
- Support for Python 3.12
- **Breaking Change**, removed support for Python 3.7

### v8

- Action updated to use Node 16
- Support for Python 3.10 and 3.11
- **Breaking Change**, removed support for Python 3.6

### v7

- **Fix**, support MacOS platform #21

### v6

- Support Windows platform #19

### v5

- **Breaking Change**, support new Poetry installation script. According to the official documentation it's primarily designed to work with Poetry 1.2 and higher. It also works with earlier versions of Poetry but some features may be unsupported like `self update` #16
- **Breaking Change**, remove passed version coercion, for example, version `1.0` from `v5` will not be coerced to `1.0.0`. So, from `v5` it's required to specify a full and valid version of Poetry desired to be installed #16

## Usage

### Install latest available version of Poetry

```yaml
steps:
  - uses: actions/checkout@v7
  - uses: actions/setup-python@v7
    with:
      python-version: "3.14"
  - uses: Gr1N/setup-poetry@v10
  - run: poetry --version
```

### Exact version of Poetry to install, using SemVer's version syntax

```yaml
steps:
  - uses: actions/checkout@v7
  - uses: actions/setup-python@v7
    with:
      python-version: "3.14"
  - uses: Gr1N/setup-poetry@v10
    with:
      poetry-version: "2.5.1"
  - run: poetry --version
```

### Allow to install prerelease versions of Poetry

```yaml
steps:
  - uses: actions/checkout@v7
  - uses: actions/setup-python@v7
    with:
      python-version: "3.14"
  - uses: Gr1N/setup-poetry@v10
    with:
      poetry-preview: true
  - run: poetry --version
```

### Cache dependencies to speed up workflows

```yaml
steps:
  - uses: actions/checkout@v7
  - uses: actions/setup-python@v7
    with:
      python-version: "3.14"
  - uses: Gr1N/setup-poetry@v10
  - uses: actions/cache@v6
    with:
      path: ~/.cache/pypoetry/virtualenvs
      key: ${{ runner.os }}-poetry-${{ hashFiles('poetry.lock') }}
  - run: poetry --version
```

### Configure Poetry using environment variables

Poetry can be configured using environment variables and in case of CI/CD it can be a preferred way for you.

A full list of available settings can be found at [official documentation](https://python-poetry.org/docs/configuration/#using-environment-variables).

```yaml
steps:
  - uses: actions/checkout@v7
  - uses: actions/setup-python@v7
    with:
      python-version: "3.14"
  - uses: Gr1N/setup-poetry@v10
  - run: poetry --version
    env:
      POETRY_VIRTUALENVS_PATH: /path/to/virtualenvs/directory
      POETRY_HTTP_BASIC_MY_REPOSITORY_PASSWORD: secret
```

## Contributing

Feel free to submit any PR you want, they are always welcome.

## License

`setup-poetry` is licensed under the MIT license. See the license file for details.

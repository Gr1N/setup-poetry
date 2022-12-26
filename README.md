# setup-poetry

[![Build Status](https://github.com/Gr1N/setup-poetry/workflows/default/badge.svg)](https://github.com/Gr1N/setup-poetry/actions?query=workflow%3Adefault)

This action sets up a [Poetry](https://python-poetry.org) for use in actions by installing a version of Poetry and adding to PATH. The action will fail if no matching versions are found.

This action supports versions of:

- Python `>=3.7`
- Poetry `>=1.0`

## Changelog

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
  - uses: actions/checkout@v3
  - uses: actions/setup-python@v4
    with:
      python-version: "3.11"
  - uses: Gr1N/setup-poetry@v8
  - run: poetry --version
```

### Exact version of Poetry to install, using SemVer's version syntax

```yaml
steps:
  - uses: actions/checkout@v3
  - uses: actions/setup-python@v4
    with:
      python-version: "3.11"
  - uses: Gr1N/setup-poetry@v8
    with:
      poetry-version: "1.2.2"
  - run: poetry --version
```

### Allow to install prerelease versions of Poetry

```yaml
steps:
  - uses: actions/checkout@v3
  - uses: actions/setup-python@v4
    with:
      python-version: "3.11"
  - uses: Gr1N/setup-poetry@v8
    with:
      poetry-preview: true
  - run: poetry --version
```

### Cache dependencies to speed up workflows

```yaml
steps:
  - uses: actions/checkout@v3
  - uses: actions/setup-python@v4
    with:
      python-version: "3.11"
  - uses: Gr1N/setup-poetry@v8
  - uses: actions/cache@v2
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
  - uses: actions/checkout@v3
  - uses: actions/setup-python@v4
    with:
      python-version: "3.11"
  - uses: Gr1N/setup-poetry@v8
  - run: poetry --version
    env:
      POETRY_VIRTUALENVS_PATH: /path/to/virtualenvs/directory
      POETRY_HTTP_BASIC_MY_REPOSITORY_PASSWORD: secret
```

## Contributing

Feel free to submit any PR you want, they are always welcome.

## License

`setup-poetry` is licensed under the MIT license. See the license file for details.

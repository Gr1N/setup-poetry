# setup-poetry

[![Build Status](https://github.com/Gr1N/setup-poetry/workflows/default/badge.svg)](https://github.com/Gr1N/setup-poetry/actions?query=workflow%3Adefault)

This action sets up a [Poetry](https://python-poetry.org) for use in actions by installing a version of Poetry and adding to PATH. The action will fail if no matching versions are found.

This action supports versions of:

- Python `>=3.6`;
- Poetry `>=1.0`.

## Usage

See [action.yml](https://github.com/Gr1N/setup-poetry/blob/master/action.yml).

### Install latest available version of Poetry

```yaml
steps:
  - uses: actions/checkout@v1
  - uses: actions/setup-python@v1
    with:
      python-version: 3.8
  - uses: Gr1N/setup-poetry@v1
  - run: poetry --version
```

### Exact version of Poetry to install, using SemVer's version syntax

```yaml
steps:
  - uses: actions/checkout@v1
  - uses: actions/setup-python@v1
    with:
      python-version: 3.8
  - uses: Gr1N/setup-poetry@v1
    with:
      poetry-version: 1.0.0
  - run: poetry --version
```

### Allow to install prerelease versions of Poetry

```yaml
steps:
  - uses: actions/checkout@v1
  - uses: actions/setup-python@v1
    with:
      python-version: 3.8
  - uses: Gr1N/setup-poetry@v1
    with:
      poetry-preview: true
  - run: poetry --version
```

## Contributing

Feel free to submit any PR you want, they are always welcome.

## License

`setup-poetry` is licensed under the MIT license. See the license file for details.

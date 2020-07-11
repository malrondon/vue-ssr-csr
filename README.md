# Vue SSR and CSR

[![licence mit](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](http://hemersonvianna.mit-license.org/)
[![GitHub issues](https://img.shields.io/github/issues/malrondon/vue-ssr-csr.svg)](https://github.com/malrondon/vue-ssr-csr/issues)
![GitHub package.json version](https://img.shields.io/github/package-json/v/malrondon/vue-ssr-csr.svg)
![GitHub Release Date](https://img.shields.io/github/release-date/malrondon/vue-ssr-csr.svg)
![GitHub top language](https://img.shields.io/github/languages/top/malrondon/vue-ssr-csr.svg)
![GitHub repo size](https://img.shields.io/github/repo-size/malrondon/vue-ssr-csr.svg)
![GitHub All Releases](https://img.shields.io/github/downloads/malrondon/vue-ssr-csr/total.svg)

## Prerequisites

- [Node = v10.15.x](https://nodejs.org/en/)
- NPM >= v6.4.x
- [Yarn >= v1.3.2](https://yarnpkg.com/en/docs/install#linux-tab) or `npm install -g yarn`

### .gitconfig

Git's merge commit message

```bash
[alias]
  mergelogmsg = "!f() { var=$(git symbolic-ref --short HEAD) && printf 'Merge branch %s into %s\n\n::SUMMARY::\nBranch %s commits:\n' $1 $var $1 > temp_merge_msg && git log --format=format:'%s' $var..$1 >> temp_merge_msg && printf '\n\nBranch %s commits:\n' $var >> temp_merge_msg && git log --format=format:'%s' $1..$var >> temp_merge_msg && printf '\n\n* * * * * * * * * * * * * * * * * * * * * * * * *\n::DETAILS::\n' >> temp_merge_msg && git log --left-right $var...$1 >> temp_merge_msg && git merge --no-ff --no-commit $1 && git commit -eF temp_merge_msg; rm -f temp_merge_msg;}; f"
```

## Environment Variables

```
// ./internals/webpack/config.js
// values ​​configured for development
PUBLIC_URL=http://localhost:8000
NODE_ENV=development
```

## Install

```bash
yarn
```

## Commands

- **yarn start:development**: start server in development mode [http://localhost:8000](http://localhost:8000)

- **yarn build**: to build files
- **yarn start**: start server in production mode

- **yarn lint:sass**: to run linter (scss)
- **yarn lint:js**: to run linter (js)
- **yarn lint**: to run `lint:sass and lint:js`

- **yarn release**: to create tag

## Create Tag

Current tag example: 1.0.0-beta.4

Command:

```bash
yarn release 1.0.0-beta.5
```

Questions and answers:

```sh
- ? Show updated files? `Yes`
- M  package.json

- ? Commit (Release 1.0.0-beta.5)? `Yes`
- ? Tag (1.0.0-beta.5)? `Yes`
- ? Push? `Yes`
- ? Publish "salles" to npm? `No`
```

## Log

Check [Releases](https://github.com/malrondon/vue-ssr-csr/releases) for detailed changelog.

## License

[MIT license](http://hemersonvianna.mit-license.org/) © Hemerson Vianna

# Alert when new npm dependencies added to a project

This GitHub Action will add rich metadata about new packages when they are added in Pull Requests in the form of a comment.

![Add a comment in a Pull Request informing of newly added dependencies](https://raw.githubusercontent.com/lirantal/github-action-new-dependencies-alerts/main/.github/new-dependencies-alerts-screenshot.png)

## Why?

Adding new dependencies in a project should never be a small change, and often
it should trigger discussions between maintainers. This action can help you
making sure that you are not missing the addition of new package in your npm project's
`dependencies` and `devDependencies`.

## How does it work?

To highlight new packages, this action compares the list of dependencies 
present in the current pull request branch with the ones present in the base branch.

This check only occurs for each `package.json` file added or updated with the
current pull request. This action is not only looking at the root-level `package.json` but potentially
any existing `package.json` in the project to be compatible with monorepo  projects.

## Inputs

### `token`

Specify the built-in secrets available to Actions via the `token` input. Here's an example for a step in the job:

```yml
      - name: "Deps: show dependencies metadata"
        uses: lirantal/new-dependencies-action@v1.1.0
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

```

Not required.

## Usage

This _GitHub Action_ should run everytime a commit is pushed to the pull request
to check any potential addition or change in one of your `package.json`.

```yml
name: "Deps: show dependencies metadata"
on:
  - pull_request

jobs:
  dpes_check_new_dependencies:
    runs-on: ubuntu-latest
    steps:
      - name: "Checkout repo for a local instance"
        uses: actions/checkout@v2
        
      - name: "Deps: show dependencies metadata"
        uses: lirantal/new-dependencies-action@v1.1.0
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

```

## License

This project is released under the MIT License.

## Author

Damien Senger <hello@raccoon.studio>

Liran Tal <liran.tal@gmail.com>

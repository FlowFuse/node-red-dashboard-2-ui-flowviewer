# Dashboard 2.0 Node: `ui-flowviewer`

This node allows you to render Node-RED `flow.json` files within [FlowFuse Dashboard](https://dashboard.flowfuse.com).

![ui-flowviewer](https://github.com/user-attachments/assets/01d6d165-f261-47f4-b22e-7a1f0379ec39)
_Screenshot showing the flow viewer in a Dashboard._

## Configuration

### Properties

- **size**: Width and height of the renderer in the context of the Dashboard layout. If you use _"auto"_ sizing, then the renderer will always display with a minimum height of "4" rows.
- **flow**: A valid Node-RED `flow.json`.

### Dynamic Configuration

You can inject `msg.ui_update.flow` messages to the node in order to override the rendered flow. See the "/examples" folder for a demo flow.

## Release process

In this project, the [Release Please](https://github.com/googleapis/release-please) is used to automatically determine the next release version based on the commit messages in the codebase.

By using the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), the project adheres to a standardized format for commit messages, which `Release Please` uses to determine whether the next release should be a major, minor, or patch release.

### Components

1. The `Prepare release` GitHub Action workflow:

    * A Release Please action that analyzes commit messages to determine the type of release required (major, minor, patch) based on the Conventional Commits specification
    * Creates a pre-release pull request with the proposed version bump and changelog
    * Once merged, automatically updates the version number in `package.json` and creates a new release on GitHub with the appropriate changelog

2. The `Lint Pull Request Title` GitHub Action workflow:

    * A workflow that runs on pull request creation and uses the `amannn/action-semantic-pull-request` action to validate that pull request titles follow the Conventional Commits format
    * Together with adjusted default merge commit message, this ensures that all commits merged into the main branch adhere to the expected format, allowing Release Please to function correctly

3. The `Release` GitHub Action workflow:

    * A workflow that runs when a new git tag in `v*.*.*` format is pushed, builds and tests the package and publishes the new version to the public npm registry using the `JS-DevTools/npm-publish` action
    * Once package is published, the workflow updates the package version in the Node-RED Flow Library catalogue

### Pull Request Title Format

The Conventional Commits preset expects pull request titles to be in the following format:

```
<type>(<scope>): <subject>
```

* Type: Describes the category of the commit. Examples include:
    * `feat`: A new feature (triggers a minor version bump).
    * `fix`: A bug fix (triggers a patch version bump).
    * `perf`: A code change that improves performance (triggers a patch version bump).
    * `refactor`: A code change that neither fixes a bug nor adds a feature (does not trigger a release unless it's accompanied by a BREAKING CHANGE).
    * `docs`: Documentation-only changes (does not trigger a release).
    * `chore`: Changes to the build process or auxiliary tools and libraries (does not trigger a release).
* Scope: An optional part that provides additional context about what was changed (e.g., module, component).
* Subject: A brief description of the changes.

### Handling Breaking Changes

To indicate a breaking change, the exclamation mark `!` should be used immediately after the type/scope:

* `feat!:`
* `fix!:`
* `refactor!:`

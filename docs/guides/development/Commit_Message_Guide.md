# Common Keywords in Git Commit Messages

## Keywords

- feat: Introduce a new feature or functionality.
- fix: Fix a bug or issue in the code.
- docs: Changes or additions to documentation.
- style: Formatting changes that do not affect the code logic (white-space, formatting, missing semi-colons, etc.).
- refactor: Code changes that neither fix a bug nor add a feature, typically aimed at improving code structure.
- perf: Changes that improve performance.
- test: Adding or modifying tests.
- chore: Maintenance tasks that don't modify src or test files (e.g., changes to the build process, auxiliary tools, libraries).
- build: Changes that affect the build system or external dependencies (e.g., gulp, broccoli, npm).
- ci: Changes to our CI configuration files and scripts (e.g., GitHub Actions, GitLab CI).
- revert: Revert a previous commit.

## Usage in Commit Messages

When using these keywords, include them at the beginning of your commit's subject line followed by a colon and a space, then a concise description of the change. For example:

- `feat: Add user authentication mechanism`
- `fix: Resolve array indexing bug in invoice generation`
- `docs: Update README with project setup guidelines`

For more information: 
https://www.conventionalcommits.org/en/v1.0.0/

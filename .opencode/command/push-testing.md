---
description: Commit changes to testing and push, without merging to master
agent: build
---

Push the current changes to the `testing` branch without opening pull requests or merging into `staging` or `master`. Follow this flow without asking for confirmation at each step:

1. Verify you are on the `testing` branch with `git branch --show-current`. If the branch does not exist, create it from the current branch with `git checkout -b testing`. If you are on another existing branch, switch to `testing` with `git checkout testing` before committing.
2. Inspect `git status`, `git diff` and `git log --oneline -5` to understand the changes and the commit style (they are written in Spanish).
3. If there are modified files, run `npm run format` to apply Prettier.
4. Run `git add -A` and commit with a short Spanish message describing the changes.
5. Run `git push origin testing`.
6. Run `git fetch origin` and report: commit hash, push status and the state of the `testing` branch. Do not create pull requests or merge any branch.

Extra context from the user (use it as the commit message if applicable): $ARGUMENTS

---
description: Commit changes to testing, open a testing -> staging PR and merge it
agent: build
---

Push the current changes to the `testing` branch, open a pull request from `testing` into `staging`, and merge it. Follow this flow without asking for confirmation at each step:

1. Verify you are on the `testing` branch with `git branch --show-current`. If the branch does not exist, create it from the current branch with `git checkout -b testing`. If you are on another existing branch, switch to `testing` with `git checkout testing` before committing.
2. Inspect `git status`, `git diff` and `git log --oneline -5` to understand the changes and the commit style (they are written in Spanish).
3. If there are modified files, run `npm run format` to apply Prettier.
4. Run `git add -A` and commit with a short Spanish message describing the changes.
5. Run `git push origin testing`.
6. If `origin/staging` does not exist, create it from `master` with `git checkout -b staging origin/master`, `git push origin staging` and return to `testing`.
7. If a `testing` -> `staging` pull request is not already open, create it with `gh pr create --base staging --head testing`. Use the commit message as the title and a Spanish summary of the included changes as the body.
8. Merge the pull request with `gh pr merge --merge`.
9. Run `git fetch origin` and report: commit hash, PR URL and merge status.

Extra context from the user (use it as the commit message if applicable): $ARGUMENTS

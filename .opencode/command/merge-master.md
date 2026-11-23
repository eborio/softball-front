---
description: Commit changes to testing, open a testing -> master PR, merge it and publish a release
agent: build
---

Push the current changes to the `testing` branch, open a pull request from `testing` into `master`, merge it and publish a release. Follow this flow without asking for confirmation at each step:

1. Verify you are on the `testing` branch with `git branch --show-current`. If the branch does not exist, create it from the current branch with `git checkout -b testing`. If you are on another existing branch, switch to `testing` with `git checkout testing` before committing.
2. Inspect `git status`, `git diff` and `git log --oneline -5` to understand the changes and the commit style (they are written in Spanish).
3. If there are modified files, run `npm run format` to apply Prettier.
4. Run `git add -A` and, if there are staged changes, commit with a short Spanish message describing the changes.
5. Determine the next semantic version:
   - Read the latest version tag: `git tag --sort=-v:refname | grep -E '^v[0-9]+\.[0-9]+\.[0-9]+$' | head -1`. If there is no tag, start at `v1.0.0`.
   - If `$ARGUMENTS` contains an explicit version (`vX.Y.Z`), use it.
   - Otherwise analyze `git log <last-tag>..HEAD --no-merges --oneline` and apply semver: MAJOR for breaking changes, MINOR for new features, PATCH for fixes.
   - If the bump is ambiguous, ask the user once for the version.
   - If the chosen version already exists as a tag, stop and report it.
6. Update the project's own `CHANGELOG.md`: prepend the new version to the existing content using the release notes format below, keeping all previous entries. Create the file if it does not exist and only include changes since the last tag. This file is the source for the GitHub release notes. Commit it on `testing` with `Release vX.Y.Z - <short description>`.
7. Run `git push origin testing`.
8. If a `testing` -> `master` pull request is not already open, create it with `gh pr create --base master --head testing`. Use the release commit message as the title and a Spanish summary of the included changes as the body.
9. Merge the pull request with `gh pr merge --merge`.
10. Run `git fetch origin`, then `git checkout master` and `git pull --ff-only origin master`.
11. Create an annotated tag and push it: `git tag -a vX.Y.Z -m "Release vX.Y.Z - <short description>"` and `git push origin vX.Y.Z`.
12. Create the GitHub release using only the current version section from `CHANGELOG.md`: write it to a temporary file and run `gh release create vX.Y.Z --title "vX.Y.Z" --notes-file <temporary-notes-file>`. Remove the temporary file afterwards.
13. Report: version, commit hash, PR URL, release URL and merge status.

Release notes format (English, markdown):

```markdown
## vX.Y.Z

Release date: YYYY-MM-DD

### Added

- ...

### Changed

- ...

### Removed

- ...

### Integrity

Tag: `vX.Y.Z`
```

Extra context from the user (use it as the commit message or version if applicable): $ARGUMENTS

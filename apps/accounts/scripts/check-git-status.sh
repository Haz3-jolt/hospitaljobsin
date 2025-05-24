set -e

if [ -z "$(git status --porcelain)" ]; then
  # Working directory clean
  exit 0
else
  echo "Detected changes in the working directory:"
  git --no-pager diff --stat
  exit 1
fi

# How to develop

Either use `devcontainers` in VSCode or, locally, you need:
- `node 18.10`
- `clasp`, globally

## How to develop and deploy
- `clasp login`
- copy `.clasp.json.example` to `clasp.json`
- change `<some_script_id>` with your script id, if you don't have one, create a script
- `clasp push --watch`
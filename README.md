# \<co-editor\> demo with socket.io

This is a real-time collaborative text editor app. Its purpose is to demonstrate how to use the `<co-editor>` web component ([GitHub](https://github.com/pekam/co-editor)) in a centralized architecture by broadcasting the updates from clients to others through a server with web sockets.

## Run instructions:
```
npm install
node app.js
```

### Command line arguments (optional):
- `--port`: the port to use, defaults to `3000`
- `--delay`: the delay added to the message passing in milliseconds, defaults to `5000`

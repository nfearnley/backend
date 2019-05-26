# backend

This is a template for a backend server running Express and Mongoose.

It was made for my friend lilytastic.

Configuration can be set be editing `config.js`. Ideally, you would load these values from environmental variables, or a .env file.

To run the project, you can use either `npm start` or `node .`.

If you want to do some debugging, you can use `node --inspect .` or `node --inspect-brk .` and connect with your preferred debugger. I recommend using [Chrome's dedicated DevTools for Node](https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27).

I used `express-promise-router` and return promises from each of my routes because makes error handling a lot cleaner. You can throw errors created by the `http-errors` module and they will be handled nicely by `middleware/httpErrorHandler`.

A Postman collection is available for this API:
1. Open Postman
2. Click the "Import" button
3. Click the "Import From Link" tab
4. Paste this [link](https://www.getpostman.com/collections/c08a70ffa9650b4be056)
5. Click "Import"

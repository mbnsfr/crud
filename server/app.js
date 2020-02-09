
const express = require('express');
const { ParseServer } = require('parse-server');

const app = express();
const api = new ParseServer({
  databaseURI: 'mongodb://172.17.0.2:27017', // Connection string for your MongoDB database
  // cloud: '/home/myApp/cloud/main.js', // Absolute path to your Cloud Code
  appId: 'myAppId',
  masterKey: 'myMasterKey', // Keep this key secret!
  fileKey: 'optionalFileKey',
  serverURL: 'http://localhost:1337/parse', // Don't forget to change to https if needed
});
app.use('/parse', api);
app.listen(1337, () => {
  console.log('parse-server-example running on port 1337.');
});

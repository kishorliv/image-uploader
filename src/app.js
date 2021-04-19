const express = require('express');
const path = require('path');

const app = express();

// needed for POST or PUT requests
// not needed if third party libraries like axios is used in the client side
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'dist')));

// send index.html on any route
app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

module.exports = app;

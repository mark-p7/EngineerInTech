// Make express server
const express = require('express');
const app = express();
const port = 8888;

// Start server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

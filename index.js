const express = require('express');
const app = express();
const port = process.env.NODE_APP_PORT || 3000;
const api = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);

app.listen(port, (err) => {
  if(err){
    throw new Error('Oops, something went wrong !');
  }
  console.log(`Server listening on port ${port}`);
});
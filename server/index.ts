import express from 'express';
import { navigationProperties } from './models/navigation-properties';
const app = express();
const port = process.env.port || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/navigation', (req, res) => {
    res.send(navigationProperties.getNavigationProperties());
  });


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
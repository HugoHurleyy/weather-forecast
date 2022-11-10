import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Nothing to see');
});

app.post('/', async (req, res) => {
  const { cityName, navLang } = req.body;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=${navLang}&appid=${process.env.API_KEY}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

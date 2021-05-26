import express, { Router } from 'express';
import cors from 'cors';
import Bot from './src/main.js';

const app = express();

const routes = Router();

routes.get('/', (_req, response) =>
  response.send(
    `Hello, you can invite bot from <a href="https://discord.com/oauth2/authorize?client_id=846537391564783656&permissions=8&scope=bot">here</a>`
  )
);

app.use(
  cors({
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Access-Control-Allow-Origin', 'Accept'],
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 1337, () => {
  console.log('[app] started!');
  new Bot().start();
});

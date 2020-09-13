import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`[App]: Server listening on ${port}`);
});

export { app };

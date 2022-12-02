/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import SequelizeStore from 'connect-session-sequelize';
import FileUpload from 'express-fileupload';
import db from './config/Database.js';
import UserRoute from './routes/userRoute.js';
import ProductRoute from './routes/ProductRoute.js';
import AuthRoute from './routes/AuthRoute.js';

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

// eslint-disable-next-line new-cap
const store = new sessionStore({
  db,
});

// (async () => {
//   await db.sync();
// })();

app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: true,
  store,
  cookie: {
    secure: 'auto',
  },
}));

app.use(cors({
  credentials: true,
  origin: ['http://localhost:9000', 'http://localhost:3000'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(FileUpload());
app.use(express.static('static'));
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log(`Server Running in port http://localhost:${process.env.APP_PORT}`);
});

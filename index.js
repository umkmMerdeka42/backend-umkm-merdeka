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

const PORT = process.env.PORT || 5000;

const app = express();

const sessionStore = SequelizeStore(session.Store);

// eslint-disable-next-line new-cap
const store = new sessionStore({
  db,
});

(async () => {
    await db.sync();
  })();
store.sync();
  
app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: true,
  proxy: true,
  store,
  cookie: {
    secure: true,
    httpOnly: false,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24
  },
}));

app.use(cors({
  credentials: true,
  origin: [
    'http://localhost:9000',
    'http://localhost:3000',
    'http://127.0.0.1:8080',
    'https://umkm-merdeka-dashboard.netlify.app',
    'https://umkm-merdeka.netlify.app'
  ],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(FileUpload());
app.use(express.static('static'));
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);


app.get('/', (req, res) => {
  res.send('<h1>Halo, Selamat datang di UMKM Merdeka API</h1>');
});

app.listen(PORT, () => {
  console.log(`Server Running in port http://localhost:${PORT}`);
});

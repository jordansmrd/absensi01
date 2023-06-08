// require('dotenv/config');
// const express = require('express');
// const cors = require('cors');
const { join } = require('path');
const express = require('express');
const dotenv = require('dotenv');
// const app = express();
const cors = require('cors');
dotenv.config(join(__dirname, '../.env')); //baca env di linux
// const PORT = process.env.PORT;

// app.use(cors());
// app.use(express.json());
const db = require('./models');
const router = require('./routes');
const verifyAPI = require('./middlewares/verify');
// db.sequelize.sync({ alter: true });

const PORT = process.env.PORT || 8000;
const app = express();
app.use(
 cors({
  // origin: [
  //   process.env.WHITELISTED_DOMAIN &&
  //     process.env.WHITELISTED_DOMAIN.split(","),
  // ],
 })
);

app.use(express.json());

//#region API ROUTES

// ===========================
// NOTE : Add your routes here
db.sequelize.sync({ alter: true });
app.use(verifyAPI);

app.use('/api/Users', router.userRouter);
app.use('/api/Companies', router.compRouter);
app.use('/api/attendancelog', router.attlogRouter);
app.use('/api/avatar', express.static(`${__dirname}/public/avatar`));

app.get('/api', (req, res) => {
 res.send(`Hello, this is my API`);
});

app.get('/api/greetings', (req, res, next) => {
 res.status(200).json({
  message: 'Hello, Student !'
 });
});

// ===========================

// not found
app.use((req, res, next) => {
 if (req.path.includes('/api/')) {
  res.status(404).send('Not found !');
 } else {
  next();
 }
});

// error
app.use((err, req, res, next) => {
 if (req.path.includes('/api/')) {
  console.error('Error : ', err.stack);
  res.status(500).send('Error !');
 } else {
  next();
 }
});

//#endregion

//#region CLIENT
const clientPath = '../../client/build';
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get('*', (req, res) => {
 res.sendFile(join(__dirname, clientPath, 'index.html'));
});

//#endregion

app.listen(PORT, (err) => {
 if (err) {
  console.log(`ERROR: ${err}`);
 } else {
  console.log(`APP RUNNING at ${PORT} ✅`);
 }
});

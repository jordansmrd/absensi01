const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
dotenv.config();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
const db = require('./models');
const router = require('./routes');
const verifyAPI = require('./middlewares/verify');
db.sequelize.sync({ alter: true });

app.use(verifyAPI);

app.use('/Users', router.userRouter);
app.use('/Companies', router.compRouter);
app.use('/attendancelog', router.attlogRouter);
app.use('/avatar', express.static(`${__dirname}/public/avatar`));

app.listen(PORT, () => {
 console.log(`server is running on port ${PORT}`);
});

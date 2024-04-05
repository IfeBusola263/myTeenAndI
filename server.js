import express from 'express';
import cors from 'cors';
import router from './routes/index';

const PORT = 3000;
// const HOST = 'localhost';
const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);

app.listen(PORT, () => {
  console.log(`SERVER is running on PORT ${PORT}`);
});

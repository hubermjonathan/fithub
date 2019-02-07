import express form 'express';
const app = express();
import router from './routes';

app.use('/', router);

const port = 8000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});

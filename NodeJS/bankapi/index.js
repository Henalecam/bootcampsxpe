import { Express } from 'express';
import accountsRouter from './routes/accounts';

const app = express();
app.use(express.json());
app.use('/account'accountsRouter);
app.listen(3000, () => {
  console.log('API Started!');
});

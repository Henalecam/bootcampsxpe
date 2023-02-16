import express from 'express';
import accountsRouter from './routes/accounts.js';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

const app = express();

app.use(express.json());

app.use('/account', accountsRouter);

app.listen(3000, async () => {
  try {
    await readFile(global.fileName);
    console.log('API Started!');
  } catch (err) {
    const initalJson = {
      nextID: 1,
      accounts: [],
    };
    writeFile(global.fileName, JSON.stringify(initalJson))
      .then(() => {
        console.log('API Started and File Created!');
      })
      .catch(err => {
        console.log(err);
      });
  }
});

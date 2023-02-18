import express from 'express';
import { promises as fs, read, write } from 'fs';

const { readFile, writeFile } = fs;
global.fileName = 'accounts.json';
const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    let account = req.body;
    const data = JSON.parse(await readFile(global.fileName));
    account = { id: data.nextID++, ...account };
    data.accounts.push(account);
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(account);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextID;
    res.send(data);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const account = data.accounts.find(
      account => account.id === parseInt(req.params.id)
    );
    res.send(account);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    data.accounts = data.accounts.filter(
      account => account.id !== parseInt(req.params.id)
    );
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.end();
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const account = req.body;
    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex(acc => acc.id === account.id);

    data.accounts[index] = account;
    await writeFile(global.fileName, JSON.stringify(data));

    res.send(account);
  } catch (err) {
    next(err);
  }
});

router.patch('/updateBalance', async (req, res, next) => {
  try {
    const account = req.body;
    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex(acc => acc.id === account.id);

    data.accounts[index].balance = account.balance;
    await writeFile(global.fileName, JSON.stringify(data));

    res.send(data.accounts[index]);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  console.log(err);
});
export default router;

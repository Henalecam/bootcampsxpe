import express from 'express';
import { promises as fs, read, write } from 'fs';
import cors from 'cors';

const { readFile, writeFile } = fs;
const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    let account = req.body;

    if (!account.name || account.balance == null) {
      throw new Error('Need name and balance');
    }
    const data = JSON.parse(await readFile(global.fileName));
    account = {
      id: data.nextID++,
      name: account.name,
      balance: account.balance,
    };
    data.accounts.push(account);
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(account);
    logger.info(`POST /account ${JSON.stringify(account)}`);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextID;
    res.send(data);
    logger.info('GET /account');
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
    logger.info('GET /account/:id');
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
    logger.info(`DELETE /account/:id - ${req.params.id}`);
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const account = req.body;

    if (!account.id || !account.name || account.balance == null) {
      throw new Error('Need ID, Name and Balance');
    }

    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex(acc => acc.id === account.id);

    if (index === -1) {
      throw new Error('Register not found');
    }

    data.accounts[index].name = account.name;
    data.accounts[index].balance = account.balance;
    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(account);
    logger.info(`PUT /account ${JSON.stringify(account)}`);
  } catch (err) {
    next(err);
  }
});

router.patch('/updateBalance', async (req, res, next) => {
  try {
    const account = req.body;

    if (!account.id || account.balance == null) {
      throw new error('Need to place: ID, Name e Balance');
    }
    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex(acc => acc.id === account.id);

    if (index === -1) {
      throw new Error('Register not found');
    }

    data.accounts[index].balance = account.balance;
    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(data.accounts[index]);
    logger.info(`PATCH /account/updateBalance ${JSON.stringify(account)}`);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  logger.error(`${err.message}`);
  res.status(400).send({ error: err.message });
});
export default router;

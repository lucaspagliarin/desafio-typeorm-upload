import { EntityRepository, Repository, getCustomRepository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    // TODO
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const transactions = await transactionsRepository.find();

    const positive = transactions.filter(
      transaction => transaction.type === 'income',
    );
    const negative = transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const positiveSum = positive.reduce((accumulator, transaction) => {
      return accumulator + transaction.value;
    }, 0);

    const negativeSum = negative.reduce((accumulator, transaction) => {
      return accumulator + transaction.value;
    }, 0);

    const balanceObject = {
      income: positiveSum,
      outcome: negativeSum,
      total: positiveSum - negativeSum,
    };

    return balanceObject;
  }
}

export default TransactionsRepository;

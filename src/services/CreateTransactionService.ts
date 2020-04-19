// import AppError from '../errors/AppError';
import { getCustomRepository } from 'typeorm';

import TransactionRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import FindOrCreateCategoryService from './FindOrCreateCategoryService';
import AppError from '../errors/AppError';

interface Request {
  title: string;
  categoryTitle: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private categoryId = null;

  public async execute({
    title,
    value,
    type,
    categoryTitle,
  }: Request): Promise<Transaction> {
    // TODO
    const transactionRepository = getCustomRepository(TransactionRepository);

    const balance = await transactionRepository.getBalance();

    if (balance.total < value && type === 'outcome') {
      throw new AppError('Insuficient balance', 400);
    }

    const FindOrCreateCategory = new FindOrCreateCategoryService();

    const category = await FindOrCreateCategory.execute(categoryTitle);

    const transaction = await transactionRepository.create({
      title,
      value,
      type,
      category,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;

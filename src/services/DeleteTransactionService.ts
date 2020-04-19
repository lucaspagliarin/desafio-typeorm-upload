import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    // TODO
    const transactionRepository = getCustomRepository(TransactionsRepository);
    const transactionExists = await transactionRepository.findOne({
      where: { id },
    });

    if (!transactionExists) {
      throw new AppError(
        'The transaction that you are trying to delete does not exists',
        400,
      );
    }

    await transactionRepository.delete(id);
  }
}

export default DeleteTransactionService;

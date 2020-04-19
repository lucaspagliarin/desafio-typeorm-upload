import { getRepository } from 'typeorm';
import Category from '../models/Category';

class FindOrCreateCategoryService {
  public async execute(category: string): Promise<Category> {
    const categoryRepository = getRepository(Category);

    const categoryExists = await categoryRepository.findOne({
      where: { title: category },
    });

    if (!categoryExists) {
      const newCategory = await categoryRepository.create({
        title: category,
      });

      await categoryRepository.save(newCategory);

      return newCategory;
    }

    return categoryExists;
  }
}

export default FindOrCreateCategoryService;

import faker from 'faker';
import { randomNumber } from '../functions.js';

export const randomProducts = (numOfProducts = 0) => {
  if (numOfProducts <= 0) return [];

  const products = Array.from(new Array(numOfProducts)).map((_, index) => {
    const imageId = randomNumber(100, 999);

    const product = {
      id: faker.datatype.uuid(),
      index: index,
      name: faker.commerce.productName(),
      color: faker.commerce.color(),
      price: Number.parseFloat(faker.commerce.price()),
      description: faker.commerce.productDescription(),
      imageUrl: `https://picsum.photos/id/${imageId}/1368/800`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    return product;
  });

  return products;
};

import faker from 'faker';
import { randomNumber } from '../functions.js';

const randomTags = () => {
  const numOfTags = randomNumber(0, 4);

  const tags = Array.from(new Array(numOfTags)).map(() => {
    return faker.commerce.productAdjective();
  });

  return tags;
};

export const randomPosts = (numOfPosts = 0) => {
  if (numOfPosts <= 0) return [];

  const posts = Array.from(new Array(numOfPosts)).map((_) => {
    const imageId = randomNumber(100, 999);

    const post = {
      id: faker.datatype.uuid(),
      author: faker.name.findName(),
      avatar: faker.image.avatar(),
      title: faker.name.title(),
      description: faker.lorem.sentence(20),
      content: faker.lorem.paragraphs(),
      imageUrl: `https://picsum.photos/id/${imageId}/1368/800`,
      tags: randomTags(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    };

    return post;
  });

  return posts;
};

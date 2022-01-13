import faker from 'faker';
import fs from 'fs';

const randomNumber = (to, from = 0) =>
  Math.trunc(Math.random() * (to - from) + from);

const randomProductList = (numOfProducts) => {
  if (numOfProducts <= 0) return [];

  const productList = [];

  Array.from(new Array(numOfProducts)).forEach((_, index) => {
    const imageId = randomNumber(1000, 100);

    const product = {
      id: faker.datatype.uuid(),
      index: index,
      name: faker.commerce.productName(),
      color: faker.commerce.color(),
      price: Number.parseFloat(faker.commerce.price()),
      description: faker.commerce.productDescription(),
      thumbnailUrl: `https://picsum.photos/id/${imageId}/1368/400`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    productList.push(product);
  });

  return productList;
};

const randomTags = () => {
  const numOfTags = randomNumber(4);

  const tagList = Array.from(new Array(numOfTags)).map(() => {
    return faker.commerce.productAdjective();
  });

  return tagList;
};

const randomPostList = (numOfPosts) => {
  if (numOfPosts <= 0) return [];

  const postList = [];

  Array.from(new Array(numOfPosts)).forEach(() => {
    const imageId = randomNumber(1000, 100);

    const post = {
      id: faker.datatype.uuid(),
      author: faker.name.findName(),
      avatar: faker.image.avatar(),
      title: faker.name.title(),
      description: faker.lorem.sentence(20),
      content: faker.lorem.paragraphs(),
      thumbnail: `https://picsum.photos/id/${imageId}/1368/400`,
      tags: randomTags(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    };

    postList.push(post);
  });

  return postList;
};

(() => {
  const productList = randomProductList(50);
  const postList = randomPostList(50);

  const db = {
    products: productList,
    posts: postList,
  };

  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('Generate data successfully!!!');
  });
})();

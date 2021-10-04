import faker from 'faker';
import fs from 'fs';

const randomProductList = (numOfProducts) => {
  if (numOfProducts <= 0) return [];

  const productList = [];

  Array.from(new Array(numOfProducts)).forEach((_, index) => {
    const product = {
      id: faker.datatype.uuid(),
      index: index,
      name: faker.commerce.productName(),
      color: faker.commerce.color(),
      price: Number.parseFloat(faker.commerce.price()),
      description: faker.commerce.productDescription(),
      thumbnailUrl: faker.image.imageUrl(500, 500),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    productList.push(product);
  });

  return productList;
};

const randomPostList = (numOfPosts) => {
  if (numOfPosts <= 0) return [];

  const postList = [];

  const randomTags = () => {
    const numOfTags = Math.trunc(Math.random() * 4);

    const tagList = Array.from(new Array(numOfTags)).map(() => {
      return faker.commerce.productAdjective();
    });

    return tagList;
  };

  Array.from(new Array(numOfPosts)).forEach(() => {
    const post = {
      id: faker.datatype.uuid(),
      author: faker.name.findName(),
      avatar: faker.image.avatar(),
      title: faker.name.title(),
      content: faker.lorem.paragraphs(),
      thumbnail: faker.random.image(),
      tags: randomTags(),
      createdAt: faker.date.past(),
      updatedAt: Date.now(),
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
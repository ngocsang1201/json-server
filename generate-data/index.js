import fs from 'fs';
import { randomPosts } from './posts.js';
import { randomProducts } from './products.js';

(() => {
  const db = {
    products: randomProducts(50),
    posts: randomPosts(50),
  };

  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('Generate data successfully!!!');
  });
})();

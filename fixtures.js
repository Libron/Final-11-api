const mongoose = require('mongoose');
const config = require('./config');
const library = require('./library');
const loremIpsum = require("lorem-ipsum").loremIpsum;

const Post = require('./models/Post');
const Comment = require('./models/Comment');
const User = require('./models/User');

const run = async () => {
  await mongoose.connect(config.dbUrl, config.mongoOptions);

  const connection = mongoose.connection;

  const collections = await connection.db.collections();

  for (let collection of collections) {
    await collection.drop();
  }

  const pictures = ['f1.jpg', 'f2.png', 'f3.png', 'f4.jpg', null];

  const generateRandomPosts = (qty) => {
      const posts = [];
      for (let i = 0; i < qty; i++) {
          posts.push({
              title: loremIpsum(),
              description: loremIpsum(),
              datetime: `2019-04-${library.getRndInteger(10, 30)}T14:${library.getRndInteger(10, 59)}:54.362Z`,
              image: library.random(pictures),
              user: library.random(users)._id
          });
      }
      return posts;
  };

    const generateRandomComments = () => {
        const comments = [];
        posts.map(post => {
            const commentsQty = library.getRndInteger(30, 60);
            for (let i = 0; i < commentsQty; i++) {
                comments.push({
                   user:  library.random(users)._id,
                   post: post._id,
                   text: loremIpsum(),
                   datetime: `2019-04-${library.getRndInteger(10, 30)}T14:${library.getRndInteger(10, 59)}:54.362Z`
                });
            }
        });

        return comments;
    };

  const users = await User.create(
    {username: 'Anton', password: '$2b$10$5iTBlJMbPpCQ7gfLDRdOUeCHCcmRoqCAKPULeC6i6oP62Z0pKLPgC', token: 'UcHI-deyBak9bW7JGh2Lh'},
    {username: 'Gena', password: '$2b$10$5iTBlJMbPpCQ7gfLDRdOUeCHCcmRoqCAKPULeC6i6oP62Z0pKLPgC', token: 'UcHI-deyBak9bW7JGh2Lh'},
    {username: 'Natalia', password: '$2b$10$5iTBlJMbPpCQ7gfLDRdOUeCHCcmRoqCAKPULeC6i6oP62Z0pKLPgC', token: 'UcHI-deyBak9bW7JGh2Lh'},
  );

  const randomPosts = generateRandomPosts(10);
  const posts = await Post.create(
      ...randomPosts
  );
  const comments = generateRandomComments();
  await Comment.create(
      ...comments
  );

  return connection.close();
};


run().catch(error => {
  console.error('Something wrong happened...', error);
});

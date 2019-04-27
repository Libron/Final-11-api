const mongoose = require('mongoose');
const loremIpsum = require("lorem-ipsum").loremIpsum;
const library = require('./library');
const config = require('./config');

const User = require('./models/User');
const Product = require('./models/Product');
const Category = require('./models/Category');

const run = async () => {
  await mongoose.connect(config.dbUrl, config.mongoOptions);

  const connection = mongoose.connection;

  const collections = await connection.db.collections();

  for (let collection of collections) {
    await collection.drop();
  }

  const pictures = [
      ['mers1.jpg', 'mers2.jpg', 'mers3.jpg',  'mers4.jpg', 'mers5.jpg'],
      ['honda1.jpg', 'honda2.jpg', 'honda3.jpg',  'honda4.jpg'],
      ['toyota1.jpg', 'toyota2.jpg', 'toyota3.jpg',  'toyota4.jpg', 'toyota5.jpeg'],
      ['bmw1.jpg', 'bmw2.jpg', 'bmw3.jpg',  'bmw4.jpeg', 'bmw5.jpg']
  ];
  const models = ['Avalon', 'SLX', 'GLS', 'Tunza', 'Dark', 'Inspire', 'Prius', 'Starter'];

  const generateRandomProducts = () => {
      const cars = [];
      categories.map((cat, index) => {
          for (let i = 0; i < library.getRndInteger(20, 60); i++) {
              cars.push( {
                  title: `${cat.description} ${library.random(models)}`,
                  price: parseInt(`${library.getRndInteger(10, 200)}00`),
                  description: loremIpsum(),
                  category: cat._id,
                  seller: library.random(users)._id,
                  image: library.random(pictures[index])
              });
          }
      });
      return cars;
  };

  const categories = await Category.create(
      {title: 'Mersedes-Benz', description: 'Mersedes-Benz'},
      {title: 'Honda', description: 'Honda'},
      {title: 'Toyota', description: 'Toyota'},
      {title: 'BMW', description: 'BMW'}
  );

  const users = await User.create(
    {username: 'Anton', password: '$2b$10$5iTBlJMbPpCQ7gfLDRdOUeCHCcmRoqCAKPULeC6i6oP62Z0pKLPgC', token: 'UcHI-deyBak9bW7JGh2Lh', displayname: 'Anton Gregorievuch', phone: '+996 555 65 34 34'},
    {username: 'Gena', password: '$2b$10$5iTBlJMbPpCQ7gfLDRdOUeCHCcmRoqCAKPULeC6i6oP62Z0pKLPgC', token: 'UcHI-deyBak9bW7JGh2Lh', displayname: 'Gena Kim', phone: '+996 772 34 22 22'},
    {username: 'Natalia', password: '$2b$10$5iTBlJMbPpCQ7gfLDRdOUeCHCcmRoqCAKPULeC6i6oP62Z0pKLPgC', token: 'UcHI-deyBak9bW7JGh2Lh', displayname: 'Natalia Kirkorova', phone: '+996 770 00 00 07'}
  );

  const products = generateRandomProducts();
  await Product.create(
      ...products
    );

  return connection.close();
};


run().catch(error => {
  console.error('Something wrong happened...', error);
});
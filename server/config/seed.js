const db = require('./connection');
const User = require('../models/User');
const Organization = require('../models/Organization');
const userData = require('./seedData/userSeeds');
const orgData = require('./seedData/orgSeeds');
const bcrypt = require('bcrypt');

const seedUsers = userData.map(user => ({
  ...user,
  password: bcrypt.hashSync(user.password, 10)
}));

db.once('open', async () => {
  try{
  await Organization.deleteMany();
  await User.deleteMany();

  await Organization.insertMany(orgData);
  await User.insertMany(seedUsers);

  console.log('jobs done!');
  process.exit(0);
  }  catch (err) {
    throw err;
  }

});

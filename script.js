const mongoose = require('mongoose');
const User = require('./User');
const { users } = require('./randomUser');

mongoose.connect( 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.4');
// mongoose.connect('mongodb://localhost:27017/');

async function seedDatabase(){
    const usersToInsert = users.map(user => {
        return {
            name: user.name,
            registrationDate: user.registrationDate
        };
    });
    await User.insertMany(usersToInsert);
    console.log('Database seeded!');
};

seedDatabase();

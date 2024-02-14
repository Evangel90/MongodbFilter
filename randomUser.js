const { faker } = require('@faker-js/faker');

function generateRandomUser() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const fullName = `${firstName} ${lastName}`;

  const year = 2024;
  const randomMonth = Math.floor(Math.random() * 12);
  const randomDay = Math.floor(Math.random() * 31) + 1;
  const registrationDate = new Date(year, randomMonth, randomDay);

  return{
    name: fullName,
    registrationDate
  };

}

const users = [];

for (let i = 0; i < 10; i++) {
  users.push(generateRandomUser());
}

console.log(users);

module.exports = { users }
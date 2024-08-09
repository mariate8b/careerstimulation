const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

const main = async () => {
  await prisma.$connect();
  console.log('Create users');

  const [user1, user2, user3] = await Promise.all(
    [...Array(3)].map(() => {
      return prisma.user.create({
        data: {
          username: faker.internet.userName(),
          password: faker.internet.password(),
          email: faker.internet.email(),
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
        },
      });
    })
  );

  const users = await prisma.user.findMany();
  console.log('created users:', users);

  // seed stores 
console.log("Creating stores");
await Promise.all([user1,user2].map((user)=> {
  [...Array(3)].map(()=>{
    return prisma.stores.create({
      data:{
        species,
        img_url: '',
        user_id: user.id
      }
    })
  })
}))


  
};

main()
  .then(() => {
    console.log('Seed data created');
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
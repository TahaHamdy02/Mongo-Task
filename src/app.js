const { MongoClient} = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "myProject";

async function main() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected successfully to MongoDB server");
    const db = client.db(dbName);
    const collectionUsers = db.collection("Users");

    //insertOne
    const user = { name: "Uma", age: 46, city: "Rome" };
    const insertOneUser = await collectionUsers.insertOne(user);
    console.log(`user was inserted`);


    //insertMany
    const users = [
      { name: "Uma", age: 22, city: "Rome" },
      { name: "Thomas", age: 22, city: "Barcelona" },
      { name: "David", age: 22, city: "Dubai" },
      { name: "Mia", age: 22, city: "Beijing" },
      { name: "Yara", age: 22, city: "Paris" },
      { name: "Grace", age: 42, city: "Tokyo" },
      { name: "David", age: 53, city: "Miami" },
      { name: "Grace", age: 57, city: "Berlin" },
      { name: "Yara", age: 49, city: "Rome" },
      { name: "Peter", age: 61, city: "London" },
    ];
    const insertManyUsers = await collectionUsers.insertMany(users);
    console.log(`${insertManyUsers.insertedCount} users were inserted`);


    const query = { age: 22 };
    const options = {
      // (A->Z)
      sort: { name: 1 },
      // Include only the `title` and `content` fields in the returned document
      projection: { _id: 0, name: 1, age: 1, city: 1 },
    };


    //All usersWithSameAge
    const usersWithSameAge = collectionUsers.find(query, options);
    await usersWithSameAge.forEach((user) => {
      console.log(user);
    });


    // 3 users have same age
    const LimitedusersWithSameAge = collectionUsers.find(query, options).limit(3);
    await LimitedusersWithSameAge.forEach((user) => {
      console.log(user);
    });


    //update users name 
    const updateNames = {
      $set: {
        name: "Yara",
      },
    };
    const usersNamesWillUpdated = await cursor.updateMany(query, updateNames); //query 22
    console.log(`${usersNamesWillUpdated.modifiedCount} documents were updated.`);

    //update all users ages
    const updateAges = {
      $inc: {
        age: 10,
      },
    };
    const usersAgesWillUpdated = await collectionUsers.updateMany({},updateAges); //query all
    console.log(`${usersAgesWillUpdated.modifiedCount} documents were updated.`);

    //delete users with age 42
    const queryToDelete = { age: 42 };
    const deleteUsers = await collectionUsers.deleteMany(queryToDelete);
    console.log(`${deleteUsers.deletedCount} is deleted`);
  } catch (error) {
    console.error(`Failed to connect to MongoDB: ${error}`);
  } finally {
    await client.close();
  }
}

main();

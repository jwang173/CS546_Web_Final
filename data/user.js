const { checkObjectId } = require('../utils');
const bcrypt = require('bcrypt');

const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const orders = mongoCollections.order;



let exportedMethods = {
  async getAllUsers() {
    const userCollection = await users();
    return await userCollection.find().toArray();
  },

  async getUserById(id) {
    const checkedId = checkObjectId(id);
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: checkedId });
    if (!user) throw 'User was not found!';
    return user;
  },
  
  async addUser(email, name, hashedPassword) {
    return users().then(userCollection => {
      let newuser = {
        email: email,
        name: name,
        hashedPassword: hashedPassword,
      };

      return userCollection
        .insertOne(newuser)
        .then(newInsertInformation => {
          return newInsertInformation.insertedId;
        })
        .then(newId => {
          return this.getUserById(newId);
        });
    });
  },

  async removeUser(id) {
    const checkedId = checkObjectId(id);
    const deleteduser = await this.getUserById(checkedId);
    const userCollection = await users();
    
    const deletionInfo = await userCollection.removeOne({ _id: checkedId });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete user.`;
    }

    const orderCollection = await order();
    await orderCollection.deleteMany({ user: checkedId });

    return {
      deleted : true,
      data : deleteduser
    };
  },
};

module.exports = exportedMethods;
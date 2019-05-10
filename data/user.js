const { checkObjectId } = require('../utils');
const bcrypt = require('bcrypt');

const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.usersCollection;
const orders = mongoCollections.menuCollection;

const userdata = [
    {
        _id: "0",
        username: "masterdetective123",
        hashedPassword: "$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD.",
        firstName: "Sherlock",
        lastName: "Holmes",
        profession: "Detective",
        bio: "Sherlock Holmes (/ˈʃɜːrlɒk ˈhoʊmz/) is a fictional private detective created by British author Sir Arthur Conan Doyle. Known as a \"consulting detective\" in the stories, Holmes is known for a proficiency with observation, forensic science, and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, including Scotland Yard."
    },

    {
        _id: "1",
        username: "lemon",
        hashedPassword: "$2a$16$SsR2TGPD24nfBpyRlBzINeGU61AH0Yo/CbgfOlU1ajpjnPuiQaiDm",
        firstName: "Elizabeth",
        lastName: "Lemon",
        profession: "Writer",
        bio: "Elizabeth Miervaldis \"Liz\" Lemon is the main character of the American television series 30 Rock. She created and writes for the fictional comedy-sketch show The Girlie Show or TGS with Tracy Jordan."
    },

    {
        _id: "2",
        username: "theboywholived",
        hashedPassword: "$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK",
        firstName: "Harry",
        lastName: "Potter",
        profession: "Student",
        bio: "Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the life of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry . The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic, and subjugate all wizards and Muggles."
    }
]

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
    // const userCollection = await users();
    return users().then(userCollection => {
      let newuser = {
        email: email,
        name: name,
        hashedPassword: hashedPassword,
      };

      console.log(newuser)

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

  async checkUsername(username) {
    const allUsers = await module.exports.getAllUsers();
    for (let user of allUsers) {
      if (user.email === username) { 
        return true 
      }
    }
    return false
  },

  async matchPassword(username, password) {
    const allUsers = await module.exports.getAllUsers();
    for (let user of allUsers) {
      if (user.email === username) {
        if (!bcrypt.compareSync(password, user.hashedPassword)) {
          return { status: false, message: "The provided password is incorrect." }
        } 
        else {
          return { status: true, user: user }
        }
      }
    }
    return { status: false, message: "No user found." }
  }
};

module.exports = exportedMethods;
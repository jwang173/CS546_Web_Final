const dbConnection = require("./config/mongoConnection");
const Db = require("mongodb").Db;
// const data = require("./data");
const {
    menu,
    user,
    review
} = require("./data")

async function main() {
    const db = await dbConnection();
    await db.dropDatabase();

    try {
        await menu.create("Roast duck", 12, "It's a delicious food from Beijing, China.")
        await menu.create("French fries", 6, "It's a food from USA");
    } catch(e) {
        console.log(e);
    }

    
    try {
        const phil = await user.addUser("phil@gmail.com","Phill","$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD.");
        const id = phil._id;
        //console.log(phil)
        const firstReview = await review.addReview( String(id),"2018-05-27","5","The food was very tasty");
       // console.log(firstReview)
    } catch(e) {
        console.log(e);
    }

    console.log("Done seeding database");
}
main();
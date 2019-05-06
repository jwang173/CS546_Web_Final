const dbConnection = require("./config/mongoConnection");
const Db = require("mongodb").Db;
// const data = require("./data");
const {
    menu
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
    console.log("Done seeding database");
}
main();
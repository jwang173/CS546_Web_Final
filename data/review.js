const {
  usersCollection,
  menuCollection,
  orderCollection,
  reviewCollection
} = require('../config/mongoCollections');
const users = require("./user") 
const review = reviewCollection;
const users_ = usersCollection;
const { ObjectId } = require("mongodb");

async function getAll() {
  const reviewCollections = await review();
  let reviewList = await reviewCollections.find({}).toArray();
  return reviewList;
}

async function getReviewById(id) {
  const reviewCollections = await review();
  let parsedReviewId = ObjectId.createFromHexString(id);
  let review_ = await reviewCollections.findOne({_id: parsedReviewId});

  if(review_ === null) {
    throw `There is no such food with the id of ${id}`;
  }
  return review_;
}

async function addReview(userId, date, stars, comment) {
  const reviewCollection = await review();
  //const usersCollection = await users_();

  const userThatPosted = await users.getUserById(String(userId));

  const newReview = {
    userId: userThatPosted._id,
    date: date,
    stars : stars,
    comment: comment
  };

  const newInsertInformation = await reviewCollection.insertOne(newReview);
  if(newInsertInformation.insertedCount === 0) {
    throw `Failed to create the review`;
  }
  const newId = newInsertInformation.insertedId;
  return await this.getReviewById(String(newId));
  
}

async function updateComment(id, updatedComment ) {
  return this.getReviewById(String(id)).then(currentReview => {
    let reviewUpdateInfo = {
      comment: updatedComment
    };

    let updateCommand = {
      $set: reviewUpdateInfo
    };
    console.log("hitprefinal")
    return review().then(reviewCollection => {
      const parsedId = ObjectId.createFromHexString(id);
      return reviewCollection.updateOne({ _id: parsedId }, updateCommand).then(() => {
        return this.getReviewById(String(id));
      });
    });
  });
}

async function updateStars(id, updatedStars ) {
  return this.getReviewById(String(id)).then(currentReview => {
    let reviewUpdateInfo = {
      comment: updatedStars
    };

    let updateCommand = {
      $set: reviewUpdateInfo
    };
    console.log("hitprefinal")
    return review().then(reviewCollection => {
      const parsedId = ObjectId.createFromHexString(id);
      return reviewCollection.updateOne({ _id: parsedId }, updateCommand).then(() => {
        return this.getReviewById(String(id));
      });
    });
  });  

}

async function remove(id) {
  if (!id) throw "You must provide an id to search for";
  if (typeof id !== 'string') {
    throw ` incorrect input please enter a valid id check type maybe`;
      } 
  const reviewCollection = await review();
  const parsedId = ObjectId.createFromHexString(id);
  const obj = await this.getReviewById(String(parsedId));
  const deletionInfo = await reviewCollection.removeOne({ _id: parsedId });
  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete post with id of ${id}`;
  }
  return obj;
}

module.exports = {
  getAll,
  getReviewById,
  addReview,
  updateComment,
  updateStars,
  remove
};

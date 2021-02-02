const dotenv = require("dotenv");
require("dotenv").config();
const { MongoClient } = require('mongodb');
let mong = {};
mong.fetch = async function(clust = null, collec = null) {
    const uri = process.env.MONGO_URI;
     mong.client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
        // Connect to the MongoDB cluster
        await mong.client.connect();
        if (clust && collec) await findLights(mong.client, clust, collec);
    } 
    catch (err) {
        console.error(err);
    }
    finally {
        // Close the connection to the MongoDB cluster
        // await mong.client.close();
    }
    return mong.client
}
 mong.fetch().catch(console.error);
async function findLights(client, clust, collec) {
    // See https://mongodb.github.io/node-mongodb-native/3.3/api/Collection.html#find for the find() docs
    const cursor = mong.client.db(clust).collection(collec).find({});
    const howmuch = mong.client.db(clust).collection(collec).countDocuments();
    // Store the results in an array. If you will have many customers, you may want to iterate
    // this cursor instead of sending the results to an array. You can use Cursor's forEach() 
    // to do the iterating: https://mongodb.github.io/node-mongodb-native/3.3/api/Cursor.html#forEach
    const results = await cursor.toArray();
    // console.log(howmuch);
    // Process the results
    if (results.length > 0) {
        results.forEach((result, i) => {
            // console.log(result);
            mong.results = results
            mong.result = result;
            // Here you could build your html or put the results in some other data structure you want to work with
        });
    } else {
        console.log(`No data found`);
    }
}
mong.addDoc = async (clust, collec, doc) => {
    try {
        mong.client.db(clust).collection(collec).insertOne({ doc })
    }
    catch (e) {
        console.error(e)
    }
}
module.exports = mong
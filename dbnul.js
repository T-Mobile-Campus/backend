const dotenv = require("dotenv");
require("dotenv").config();
const { MongoClient } = require('mongodb');
let mong = {};
const uri = process.env.MONGO_URI;
mong.client = new MongoClient(uri, { useUnifiedTopology: true });
mong.fetch = async function(clust, collec) {
    try {
        mong.client = new MongoClient(uri, { useUnifiedTopology: true });
        await mong.client.connect();
        await find( clust, collec);
    } 
    catch (err) {
        console.error(err);
    }
    finally {
        await mong.client.close();
    }
    return mong.client
}
async function find( clust, collec) {
    const cursor = mong.client.db(clust).collection(collec).find({});
    const results = await cursor.toArray();

    if (results.length > 0) {
        results.forEach((result, i) => {
            mong.results = results
            mong.result = result;
        });
    } else {
        console.log(`No data found`);
    }
}
mong.addDoc = async (clust, collec, doc) => {
    try {
        mong.client = new MongoClient(uri, { useUnifiedTopology: true });
        await mong.client.connect();
        mong.client.db(clust).collection(collec).insertOne({ doc })
    }
    catch (e) {
        console.error(e)
    }
    finally {
        await mong.client.close();
    }
}
module.exports = mong
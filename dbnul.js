const dotenv = require("dotenv");
require("dotenv").config();
const { MongoClient } = require('mongodb');
let mong = {};
const uri = process.env.MONGO_URI;
mong.fetch = async function(clust, collec) {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
        await client.connect();
        const cursor = await client.db(clust).collection(collec).find({});
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
    catch (err) {
        console.error(err);
    }
    finally {
        await client.close();
    }
}
async function find(clust, collec) {

}
mong.addDoc = async (clust, collec, doc) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    let res = false
    try {
        await client.connect();
        res = await (await client.db(clust).collection(collec).insertOne({ doc })).result.ok
    }
    catch (e) {
        console.error(e)
    }
    finally {
        await client.close();
    }
    return res 
}
module.exports = mong
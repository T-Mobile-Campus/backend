const { MongoClient } = require('mongodb');


let mong = {};
mong.fetch = async function(clust = null, collec = null) {

    const uri = "mongodb+srv://theocop:8kp457co99@cluster0.oyhg9.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        await findLights(client);
        if(clust && collec)  mong.listed(client, clust, collec)

    } 
    catch (err) {
        console.error(err);
    }
    finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
    return client
}

 mong.fetch().catch(console.error);


async function findLights(client) {

    // See https://mongodb.github.io/node-mongodb-native/3.3/api/Collection.html#find for the find() docs
    const cursor = client.db("test").collection("Data").find({});

    // Store the results in an array. If you will have many customers, you may want to iterate
    // this cursor instead of sending the results to an array. You can use Cursor's forEach() 
    // to do the iterating: https://mongodb.github.io/node-mongodb-native/3.3/api/Cursor.html#forEach
    const results = await cursor.toArray();

    // Process the results
    if (results.length > 0) {
        results.forEach((result, i) => {

            console.log(result);
            mong.results = results
            mong.result = result;
            // Here you could build your html or put the results in some other data structure you want to work with
        });
    } else {
        console.log(`No data found`);
    }
}

mong.listed = (client, clust, collec) => {         
        const cursor = client.db(clust).collection(collec).find({});
        const results =  cursor.toArray();
        if (results.length > 0) {
          results.forEach((result, i) => {
      
              console.log(result);
              mong.results = results
              mong.result = result;
              // Here you could build your html or put the results in some other data structure you want to work with
          });
      } else {
          console.log(`No data found`);
      }
    
}



module.exports = mong
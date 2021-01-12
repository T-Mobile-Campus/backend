const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://theocop:8kp457co99@cluster0.oyhg9.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true } );
const sioux = require('./ttn.js')

let mong = {};

async function main (){
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        sioux.eventEmitter.on("lum", data => {
             createListing(client,
                {
                    lum: data,
                    
                }
            );
        })
        

 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        //await client.close();
    }
}




main().catch(console.error);
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


async function createListing(client, newListing){
    const result = await client.db("test").collection("Data").insertOne(newListing);
                
    console.log(`New listing created with the following id: ${result.insertedId}`);


}

module.exports = mong










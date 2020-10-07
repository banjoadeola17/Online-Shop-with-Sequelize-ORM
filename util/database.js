const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'Adevictor17', {
    dialect: 'mysql', 
    host: 'localhost'
});

module.exports = sequelize;



// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

// mongoConnect = callback => {
//     MongoClient.connect(
//         'mongodb+srv://adeola17:Adevictor17@cluster0.eztdv.mongodb.net/<dbname>?retryWrites=true&w=majority')
// .then(client => {
//     console.log('Connected');
//     callback(client);
// })
// .catch(err => {console.log(err)});
// }

// module.exports = mongoConnect;
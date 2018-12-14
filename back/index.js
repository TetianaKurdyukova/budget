const Sequelize = require('sequelize');
const sequelize = new Sequelize('budget', 'root', 'root',
    {
        host: 'localhost',
        dialect: 'mysql',

        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        logging: false
    }
);

const Op = Sequelize.Op;


const Balance = sequelize.define('balanceLog', {
    balanceName: Sequelize.STRING,
    summ: Sequelize.INTEGER,
    date: Sequelize.DATEONLY
});

const TransactionLog = sequelize.define('transactionLog', {
    date: Sequelize.DATEONLY,
    user: Sequelize.STRING,
    summ: Sequelize.INTEGER,
    source: Sequelize.STRING,
    assignment: Sequelize.STRING,
    destination: Sequelize.STRING,
    comment: Sequelize.STRING
});

//fill db
/*async function fillDB(){
    await sequelize.sync()
    var transaction1  = await TransactionLog.create( {
                            date: '2018-09-28',
                            user: 'Tetiana',
                            summ: 250,
                            sourceOfIncome: '',
                            assignment: 'fuel'
                        })
    var transaction2  = await TransactionLog.create( {
                            date: '2018-09-28',
                            user: 'Tetiana',
                            summ: 500,
                            sourceOfIncome: '',
                            assignment: 'products'
                        })
    
    var transaction3  = await TransactionLog.create( {
                            date: '2018-09-27',
                            user: 'Maksym',
                            summ: 100,
                            sourceOfIncome: '',
                            assignment: 'products'
                        })
       
}
fillDB();*/


async function run(){
    await sequelize.sync({alter: true});
    console.log('synced');
}
run();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
app.use(express.static('public'));
const cors  = require('cors');

var TransactionSchema = buildSchema(`
    type TransactionLog {
        id: Int
        date: String
        user: String
        summ: Int
        source: String
        assignment: String
        destination: String
        comment: String
    }
    type Query {
        transactions: [TransactionLog],
        transactionsByDate(date: String): [TransactionLog],
        transactionById(id: Int!): TransactionLog
    }
    type Mutation {
        createTransaction(
            date: String,
            user: String!,
            summ: Int!,
            source: String,
            assignment: String,
            destination: String,
            comment: String): TransactionLog

        deleteTransaction(
            id: Int!): TransactionLog
    }
`);

async function transactions(){
   return await TransactionLog.findAll()
}

async function transactionsByDate({from, to}){
   return await TransactionLog.findAll({ where: { date: {[Op.lt]: new Date(to)} } }) //tune it up to createAt > from and createdAt < to
}

async function transactionById(id){
   return await TransactionLog.findById(id)
}

async function createTransaction(transaction){
   return await TransactionLog.create(transaction)
}

async function deleteTransaction({id}){
    console.log(id)
//await TransactionLog.delete(id)
    let transaction = await TransactionLog.findById(id)
    if (transaction){
        transaction.destroy();
    }
    return id 
}

// Root resolver
var TransactionResolver = {
    transactions,
    transactionsByDate,
    transactionById,
    createTransaction,
    deleteTransaction
};

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('nema');
});

// Create an express server and a GraphQL endpoint
app.use(cors());
app.use('/graphql', express_graphql({
    schema: TransactionSchema,
    rootValue: TransactionResolver,
    graphiql: true
}));
app.listen(8000, () => console.log('Express GraphQL Server Now Running On localhost:8000/graphql'));

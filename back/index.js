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
    title: Sequelize.STRING,
    summ: Sequelize.INTEGER,
    source: Sequelize.STRING,
    assignment: Sequelize.STRING,
    destination: Sequelize.STRING,
    comment: Sequelize.STRING
});

const User = sequelize.define('user', {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    phone: Sequelize.STRING
});

async function run(){
    await sequelize.sync({alter: true});
    console.log('synced');
}
run();

const express = require('express');
const app = express();

const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
app.use(express.static('public'));
const cors  = require('cors');

var TransactionSchema = buildSchema(`
    type TransactionLog {
        id: Int
        date: String
        summ: Int
        user: String
        title: String
        assignment: String
        comment: String
    }
    type User {
        firstName: String
        lastName: String
        password: String
        email: String
        phone: String
        id: Int
    }
    
    type Query {
        transactionsByDate(date: String!): [TransactionLog],
        transactionById(id: Int!): TransactionLog,
        signIn(email: String!, password: String!): User
    }
    type Mutation {
        createTransaction(
            date: String,
            summ: Int!,
            user: String!,
            title: String!,
            assignment: String,
            comment: String): TransactionLog
        
        editTransaction(
            id: Int!,
            date: String,
            summ: Int!,
            user: String!,
            title: String!,
            assignment: String,
            comment: String): TransactionLog
        
        deleteTransaction(
            id: Int!): TransactionLog

        createUser(
            email: String!,
            password: String!,
            firstName: String!,
            lastName: String!,
            phone: String!): User
    }
`);

async function transactionsByDate(params){
    let dateParam = new Date(params.date);
    let startDate = dateParam.setHours(0, 0, 0, 0);
    let endDate = dateParam.setHours(23, 59, 59, 999);
    return await TransactionLog.findAll({
        where: {
            createdAt: {
                [Op.lte]: endDate,
                [Op.gte]: startDate
            }
        }
    })
}

async function createTransaction(newTransaction){
   return await TransactionLog.create(newTransaction)
}

async function editTransaction(updatedTransaction){
    TransactionLog.update(
        updatedTransaction,
        { where: { id: updatedTransaction.id } }
    )
    return await TransactionLog.findByPk(updatedTransaction.id);
}

async function deleteTransaction({id}){
    let transaction = await TransactionLog.findById(id)
    if (transaction){
        transaction.destroy();
    }
    return id 
}

async function createUser(newUser){
  return await User.create(newUser);
}

// Root resolver
var TransactionResolver = {
    transactionsByDate,
    createTransaction,
    editTransaction,
    deleteTransaction,
    createUser
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

app.listen(8000);

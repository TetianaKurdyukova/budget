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
        logging: true
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

TransactionLog.hasMany(User);

async function run(){
    await sequelize.sync({alter: true});
    console.log('synced');
}

run();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cookieSession = require('cookie-session');
app.set('trust proxy', 1);

app.use(cookieSession({
    name: "session",
    keys: ['key1', 'key2']
}))

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
        email: String
        phone: String
        id: Int
    }
    
    type Query {
        transactions: [TransactionLog],
        transactionsByDate(date: String): [TransactionLog],
        transactionById(id: Int!): TransactionLog
        signIn(username: String!, password: String!): User
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
            firstName: String,
            lastName: String,
            phone: String!): User
    }
`);

async function transactions(){
   return await TransactionLog.findAll()
}

async function transactionsByDate({from, to}){
   return await TransactionLog.findAll({ where: { date: {[Op.lt]: new Date(to)} } }) //tune it up to createAt > from and createdAt < to
}

//async function transactionById(id){
//   return await TransactionLog.findByPk(id)
//}

async function createTransaction(newTransaction){
   return await TransactionLog.create(newTransaction)
}

async function editTransaction(updatedTransaction){
    console.log(updatedTransaction)
    TransactionLog.update(
        updatedTransaction,
        { where: { id: updatedTransaction.id } }
    )
    return await TransactionLog.findByPk(updatedTransaction.id);
}

async function deleteTransaction({id}){
    console.log(id)
    let transaction = await TransactionLog.findById(id)
    if (transaction){
        transaction.destroy();
    }
    return id 
}

async function createUser(params){
  return await User.create(params)
}

async function signIn({email, password},{session}){
    console.log(email, password, session)
    let user = await User.findOne({where:{
        email,
        password
    }})
    if (user)
        session.user = {email: user.email, userId: user.id};
    else
    delete session.user
    return user;
}

async function getUserTransactions({userId}){
    return await TransactionLog.findAll({where:{
        userId
    }});
}

async function getMyTransactions(arg, {session}){
    if(!session.user)
        return null;

    let userId = session.user.userId
    return await TransactionLog.findAll({where:{
        userId
    }})
}

// Root resolver
var TransactionResolver = {
    transactions,
    transactionsByDate,
    //transactionById,
    createTransaction,
    editTransaction,
    deleteTransaction,
    createUser,
    signIn,
    getUserTransactions,
    getMyTransactions
};

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('nema');
});

// Create an express server and a GraphQL endpoint
app.use(cors());
app.use('/graphql', express_graphql(req => ({
    schema: TransactionSchema,
    rootValue: TransactionResolver,
    graphiql: true,
    context: {session: req.session}
})));

app.listen(8000);

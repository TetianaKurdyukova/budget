import * as actionTypes from './actionTypes'
import { GraphQLClient } from 'graphql-request';

const gql = new GraphQLClient("http://localhost:8000/graphql", { headers: {} });

const createUser = (`mutation createUser($firstName: String!, $lastName: String!, $phone: String!, $email: String!, $password: String!){
    createUser(firstName: $firstName, lastName: $lastName, phone: $phone, email: $email, password: $password) {id}
  }`);

const actionCreateUser = function(user) {
    return async dispatch => {
        dispatch(actionTypes.newUserPending());
        await gql.request(createUser, user)
            .catch(error => dispatch(actionTypes.newUserRejected(error)));
    };
};

export default actionCreateUser;
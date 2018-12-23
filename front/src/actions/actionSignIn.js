import * as actionTypes from './actionTypes';
import { GraphQLClient } from 'graphql-request';

const gql = new GraphQLClient("http://localhost:8000/graphql", { headers: {} });

const signIn = (`query signIn($email: String!, $password: String!){
    signIn(email: $email, password: $password) {id}
  }`);

const actionSignIn = function(email) {
    return async dispatch => {
        dispatch(actionTypes.signInPending());
        await gql.request(signIn, {email})
            .catch(error => dispatch(actionTypes.signInRejected(error)));
    };
};

export default actionSignIn;
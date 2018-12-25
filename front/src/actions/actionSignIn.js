import * as actionTypes from './actionTypes';
import gql from '../store/gql';

const signIn = (`query signIn($email: String!, $password: String!){
    signIn(email: $email, password: $password) {id, firstName, lastName}
  }`);

const actionSignIn = function(email, password) {
    return async dispatch => {
        dispatch(actionTypes.signInPending());
        let user = await gql.request(signIn, {email, password})
            .catch(error => dispatch(actionTypes.signInRejected(error)));
        dispatch(actionTypes.signInResolved(user.signIn))
    };
};

export default actionSignIn;
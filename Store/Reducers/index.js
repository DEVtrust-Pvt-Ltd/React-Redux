import { combineReducers } from 'redux';
import auth from "./auth";

// If we have multiple reducers, we combine them here.
export default combineReducers({
auth,
})
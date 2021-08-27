import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./Reducers";

// We create the stores, we use the combined reducer and pass the global combined state from here.

// We are using Redux-Thunk as a middlewear which works asynchronously.

// Redux logger is used to check whether the global state is updated or not.

const composeEnhancers =
	(typeof window !== "undefined" &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk, logger)),
);

export default store;

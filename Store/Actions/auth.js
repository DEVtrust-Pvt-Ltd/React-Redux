// Here we are importing all the API(s) from the Service.

import { registerNewUser, loginUser, logoutUser, userPlanApi, sendChargeApi, subscribePlan, unsubscribePlan, getOrderApi, pushOrderApi, orderDetailsApi } from "../../Lib/Service/api"
import { toast } from 'react-toastify';

// Here we define the type of action and we pass the data to the reducer.

// Here data and the type is returned to the store. Also, the reducer fetches the data from store.

export const setOrderData = (data) => {
	return {
		type: "ORDERDATA",
		data,
	}
};
export const setLogout = () => {
	return {
		type: "LOGOUT",
	}
};
export const setRegister = () => {
	return {
		type: "REGISTER",
	}
};
export const setLogin = (data) => {
	return {
		type: "LOGIN",
		data,
	}
};
export const setToken = (data) => {
	return {
		type: "SETTOKEN",
		data,
	}
};
export const setShopID = (data) => {
	return {
		type: "SHOPID",
		data,
	}
};




// The orderDetailAction is the name of the action.

// orderDetailsApi is getting called when the orderDetailAction is called.

// The response which we get from the API is dispathed to setorderDetails and also, we set the action type and the data.

export const orderDetailAciton = (data) => async (dispatch) => {

	try {
		const response = await orderDetailsApi(data)
		console.log(response);
		if (response.status) {
			toast.success("Order Details");
			dispatch(setorderDetails(response));
		}
		else {
			toast.error(response.Message);
		}
	}

	catch (e) {

	}
};
export const userLoginAppData = (data) => async (dispatch) => {
	console.log("login Action");
	try {

		dispatch(setLoginAppdata(data));

	}

	catch (e) {

	}
};



export const userLogout = (data) => async (dispatch) => {

	try {
		dispatch(setLogout());

		const response = await logoutUser(data)
		if (response.status) {
			console.log(response.Status);
			localStorage.removeItem("user");

			//There are few actions wherein the data is not getting called from the API, so we simply define the data type and there is no need to pass any data.

			dispatch(setLogout());
			toast.success("Logout Successful");


		} else {
			toast.error("Logout Failed");
			console.log(response.Status);
			localStorage.removeItem("user");

		}
	} catch (e) {

	}
};



export const register = (data) => async (dispatch) => {
	console.log("call action", data);
	try {
		// var res = data.data["search_text"].substring(0, 1);

		const response = await registerNewUser(data)
		console.log(response);
		if (response.status) {
			toast.success("Account Created");
			dispatch(setRegister());
			// window.location.replace("http://localhost:3000/login")
		}
		if (!response.status) {
			toast.error(response.Message);
		}

	} catch (e) {
		// dispatch(userRegisterFailed());
		// 
	}
};
export const setPlan = (data) => {
	return {
		type: "USERPLAN",
		data,
	}
};


export const userPlan = (data) => async (dispatch) => {
	console.log("login Action");
	try {
		const response = await userPlanApi(data)
		console.log("plan Data", response);
		if (response.data.status) {
			console.log("ok status");
			dispatch(setPlan(response.data));
		}
		else {
			toast.error(response.Message);
		}
	}

	catch (e) {

	}
};

export const setSubscribe = (data) => {
	return {
		type: "SUBSCRIBE",
		data,
	}
};


// We are setting the initial default States.
const initial_state = {
    userData: [],
    planData: [],
    subscribeData: [],
    isActive: false,
    isLoggedIn: false,
    register: false,
    plan: [],
    tokenData: "",
    shopName: "",
    shopId: "",
    orderDetail: { Result: [] },
    orderData: { Result: [] }


}

// Here the data we get through actions, we set it according to the action type.

export default function facebookReducer(state = initial_state, action) {
    switch (action.type) {
        case "LOGIN": {
            return {
                ...state,
                //    userData:action.data,
                isLoggedIn: true

            }
        }
        case "LOGOUT": {
            return {
                ...state,
                userData: [],
                planData: [],

                isLoggedIn: false

            }
        }
        case "SETTOKEN": {
            return {
                ...state,
                tokenData: action.data,


                isLoggedIn: false

            }
        }
        case "SHOPID": {
            return {
                ...state,
                shopId: action.data,


                isLoggedIn: false

            }
        }
        case "SHOPNAME": {
            return {
                ...state,
                shopName: action.data,


                isLoggedIn: false

            }
        }
        case "SETORDER": {
            return {
                ...state,
                orderDetail: action.data,

            }
        }
        case "SETPLAN": {
            return {
                ...state,
                plan: action.data,

            }
        }
        case "COMMENT_DATA": {
            return {
                ...state,
                comments: action.payload,

            }
        }
        case "REGISTER": {
            return {
                ...state,
                register: true,

            }
        }
        case "ORDERDATA": {
            return {
                ...state,
                orderData: action.data,


            }
        }
        case "CLEAR_COMMENT": {
            return {
                ...state,
                comments: [],

            }

        }
        case "CLEAR_REG": {
            return {
                ...state,
                register: false,

            }

        }


        case "USERPLAN": {
            return {
                ...state,
                planData: action.data

            }

        }
        case "SUBSCRIBE": {
            return {
                ...state,
                subscribeData: action.data

            }

        }
        case "UNSUBSCRIBE": {
            return {
                ...state,
                subscribeData: action.data

            }

        }
        default:
            return initial_state
    }
}
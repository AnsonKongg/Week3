import * as types from "../config/ActionTypes";
const stockState = {
    type: "",
    errorMessage: "",
    vehicleTotalAmount: 0,
    vehicleList: [],
};

const vehicleReducer = (state = stockState, action) => {
    switch (action.type) {
        case types.GET_VEHICLE_SUCCESS:
            return {
                ...state,
                type: action.type,
                // vehicleList: { ...state.vehicleList, [action.symbol]: action.stockDetail },
            };
        case types.GET_VEHICLE_FAILED:
            return {
                ...state,
                type: action.type,
                errorMessage: action.errorMessage,
            };
        default:
            return state;
    }
}

export default vehicleReducer;
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
                vehicleList: [...action.vehicleLis],
                vehicleTotalAmount: action.vehicleTotalAmount,
            };
        case types.GET_VEHICLE_FAILED:
            return {
                ...state,
                type: action.type,
                errorMessage: action.errorMessage,
            };
        case types.UPDATE_VEHICLE:
            return {
                ...state,
                type: action.type,
                errorMessage: '',
            };
        case types.UPDATE_VEHICLE_SUCCESS:
            const index = state.vehicleList.findIndex(element => element.id === action.newData.id)
            state.vehicleList[index] = action.newData
            return {
                ...state,
                type: action.type,
                vehicleList: [...state.vehicleList],
            };
        case types.UPDATE_VEHICLE_FAILED:
            return {
                ...state,
                type: action.type,
                errorMessage: action.errorMessage,
            };
        case types.DELETE_VEHICLE_SUCCESS:
            const id = state.vehicleList.findIndex(element => element.id === action.id)
            state.vehicleList.splice(id,1)
            return {
                ...state,
                type: action.type,
                vehicleList: [...state.vehicleList],
                vehicleTotalAmount: state.vehicleTotalAmount-1,
            };
        case types.DELETE_VEHICLE_FAILED:
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
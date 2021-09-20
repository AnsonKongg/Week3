import * as types from "../config/ActionTypes";
import faker from "faker";

export const getVehicleList = (times) => {
    return async dispatch => {
        try {
            const vehicleLis = [];
            for (let i = 0; i < times; i++) {
                const obj = {
                    id: i+1,
                    vehicle: faker.vehicle.vehicle(),
                    type: faker.vehicle.type(),
                    fuel: faker.vehicle.fuel(),
                    color: faker.vehicle.color(),
                }
                vehicleLis.push(obj);
            }
            dispatch({
                type: types.GET_VEHICLE_SUCCESS,
                vehicleLis: vehicleLis,
                vehicleTotalAmount: times,
            });
        } catch (error) {
            dispatch({
                type: types.GET_VEHICLE_FAILED,
                errorMessage: error,
            });
        }
    }
}
export const updateVehicle = (newData) => {
    return async dispatch => {
        dispatch({
            type: types.UPDATE_VEHICLE,
        });
        try {
            dispatch({
                type: types.UPDATE_VEHICLE_SUCCESS,
                newData
            });
        } catch (error) {
            dispatch({
                type: types.UPDATE_VEHICLE_FAILED,
                errorMessage: error,
            });
        }
    }
}
export const removeVehicle = (id) => {
    return async dispatch => {
        try {
            dispatch({
                type: types.DELETE_VEHICLE_SUCCESS,
                id
            });
        } catch (error) {
            dispatch({
                type: types.DELETE_VEHICLE_FAILED,
                errorMessage: error,
            });
        }
    }
}
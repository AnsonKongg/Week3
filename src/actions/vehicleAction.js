import * as APIs from "../config/APIs";
import * as types from "../config/ActionTypes";
import { notification } from 'antd';

export const getVehicleList = () => {
    return async dispatch => {
        try {
            // const url = APIs.GET_STOCK_LIST_API + "?symbol=" + symbol + "&token=" + token;
            // const response = await fetch(url)
            // const stock = await response.json()
            // const stockDetail = {
            //     symbol: symbol,
            //     current_price: stock.c,
            //     change: stock.d > 0 ? "+" + String(stock.d) : String(stock.d),
            //     change_percent: Math.abs(Number(stock.dp).toFixed(2)),
            // }
            // dispatch({
            //     type: types.GET_VEHICLE_SUCCESS,
            //     symbol,
            //     stockDetail: stockDetail,
            // });
        } catch (error) {
            dispatch({
                type: types.GET_VEHICLE_FAILED,
                errorMessage: error,
            });
        }
    }
}
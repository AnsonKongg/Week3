import React, { useEffect } from 'react';
import { connect } from "react-redux";
import * as vehicleAction from "./actions/vehicleAction";
import './App.css';
import 'antd/dist/antd.css';
import { Typography } from 'antd';
import VehicleTable from './components/vehicleTable'
const { Title, Text } = Typography;

function App(props) {
  const { vehicleTotalAmount, getVehicleList } = props;

  useEffect(() => {
    // Generate default vehicle list
    getVehicleList(20)
  }, []);

  return (
    <div className="App">
      <div className="container">
        <Title level={4}>Inventory</Title>
        <Text>Found {vehicleTotalAmount} Vehicles</Text>
        <VehicleTable />
      </div>
    </div>
  );
}

// Selectors
const mapStateToProps = (state) => ({
  type: state.vehicleReducer.type,
  vehicleTotalAmount: state.vehicleReducer.vehicleTotalAmount
});

// Dispatch actions
const mapDispatchToProps = {
  getVehicleList: vehicleAction.getVehicleList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

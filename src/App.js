import React, { useState } from 'react';
import { connect } from "react-redux";
import * as vehicleAction from "./actions/vehicleAction";
import './App.css';
import { Row, Typography } from 'antd';
const { Title, Text } = Typography;

function App() {
  const [vehicleAmount, setVehicleAmount] = useState(0);

  return (
    <div className="App">
      <Row justify="center" align="middle" style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
          <Title level={4}>Inventory</Title>
          <Text>Found {vehicleAmount} Vehicles</Text>
      </Row>
    </div>
  );
}

// Selectors
const mapStateToProps = (state) => ({
  type: state.vehicleReducer.type,
  vehicleList: state.vehicleReducer.vehicleList
});

// Dispatch actions
const mapDispatchToProps = {
  getVehicleList: vehicleAction.getVehicleList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

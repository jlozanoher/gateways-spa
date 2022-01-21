import { Col, Row } from "antd";
import React from "react";
import styled from "styled-components";
import "./App.css";
import { Gateways } from "./components/Gateway/Gateways";
import { PeripheralList } from "./components/Peripheral/PeripheralList";

const LCol = styled(Col)`
  background-color: #ebe9e9;
`;

function App() {
  return (
    <div className="App">
      <Row>
        <LCol md={12}>
          <Gateways />
        </LCol>
        <Col>
          <PeripheralList />
        </Col>
      </Row>
    </div>
  );
}

export default App;

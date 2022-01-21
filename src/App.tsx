import { Col, Row } from "antd";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";
import "./App.css";
import { Gateways } from "./components/Gateway/Gateways";
import { Peripherals } from "./components/Peripheral/Peripherals";
import { ROUTES } from "./lib/routes";
import { PeripheralModel } from "./types/peripheral.model";

const LCol = styled(Col)`
  background-color: #ebe9e9;
`;

export interface IPeripheralContext {
  peripherals?: PeripheralModel[];
  fetchPeripherals?: () => void;
  setShowModal?: Dispatch<SetStateAction<boolean>>;
  showModal?: boolean;
}

export const PeripheralContext = React.createContext<IPeripheralContext>({});

function App() {
  const [peripherals, setPeripherals] = useState<PeripheralModel[]>([]);
  const [showModal, setShowModal] = useState(false);

  const fetchPeripherals = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}${ROUTES.peripherals}`)
      .then((res) => {
        setPeripherals(res.data);
      });
  };

  useEffect(() => {
    fetchPeripherals();
  }, []);

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <PeripheralContext.Provider
          value={{ peripherals, fetchPeripherals, setShowModal, showModal }}
        >
          <Row gutter={8}>
            <LCol md={12}>
              <Gateways />
            </LCol>
            <Col md={12}>
              <Peripherals />
            </Col>
          </Row>
        </PeripheralContext.Provider>
      </DndProvider>
    </div>
  );
}

export default App;

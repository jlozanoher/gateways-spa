import { Col, Modal, Row } from "antd";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";
import "./App.css";
import { Gateways } from "./components/Gateway/Gateways";
import { Peripherals } from "./components/Peripheral/Peripherals";
import { useGatewayGet } from "./contollers/gateway.controller";
import { usePeripheralGet } from "./contollers/peripheral.controller";
import {
  usePopulate,
  useShouldPopulate,
} from "./contollers/populate.controller";
import { GatewayModel } from "./types/gateway.model";
import { PeripheralModel } from "./types/peripheral.model";

const LCol = styled(Col)`
  background-color: #ebe9e9;
`;

export interface IAppContext {
  peripherals?: PeripheralModel[];
  gateways?: GatewayModel[];
  fetchPeripherals?: () => void;
  fetchGateways?: () => void;
  setShowModal?: Dispatch<SetStateAction<boolean>>;
  showModal?: boolean;
  peripheralForEdition?: PeripheralModel;
  setPeripheralForEdition?: Dispatch<
    SetStateAction<PeripheralModel | undefined>
  >;
}

export const AppContext = React.createContext<IAppContext>({});

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showPopulateModal, setShowPopulateModal] = useState(true);
  const [peripheralForEdition, setPeripheralForEdition] = useState<
    PeripheralModel | undefined
  >(undefined);

  const { handlefetchPeripherals, peripherals } = usePeripheralGet({});
  const { handlefetchGateways, gateways } = useGatewayGet({});

  const { handlePopulate } = usePopulate({
    onSuccess: () => {
      setShowPopulateModal(false);
      handlefetchGateways();
      handlefetchPeripherals();
    },
  });
  const { handleShouldPopulate, shouldPopuplate } = useShouldPopulate({});

  useEffect(() => {
    handleShouldPopulate();
    handlefetchPeripherals();
    handlefetchGateways();
  }, []);

  const handleClosePopulateModal = () => {
    setShowPopulateModal(false);
  };

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <AppContext.Provider
          value={{
            peripherals,
            gateways,
            fetchPeripherals: handlefetchPeripherals,
            fetchGateways: handlefetchGateways,
            setShowModal,
            showModal,
            peripheralForEdition,
            setPeripheralForEdition,
          }}
        >
          <Row gutter={8}>
            <LCol md={12}>
              <Gateways />
            </LCol>
            <Col md={12}>
              <Peripherals />
            </Col>
          </Row>
        </AppContext.Provider>
        {
          <Modal
            title={"Populate database"}
            visible={shouldPopuplate === "Yes" && showPopulateModal}
            onCancel={handleClosePopulateModal}
            onOk={handlePopulate}
          >
            {
              "The database is emtpy, would you want to populate it with test data?"
            }
          </Modal>
        }
      </DndProvider>
    </div>
  );
}

export default App;

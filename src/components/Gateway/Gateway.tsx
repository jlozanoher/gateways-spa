import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Typography } from "antd";
import React, { useContext } from "react";
import { useGatewayDelete } from "../../contollers/gateway.controller";
import { GatewayModel } from "../../types/gateway.model";
import { GatewayContext } from "./Gateways";

const { Title } = Typography;

interface Props {
  gateway: GatewayModel;
}

export const Gateway = (props: Props) => {
  const { gateway } = props;

  const { fetchGateways = () => {} } = useContext(GatewayContext);

  const { handleDeleteGateway } = useGatewayDelete({
    onSuccess: () => {
      fetchGateways();
    },
  });

  const onDelete = () => {
    handleDeleteGateway(gateway._id);
  };

  return (
    <Card>
      <Row>
        <Col md={4}>
          <Button icon={<DeleteOutlined />} danger onClick={onDelete} />
        </Col>
        <Col>
          <Title level={5}>{gateway.name}</Title>
          <div>{gateway.serialNumber}</div>
          <div>{gateway.ipv4Address}</div>
        </Col>
      </Row>
    </Card>
  );
};

import React from "react";
import { GatewayModel } from "../../types/gateway.model";
import { Gateway } from "./Gateway";

interface Props {
  gateways: GatewayModel[];
}

export const GatewaysList = (props: Props) => {
  const { gateways } = props;

  return (
    <div>
      {gateways.map((gateway) => (
        <Gateway key={gateway._id} gateway={gateway} />
      ))}
    </div>
  );
};

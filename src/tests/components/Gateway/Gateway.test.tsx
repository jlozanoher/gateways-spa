import React from "react";
import renderer from "react-test-renderer";
import { Gateway } from "../../../components/Gateway/Gateway";
import { GatewayModel } from "../../../types/gateway.model";
import { WithDnDContext } from "../../test_utils";

const gateway: GatewayModel = {
  _id: "123sda1",
  name: "Gate 1",
  ipv4Address: "1.1.1.1",
  serialNumber: "111",
};

test("Gateway should match snap", () => {
  const tree = renderer
    .create(
      <WithDnDContext>
        <Gateway gateway={gateway} />
      </WithDnDContext>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

import React from "react";
import renderer from "react-test-renderer";
import { GatewayCreate } from "../../../components/Gateway/GatewayCreate";

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

describe("GatewayCreate should match snaps", () => {
  it("GatewayCreate", () => {
    const tree = renderer.create(<GatewayCreate />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("GatewayCreate in edit mode", () => {
    const tree = renderer
      .create(
        <GatewayCreate
          gateway={{
            _id: "1231da",
            ipv4Address: "1.1.1.1",
            name: "Gate 1",
            serialNumber: "123",
          }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

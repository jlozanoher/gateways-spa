import React from "react";
import renderer from "react-test-renderer";
import { Peripheral } from "../../../components/Peripheral/Peripheral";
import { PeripheralModel } from "../../../types/peripheral.model";
import { WithDnDContext } from "../../test_utils";

const peripheral: PeripheralModel = {
  _id: "asd1dasd",
  createdAt: new Date("2022-01-22T10:20:30Z").toISOString(),
  gateway: "123123sdasd1",
  status: "online",
  uid: 123,
  vendor: "Vendor 1",
};

test("Peripheral should match snap", () => {
  const tree = renderer
    .create(
      <WithDnDContext>
        <Peripheral peripheral={peripheral} />
      </WithDnDContext>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

import { List } from "antd";
import React from "react";
import { PeripheralModel } from "../../types/peripheral.model";
import { Peripheral } from "./Peripheral";

interface Props {
  peripherals: PeripheralModel[];
}

export const PeripheralList = (props: Props) => {
  const { peripherals } = props;
  return (
    <List
      grid={{
        gutter: 8,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3,
      }}
      dataSource={peripherals}
      renderItem={(peripheral) => (
        <List.Item>
          <Peripheral key={peripheral._id} peripheral={peripheral} />
        </List.Item>
      )}
    />
  );
};

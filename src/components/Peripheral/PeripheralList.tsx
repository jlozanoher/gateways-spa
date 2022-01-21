import { Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ROUTES } from "../../lib/routes";
import { PeripheralModel } from "../../types/peripheral.model";
import { Peripheral } from "./Peripheral";

const { Title } = Typography;

export const PeripheralList = () => {
  const [peripherals, setPeripherals] = useState<PeripheralModel[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}${ROUTES.peripherals}`)
      .then((res) => {
        setPeripherals(res.data);
      });
  }, []);
  return (
    <div>
      <Title level={3}>Peripheral List</Title>
      {peripherals.map((peripheral) => (
        <Peripheral key={peripheral._id} peripheral={peripheral} />
      ))}
    </div>
  );
};

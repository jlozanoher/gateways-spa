import { message } from "antd";
import axios from "axios";
import { useState } from "react";
import { ROUTES } from "../lib/routes";
import { PeripheralModel } from "../types/peripheral.model";

interface Props {
  onSuccess: (peripheral: PeripheralModel) => void;
  onError?: (err: any) => void;
}

interface PropsGet {
  onSuccess?: (data: any) => void;
  onError?: (err: any) => void;
}

export const usePeripheralGet = (props: PropsGet) => {
  const { onError = () => {}, onSuccess = () => {} } = props;

  const [peripherals, setPeripherals] = useState<PeripheralModel[]>([]);

  const handlefetchPeripherals = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}${ROUTES.peripherals}`)
      .then((res) => {
        setPeripherals(res.data);
        onSuccess(res.data);
      })
      .catch((err) => {
        onError(err.response.data);
      });
  };

  return { handlefetchPeripherals, peripherals };
};

export const usePeripheralCreate = (props: Props) => {
  const { onError = () => {}, onSuccess } = props;

  const handleCreatePeripheral = (peripheral: PeripheralModel) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}${ROUTES.peripherals}`, peripheral)
      .then((res) => {
        onSuccess(res.data);
      })
      .catch((err) => {
        onError(err.response.data);
      });
  };

  return { handleCreatePeripheral };
};

export const usePeripheralUpdate = (props: Props) => {
  const { onError, onSuccess } = props;

  const handleUpdatePeripheral = (peripheral: PeripheralModel) => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}${ROUTES.peripherals}/${peripheral._id}`,
        peripheral
      )
      .then((res) => {
        onSuccess(res.data);
      })
      .catch((err) => {
        onError
          ? onError(err.response.data)
          : err?.response?.data && message.error(err.response.data);
      });
  };

  return { handleUpdatePeripheral };
};

export const usePeripheralDelete = (props: Props) => {
  const { onError = () => {}, onSuccess } = props;

  const handleDeletePeripheral = (_id: string) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}${ROUTES.peripherals}/${_id}`)
      .then((res) => {
        onSuccess(res.data);
      })
      .catch((err) => {
        onError(err.response.data);
      });
  };

  return { handleDeletePeripheral };
};

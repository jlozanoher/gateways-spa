import axios from "axios";
import { useState } from "react";
import { ROUTES } from "../lib/routes";
import { GatewayModel } from "../types/gateway.model";

interface Props {
  onSuccess: (gateway: GatewayModel) => void;
  onError?: (err: any) => void;
}

interface PropsGet {
  onSuccess?: (data: any) => void;
  onError?: (err: any) => void;
}

export const useGatewayGet = (props: PropsGet) => {
  const { onError = () => {}, onSuccess = () => {} } = props;

  const [gateways, setGateways] = useState<GatewayModel[]>([]);

  const handlefetchGateways = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}${ROUTES.gateways}`)
      .then((res) => {
        setGateways(res.data);
        onSuccess(res.data);
      })
      .catch((err) => {
        onError(err.response.data);
      });
  };

  return { handlefetchGateways, gateways };
};

export const useGatewayCreate = (props: Props) => {
  const { onError = () => {}, onSuccess } = props;

  const handleCreateGateway = (gateway: GatewayModel) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}${ROUTES.gateways}`, gateway)
      .then((res) => {
        onSuccess(res.data);
      })
      .catch((err) => {
        onError(err.response.data);
      });
  };

  return { handleCreateGateway };
};

export const useGatewayUpdate = (props: Props) => {
  const { onError = () => {}, onSuccess } = props;

  const handleUpdateGateway = (gateway: GatewayModel) => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}${ROUTES.gateways}/${gateway._id}`,
        gateway
      )
      .then((res) => {
        onSuccess(res.data);
      })
      .catch((err) => {
        onError(err.response.data);
      });
  };

  return { handleUpdateGateway };
};

export const useGatewayDelete = (props: Props) => {
  const { onError = () => {}, onSuccess } = props;

  const handleDeleteGateway = (_id: string) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}${ROUTES.gateways}/${_id}`)
      .then((res) => {
        onSuccess(res.data);
      })
      .catch((err) => {
        onError(err.response.data);
      });
  };

  return { handleDeleteGateway };
};

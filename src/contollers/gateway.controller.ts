import axios from "axios";
import { ROUTES } from "../lib/routes";
import { GatewayModel } from "../types/gateway.model";

interface Props {
  onSuccess: (gateway: GatewayModel) => void;
  onError?: (err: any) => void;
}

export const useGatewayCreate = (props: Props) => {
  const { onError = () => {}, onSuccess } = props;

  const handleCreateGateway = (gateway: GatewayModel) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}${ROUTES.gateways}`, gateway)
      .then((res) => {
        onSuccess(res.data);
      })
      .catch((err) => {
        onError(err);
      });
  };

  return { handleCreateGateway };
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
        onError(err);
      });
  };

  return { handleDeleteGateway };
};

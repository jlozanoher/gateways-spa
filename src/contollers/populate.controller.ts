import axios from "axios";
import { useState } from "react";
import { ROUTES } from "../lib/routes";

interface Props {
  onSuccess?: (data: any) => void;
  onError?: (err: any) => void;
}

export const useShouldPopulate = (props: Props) => {
  const { onError = () => {}, onSuccess = () => {} } = props;

  const [shouldPopuplate, setShouldPopuplate] = useState("No");

  const handleShouldPopulate = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}${ROUTES.shouldPopulate}`)
      .then((res) => {
        setShouldPopuplate(res.data);
        onSuccess(res.data);
      })
      .catch((err) => {
        onError(err.response.data);
      });
  };

  return { handleShouldPopulate, shouldPopuplate };
};

export const usePopulate = (props: Props) => {
  const { onError = () => {}, onSuccess = () => {} } = props;

  const handlePopulate = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}${ROUTES.populate}`)
      .then((res) => {
        onSuccess(res.data);
      })
      .catch((err) => {
        onError(err.response.data);
      });
  };

  return { handlePopulate };
};

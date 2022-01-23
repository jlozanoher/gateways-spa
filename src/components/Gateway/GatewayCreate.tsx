import { Button, Form, Input } from "antd";
import React, { useContext, useEffect } from "react";
import {
  useGatewayCreate,
  useGatewayUpdate,
} from "../../contollers/gateway.controller";
import { GatewayModel } from "../../types/gateway.model";
import { GatewayContext } from "./Gateways";
import * as S from "../styles";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface Props {
  gateway?: GatewayModel; // For updating instead of creating
}

export const GatewayCreate = (props: Props) => {
  const { gateway } = props;

  const { fetchGateways = () => {} } = useContext(GatewayContext);

  const { handleCreateGateway } = useGatewayCreate({
    onSuccess: () => {
      fetchGateways();
    },
    onError: (err) => {
      if (err?.name?.code === 11000 && err?.name?.keyPattern?.serialNumber)
        form.setFields([
          {
            name: "serialNumber",
            errors: ["Duplicity"],
          },
        ]);
    },
  });
  const { handleUpdateGateway } = useGatewayUpdate({
    onSuccess: () => {
      fetchGateways();
    },
  });

  const [form] = Form.useForm();

  useEffect(() => {
    if (gateway) {
      form.setFieldsValue(gateway);
    }
  }, [gateway]);

  const onFinish = (values: any) => {
    if (gateway?._id) {
      handleUpdateGateway({ ...values, _id: gateway._id });
    } else {
      handleCreateGateway(values);
    }
  };

  const onClear = () => {
    form.resetFields();
  };

  return (
    <div>
      <Form {...layout} form={form} onFinish={onFinish}>
        <Form.Item name={"name"} label={"Name"} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name={"serialNumber"}
          label={"Serial number"}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"ipv4Address"}
          label={"IPv4"}
          rules={[
            { required: true },
            () => ({
              validator(rule, value) {
                if (
                  !/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
                    value
                  )
                ) {
                  return Promise.reject("Invalid IPv4 address!");
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <S.Box>
            <Button type="primary" htmlType="submit">
              {gateway ? "Update Gateway" : "Create Gateway"}
            </Button>
            <Button onClick={onClear}>Clear</Button>
          </S.Box>
        </Form.Item>
      </Form>
    </div>
  );
};

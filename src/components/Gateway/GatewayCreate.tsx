import { Button, Form, Input } from "antd";
import React, { useContext } from "react";
import { useGatewayCreate } from "../../contollers/gateway.controller";
import { GatewayContext } from "./Gateways";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const GatewayCreate = () => {
  const { fetchGateways = () => {} } = useContext(GatewayContext);

  const { handleCreateGateway } = useGatewayCreate({
    onSuccess: () => {
      fetchGateways();
    },
  });

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    handleCreateGateway(values);
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
          <Button type="primary" htmlType="submit">
            Create Gateway
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

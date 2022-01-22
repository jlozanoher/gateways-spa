import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import React, { useContext } from "react";
import { PeripheralContext } from "../../App";
import { usePeripheralCreate } from "../../contollers/peripheral.controller";
import { PeripheralStatusEnum } from "../../types/peripheral.model";

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const PeripheralCreate = () => {
  const { fetchPeripherals = () => {} } = useContext(PeripheralContext);

  const [form] = Form.useForm();

  const { handleCreatePeripheral } = usePeripheralCreate({
    onSuccess: () => {
      fetchPeripherals();
    },
    onError: (err) => {
      if (err?.name?.code === 11000 && err?.name?.keyPattern?.uid)
        form.setFields([
          {
            name: "uid",
            errors: ["Duplicity"],
          },
        ]);
    },
  });

  const onFinish = (values: any) => {
    handleCreatePeripheral(values);
  };

  return (
    <div>
      <Form
        {...layout}
        form={form}
        onFinish={onFinish}
        initialValues={{ status: PeripheralStatusEnum.offline }}
      >
        <Form.Item name={"uid"} label={"uid"} rules={[{ type: "number" }]}>
          <InputNumber
            onChange={(v) => form.setFields([{ name: "uid", errors: [] }])}
          />
        </Form.Item>
        <Form.Item
          name={"vendor"}
          label={"vendor"}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={"status"} label={"status"}>
          <Select
            showSearch
            placeholder="status"
            defaultValue={PeripheralStatusEnum.offline}
          >
            <Option value={PeripheralStatusEnum.online}>
              {PeripheralStatusEnum.online}
            </Option>
            <Option value={PeripheralStatusEnum.offline}>
              {PeripheralStatusEnum.offline}
            </Option>
          </Select>
        </Form.Item>
        <Form.Item name={"createdAt"} label={"createdAt"}>
          <DatePicker />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Create Peripheral
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

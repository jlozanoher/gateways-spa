import { Button, Form, Input, InputNumber, Select } from "antd";
import dayjs from "dayjs";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../../App";
import {
  usePeripheralCreate,
  usePeripheralUpdate,
} from "../../contollers/peripheral.controller";
import {
  PeripheralModel,
  PeripheralStatusEnum,
} from "../../types/peripheral.model";
import DatePicker from "../DatePicker";
import * as S from "../styles";

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface Props {
  peripheral?: PeripheralModel; // For updating instead of creating
  onSave?: () => void;
}

export const PeripheralCreate = (props: Props) => {
  const { peripheral, onSave = () => {} } = props;
  const { fetchPeripherals = () => {} } = useContext(AppContext);

  const [form] = Form.useForm();

  const onError = (err: any) => {
    if (err?.name?.code === 11000 && err?.name?.keyPattern?.uid) {
      form.setFields([
        {
          name: "uid",
          errors: ["Duplicity"],
        },
      ]);
    } else if (err?.name === "ValidationError") {
      if (err?.params?.path === "body.uid")
        form.setFields([
          {
            name: "uid",
            errors: [err?.message],
          },
        ]);
    }
  };

  useEffect(() => {
    if (peripheral) {
      form.setFieldsValue({
        ...peripheral,
        createdAt: dayjs(peripheral.createdAt),
      });
    }
  }, [peripheral]);

  const { handleCreatePeripheral } = usePeripheralCreate({
    onSuccess: () => {
      fetchPeripherals();
      onSave();
    },
    onError: onError,
  });

  const { handleUpdatePeripheral } = usePeripheralUpdate({
    onSuccess: () => {
      fetchPeripherals();
      onSave();
    },
    onError: onError,
  });

  const onFinish = (values: any) => {
    if (peripheral?._id) {
      handleUpdatePeripheral({ ...values, _id: peripheral._id });
    } else {
      handleCreatePeripheral(values);
    }
  };

  const onClear = () => {
    form.resetFields();
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
          <Select showSearch placeholder="status">
            <Option value={PeripheralStatusEnum.online} key={1}>
              {PeripheralStatusEnum.online}
            </Option>
            <Option value={PeripheralStatusEnum.offline} key={2}>
              {PeripheralStatusEnum.offline}
            </Option>
          </Select>
        </Form.Item>
        <Form.Item name={"createdAt"} label={"createdAt"}>
          <DatePicker />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <S.Box>
            <Button type="primary" htmlType="submit">
              {peripheral?._id ? "Update Peripheral" : "Create Peripheral"}
            </Button>
            <Button onClick={onClear}>Clear</Button>
          </S.Box>
        </Form.Item>
      </Form>
    </div>
  );
};

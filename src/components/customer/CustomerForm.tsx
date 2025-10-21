import { Form, Input, Select, Button, Card, Tabs, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { CustomerStatus, PartnerType, CreateCustomerPayload } from "@/types/customer";
import { AddressFormFields } from "./AddressFormFields";
import { ContactInformationForm } from "./ContactInformationForm";

const createCustomer = async (payload: CreateCustomerPayload) => {
  // Replace with your actual API endpoint
  const response = await fetch("/api/customers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create customer");
  }

  return response.json();
};

export const CustomerForm = () => {
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      message.success("Tạo khách hàng thành công!");
      form.resetFields();
    },
    onError: (error) => {
      message.error(`Tạo khách hàng thất bại: ${error.message}`);
    },
  });

  const onFinish = (values: any) => {
    const payload: CreateCustomerPayload = {
      customer: {
        ...values,
        exportInformations: values.exportInformations || [],
        importInformations: values.importInformations || [],
      },
    };
    mutation.mutate(payload);
  };

  const tabItems = [
    {
      key: "general",
      label: "Thông tin chung",
      children: (
        <div>
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>

          <Form.Item
            name="name"
            label="Tên khách hàng"
            rules={[{ required: true, message: "Vui lòng nhập tên khách hàng" }]}
          >
            <Input placeholder="Tên khách hàng" size="large" />
          </Form.Item>

          <Form.Item
            name="code"
            label="Mã khách hàng"
            rules={[{ required: true, message: "Vui lòng nhập mã khách hàng" }]}
          >
            <Input placeholder="Mã khách hàng" />
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
          >
            <Select placeholder="Chọn trạng thái">
              <Select.Option value={CustomerStatus.STATUS_UNSPECIFIED}>Chưa xác định</Select.Option>
              <Select.Option value={CustomerStatus.ACTIVE}>Hoạt động</Select.Option>
              <Select.Option value={CustomerStatus.INACTIVE}>Không hoạt động</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="type"
            label="Loại đối tác"
            rules={[{ required: true, message: "Vui lòng chọn loại đối tác" }]}
          >
            <Select placeholder="Chọn loại đối tác">
              <Select.Option value={PartnerType.PARTNER_TYPE_UNSPECIFIED}>
                Chưa xác định
              </Select.Option>
              <Select.Option value={PartnerType.SUPPLIER}>Nhà cung cấp</Select.Option>
              <Select.Option value={PartnerType.CUSTOMER}>Khách hàng</Select.Option>
              <Select.Option value={PartnerType.BOTH}>Cả hai</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              { pattern: /^[0-9+\-\s()]+$/, message: "Số điện thoại không hợp lệ" },
            ]}
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item name="taxCode" label="Mã số thuế">
            <Input placeholder="Mã số thuế" />
          </Form.Item>

          <Form.Item name="address" label="Địa chỉ tổng quan">
            <Input.TextArea placeholder="Địa chỉ tổng quan" rows={2} />
          </Form.Item>

          <Form.Item name="noted" label="Ghi chú">
            <Input.TextArea placeholder="Ghi chú" rows={3} />
          </Form.Item>
        </div>
      ),
    },
    {
      key: "address",
      label: "Địa chỉ chi tiết",
      children: (
        <div>
          <h3 style={{ marginBottom: 16 }}>Thông tin địa chỉ chính</h3>
          <AddressFormFields prefix="addresses" />
        </div>
      ),
    },
    {
      key: "export",
      label: "Thông tin xuất khẩu",
      children: (
        <ContactInformationForm name="exportInformations" title="Thông tin xuất khẩu" />
      ),
    },
    {
      key: "import",
      label: "Thông tin nhập khẩu",
      children: (
        <ContactInformationForm name="importInformations" title="Thông tin nhập khẩu" />
      ),
    },
  ];

  return (
    <Card
      title="Tạo khách hàng mới"
      extra={
        <Button type="primary" size="large" onClick={() => form.submit()} loading={mutation.isPending}>
          Tạo khách hàng
        </Button>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          status: CustomerStatus.ACTIVE,
          type: PartnerType.CUSTOMER,
        }}
      >
        <Tabs items={tabItems} />
      </Form>
    </Card>
  );
};

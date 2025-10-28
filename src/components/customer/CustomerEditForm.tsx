import { Form, Input, Select, Button, Card, Tabs, message, Spin } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CustomerStatus, PartnerType, CreateCustomerPayload, Customer } from "@/types/customer";
import { AddressFormFields } from "./AddressFormFields";
import { ContactInformationForm } from "./ContactInformationForm";
import { ServiceFeeTab } from "./ServiceFeeTab";

const updateCustomer = async (payload: CreateCustomerPayload) => {
  // Replace with your actual API endpoint
  const response = await fetch(`/api/customers/${payload.customer.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update customer");
  }

  return response.json();
};

interface CustomerEditFormProps {
  customer: Customer;
  loading?: boolean;
}

export const CustomerEditForm = ({ customer, loading = false }: CustomerEditFormProps) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (customer) {
      form.setFieldsValue(customer);
    }
  }, [customer, form]);

  const mutation = useMutation({
    mutationFn: updateCustomer,
    onSuccess: () => {
      message.success("Cập nhật khách hàng thành công!");
      navigate("/customers");
    },
    onError: (error) => {
      message.error(`Cập nhật khách hàng thất bại: ${error.message}`);
    },
  });

  const onFinish = (values: any) => {
    const payload: CreateCustomerPayload = {
      customer: {
        ...values,
        id: customer.id,
        exportInformations: values.exportInformations || [],
        importInformations: values.importInformations || [],
      },
    };
    mutation.mutate(payload);
  };

  if (loading) {
    return (
      <Card>
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <Spin size="large" />
        </div>
      </Card>
    );
  }

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
    {
      key: "serviceFee",
      label: "Phí dịch vụ",
      children: <ServiceFeeTab form={form} />,
    },
  ];

  return (
    <Card
      title={`Chỉnh sửa khách hàng: ${customer.name}`}
      extra={
        <div style={{ display: "flex", gap: "8px" }}>
          <Button onClick={() => navigate("/customers")}>Hủy</Button>
          <Button
            type="primary"
            size="large"
            onClick={() => form.submit()}
            loading={mutation.isPending}
          >
            Lưu thay đổi
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Tabs items={tabItems} />
      </Form>
    </Card>
  );
};

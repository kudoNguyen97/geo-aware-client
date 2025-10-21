import { Form, Input, Button, Card, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { AddressFormFields } from "./AddressFormFields";

interface ContactInformationFormProps {
  name: string;
  title: string;
}

export const ContactInformationForm = ({ name, title }: ContactInformationFormProps) => {
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <>
          {fields.map((field, index) => (
            <Card
              key={field.key}
              title={`${title} ${index + 1}`}
              size="small"
              style={{ marginBottom: 16 }}
              extra={
                fields.length > 0 ? (
                  <Button
                    type="text"
                    danger
                    icon={<MinusCircleOutlined />}
                    onClick={() => remove(field.name)}
                  >
                    Xóa
                  </Button>
                ) : null
              }
            >
              <Form.Item name={[field.name, "id"]} hidden>
                <Input />
              </Form.Item>

              <Form.Item
                name={[field.name, "name"]}
                label="Tên công ty"
                rules={[{ required: true, message: "Vui lòng nhập tên công ty" }]}
              >
                <Input placeholder="Tên công ty" />
              </Form.Item>

              <Form.Item
                name={[field.name, "contactName"]}
                label="Tên người liên hệ"
                rules={[{ required: true, message: "Vui lòng nhập tên người liên hệ" }]}
              >
                <Input placeholder="Tên người liên hệ" />
              </Form.Item>

              <Form.Item
                name={[field.name, "phone"]}
                label="Số điện thoại"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại" },
                  { pattern: /^[0-9+\-\s()]+$/, message: "Số điện thoại không hợp lệ" },
                ]}
              >
                <Input placeholder="Số điện thoại" />
              </Form.Item>

              <Form.Item
                name={[field.name, "email"]}
                label="Email"
                rules={[
                  { required: true, message: "Vui lòng nhập email" },
                  { type: "email", message: "Email không hợp lệ" },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item name={[field.name, "taxCode"]} label="Mã số thuế">
                <Input placeholder="Mã số thuế" />
              </Form.Item>

              <div style={{ marginTop: 24, marginBottom: 16 }}>
                <h4 style={{ marginBottom: 16 }}>Địa chỉ liên hệ</h4>
                <AddressFormFields prefix={[field.name, "contactAddress"]} isNested />
              </div>
            </Card>
          ))}
          <Button
            type="dashed"
            onClick={() => add()}
            block
            icon={<PlusOutlined />}
            style={{ marginBottom: 16 }}
          >
            Thêm {title}
          </Button>
        </>
      )}
    </Form.List>
  );
};

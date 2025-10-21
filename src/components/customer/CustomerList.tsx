import { Table, Button, Tag, Space, Card } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { mockCustomers } from "@/data/mockCustomers";
import { Customer, CustomerStatus, PartnerType } from "@/types/customer";
import type { ColumnsType } from "antd/es/table";

const getStatusColor = (status: CustomerStatus) => {
  switch (status) {
    case CustomerStatus.ACTIVE:
      return "success";
    case CustomerStatus.INACTIVE:
      return "default";
    default:
      return "default";
  }
};

const getStatusText = (status: CustomerStatus) => {
  switch (status) {
    case CustomerStatus.ACTIVE:
      return "Hoạt động";
    case CustomerStatus.INACTIVE:
      return "Không hoạt động";
    default:
      return "Chưa xác định";
  }
};

const getTypeColor = (type: PartnerType) => {
  switch (type) {
    case PartnerType.CUSTOMER:
      return "blue";
    case PartnerType.SUPPLIER:
      return "orange";
    case PartnerType.BOTH:
      return "purple";
    default:
      return "default";
  }
};

const getTypeText = (type: PartnerType) => {
  switch (type) {
    case PartnerType.CUSTOMER:
      return "Khách hàng";
    case PartnerType.SUPPLIER:
      return "Nhà cung cấp";
    case PartnerType.BOTH:
      return "Cả hai";
    default:
      return "Chưa xác định";
  }
};

export const CustomerList = () => {
  const navigate = useNavigate();

  const columns: ColumnsType<Customer> = [
    {
      title: "Mã KH",
      dataIndex: "code",
      key: "code",
      width: 100,
      fixed: "left",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      key: "name",
      width: 250,
      fixed: "left",
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      width: 130,
      render: (type: PartnerType) => (
        <Tag color={getTypeColor(type)}>{getTypeText(type)}</Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 130,
      render: (status: CustomerStatus) => (
        <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: "Mã số thuế",
      dataIndex: "taxCode",
      key: "taxCode",
      width: 120,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: 300,
      ellipsis: true,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 150,
      fixed: "right",
      render: (_: any, record: Customer) => (
        <Space size="small">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => navigate(`/customers/edit/${record.id}`)}
          >
            Sửa
          </Button>
          <Button icon={<EyeOutlined />} size="small">
            Xem
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Danh sách khách hàng"
      extra={
        <Button type="primary" onClick={() => navigate("/customers/create")}>
          Tạo mới
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={mockCustomers}
        rowKey="id"
        scroll={{ x: 1500 }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} khách hàng`,
        }}
      />
    </Card>
  );
};

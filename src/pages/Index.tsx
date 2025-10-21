import { Button, Card, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-5xl font-bold text-foreground">
            Hệ thống quản lý khách hàng
          </h1>
          <p className="text-xl text-muted-foreground">
            Quản lý thông tin khách hàng toàn diện và chuyên nghiệp
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card
            hoverable
            className="shadow-md transition-all hover:shadow-lg"
            onClick={() => navigate("/customers")}
          >
            <div className="text-center">
              <UserOutlined style={{ fontSize: 48, color: "hsl(var(--primary))" }} />
              <h2 className="mt-4 text-2xl font-semibold">Danh sách khách hàng</h2>
              <p className="mt-2 text-muted-foreground">
                Xem và quản lý tất cả khách hàng
              </p>
              <Button type="primary" className="mt-4">
                Xem danh sách
              </Button>
            </div>
          </Card>

          <Card
            hoverable
            className="shadow-md transition-all hover:shadow-lg"
            onClick={() => navigate("/customers/create")}
          >
            <div className="text-center">
              <PlusOutlined style={{ fontSize: 48, color: "hsl(var(--accent))" }} />
              <h2 className="mt-4 text-2xl font-semibold">Tạo khách hàng mới</h2>
              <p className="mt-2 text-muted-foreground">
                Thêm khách hàng mới vào hệ thống
              </p>
              <Button type="primary" className="mt-4">
                Tạo mới
              </Button>
            </div>
          </Card>

          <Card hoverable className="shadow-md transition-all hover:shadow-lg">
            <div className="text-center">
              <div className="text-4xl">📊</div>
              <h2 className="mt-4 text-2xl font-semibold">Thống kê</h2>
              <p className="mt-2 text-muted-foreground">
                Xem báo cáo và thống kê
              </p>
              <Button className="mt-4" disabled>
                Sắp ra mắt
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-12">
          <Card>
            <h3 className="mb-4 text-xl font-semibold">Tính năng chính</h3>
            <Space direction="vertical" size="middle" className="w-full">
              <div className="flex items-start gap-3">
                <div className="text-2xl">✅</div>
                <div>
                  <h4 className="font-semibold">Quản lý thông tin đầy đủ</h4>
                  <p className="text-muted-foreground">
                    Lưu trữ thông tin khách hàng, địa chỉ, xuất/nhập khẩu chi tiết
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">🌍</div>
                <div>
                  <h4 className="font-semibold">Địa chỉ theo cấp hành chính</h4>
                  <p className="text-muted-foreground">
                    Quản lý địa chỉ theo vùng, quốc gia, tỉnh, huyện, xã
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">📦</div>
                <div>
                  <h4 className="font-semibold">Thông tin xuất/nhập khẩu</h4>
                  <p className="text-muted-foreground">
                    Quản lý danh sách thông tin xuất khẩu và nhập khẩu
                  </p>
                </div>
              </div>
            </Space>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;

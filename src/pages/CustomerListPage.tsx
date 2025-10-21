import { CustomerList } from "@/components/customer/CustomerList";

const CustomerListPage = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-foreground">
            Quản lý khách hàng
          </h1>
          <p className="text-lg text-muted-foreground">
            Danh sách tất cả khách hàng trong hệ thống
          </p>
        </div>
        <CustomerList />
      </div>
    </div>
  );
};

export default CustomerListPage;

import { CustomerForm } from "@/components/customer/CustomerForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-foreground">
            Quản lý khách hàng
          </h1>
          <p className="text-lg text-muted-foreground">
            Hệ thống quản lý thông tin khách hàng toàn diện
          </p>
        </div>
        <CustomerForm />
      </div>
    </div>
  );
};

export default Index;

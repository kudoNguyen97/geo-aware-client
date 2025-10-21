import { useParams, useNavigate } from "react-router-dom";
import { CustomerEditForm } from "@/components/customer/CustomerEditForm";
import { getCustomerById } from "@/data/mockCustomers";
import { Button, Result } from "antd";
import { useEffect, useState } from "react";
import { Customer } from "@/types/customer";

const CustomerEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      if (id) {
        const foundCustomer = getCustomerById(id);
        setCustomer(foundCustomer);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  if (!loading && !customer) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="mx-auto max-w-7xl">
          <Result
            status="404"
            title="Không tìm thấy khách hàng"
            subTitle={`Không tìm thấy khách hàng với ID: ${id}`}
            extra={
              <Button type="primary" onClick={() => navigate("/customers")}>
                Quay lại danh sách
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-foreground">
            Chỉnh sửa khách hàng
          </h1>
          <p className="text-lg text-muted-foreground">
            Cập nhật thông tin khách hàng
          </p>
        </div>
        {customer && <CustomerEditForm customer={customer} loading={loading} />}
      </div>
    </div>
  );
};

export default CustomerEditPage;

import { useState, useEffect } from "react";
import { Form, Button, Select, Table, Checkbox, InputNumber, Card, Space, message } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { fetchMockServices, fetchMockFeeDetail } from "@/data/mockServices";

interface ExtraFee {
  type: string;
  amount: number;
  description: string;
}

interface FeeDetailResponse {
  chargeableWeight: number;
  serviceFee: number;
  vatFee: number;
  leadTime: number;
  estimatedDeliveryDate: string;
  extraFees: ExtraFee[];
}

interface ServiceFeeTabProps {
  form: any;
  initialData?: {
    serviceCode?: string;
    serviceFee?: number;
    vatFee?: number;
    sumCharge?: number;
  };
}

export const ServiceFeeTab = ({ form, initialData }: ServiceFeeTabProps) => {
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [services, setServices] = useState<any[]>([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(initialData?.serviceCode);
  const [feeDetail, setFeeDetail] = useState<FeeDetailResponse | null>(null);
  const [loadingFeeDetail, setLoadingFeeDetail] = useState(false);
  const [checkedExtraFees, setCheckedExtraFees] = useState<Set<number>>(new Set());

  // Auto-populate data in edit mode
  useEffect(() => {
    if (initialData?.serviceCode && initialData?.serviceFee !== undefined && initialData?.vatFee !== undefined) {
      // Auto-fetch services and fee detail when in edit mode
      const loadInitialData = async () => {
        setLoadingServices(true);
        try {
          const servicesData = await fetchMockServices();
          setServices(servicesData);
          
          // Auto-fetch fee detail for the selected service
          if (initialData.serviceCode) {
            setLoadingFeeDetail(true);
            try {
              const data: FeeDetailResponse = await fetchMockFeeDetail(initialData.serviceCode);
              setFeeDetail(data);
              
              // Set form values from initial data
              form.setFieldValue("serviceFee", initialData.serviceFee);
              form.setFieldValue("vatFee", initialData.vatFee);
              form.setFieldValue("sumCharge", initialData.sumCharge);
            } catch (error) {
              message.error("Không thể tải chi tiết phí dịch vụ");
            } finally {
              setLoadingFeeDetail(false);
            }
          }
        } catch (error) {
          message.error("Không thể tải danh sách dịch vụ");
        } finally {
          setLoadingServices(false);
        }
      };
      
      loadInitialData();
    }
  }, [initialData, form]);

  // Check if required fields are filled
  useEffect(() => {
    const checkRequiredFields = () => {
      const values = form.getFieldsValue();
      
      // Check CustomerForm required fields
      const hasNameAndCode = values.name && values.code;
      
      // Check ContactInformation fields (at least one entry with required fields filled)
      const hasValidExportInfo = values.exportInformations?.some((info: any) => 
        info?.name && info?.contactName && info?.taxCode &&
        info?.contactAddress?.region && info?.contactAddress?.country &&
        info?.contactAddress?.stateProvince && info?.contactAddress?.district &&
        info?.contactAddress?.ward && info?.contactAddress?.street
      );
      
      const hasValidImportInfo = values.importInformations?.some((info: any) => 
        info?.name && info?.contactName && info?.taxCode &&
        info?.contactAddress?.region && info?.contactAddress?.country &&
        info?.contactAddress?.stateProvince && info?.contactAddress?.district &&
        info?.contactAddress?.ward && info?.contactAddress?.street
      );
      
      setIsButtonActive(hasNameAndCode && (hasValidExportInfo || hasValidImportInfo));
    };

    // Listen to form changes
    const subscription = form.getFieldsValue(true);
    checkRequiredFields();
    
    // Set up interval to check fields (since Ant Design doesn't provide onChange for entire form)
    const interval = setInterval(checkRequiredFields, 500);
    
    return () => clearInterval(interval);
  }, [form]);

  const fetchServiceList = async () => {
    setLoadingServices(true);
    try {
      // Using mock data - replace with actual API endpoint in production
      // const response = await fetch("/api/services");
      // if (!response.ok) throw new Error("Failed to fetch services");
      // const data = await response.json();
      const data = await fetchMockServices();
      setServices(data);
      message.success("Tải danh sách dịch vụ thành công");
    } catch (error) {
      message.error("Không thể tải danh sách dịch vụ");
    } finally {
      setLoadingServices(false);
    }
  };

  const fetchFeeDetail = async (serviceCode: string) => {
    setLoadingFeeDetail(true);
    try {
      // Using mock data - replace with actual API endpoint in production
      // const response = await fetch(`/api/services/${serviceCode}/fee-detail`);
      // if (!response.ok) throw new Error("Failed to fetch fee detail");
      // const data: FeeDetailResponse = await response.json();
      const data: FeeDetailResponse = await fetchMockFeeDetail(serviceCode);
      
      setFeeDetail(data);
      setCheckedExtraFees(new Set());
      
      // Auto-fill serviceFee and vatFee
      form.setFieldValue("serviceFee", data.serviceFee);
      form.setFieldValue("vatFee", data.vatFee);
      
      // Calculate initial sum
      calculateSumCharge(data.serviceFee, data.vatFee, new Set());
      message.success("Tải chi tiết phí thành công");
    } catch (error) {
      message.error("Không thể tải chi tiết phí dịch vụ");
    } finally {
      setLoadingFeeDetail(false);
    }
  };

  const calculateSumCharge = (serviceFee: number, vatFee: number, checkedFees: Set<number>) => {
    const extraFeesSum = feeDetail?.extraFees
      ?.filter((_, index) => checkedFees.has(index))
      .reduce((sum, fee) => sum + fee.amount, 0) || 0;
    
    const total = serviceFee + vatFee + extraFeesSum;
    form.setFieldValue("sumCharge", total);
  };

  const handleServiceChange = (value: string) => {
    setSelectedService(value);
    const service = services.find(s => s.code === value);
    if (service?.code) {
      fetchFeeDetail(service.code);
    }
  };

  const handleExtraFeeCheck = (index: number, checked: boolean) => {
    const newChecked = new Set(checkedExtraFees);
    if (checked) {
      newChecked.add(index);
    } else {
      newChecked.delete(index);
    }
    setCheckedExtraFees(newChecked);
    
    const serviceFee = form.getFieldValue("serviceFee") || 0;
    const vatFee = form.getFieldValue("vatFee") || 0;
    calculateSumCharge(serviceFee, vatFee, newChecked);
  };

  const extraFeeColumns = [
    {
      title: "",
      key: "checkbox",
      width: 50,
      render: (_: any, __: any, index: number) => (
        <Checkbox
          checked={checkedExtraFees.has(index)}
          onChange={(e: CheckboxChangeEvent) => handleExtraFeeCheck(index, e.target.checked)}
        />
      ),
    },
    {
      title: "Loại phí",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => amount.toFixed(2),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <div>
      <Card title="Tính phí dịch vụ" size="small" style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: "100%" }} size="large">
          <Button
            type="primary"
            onClick={fetchServiceList}
            disabled={!isButtonActive}
            loading={loadingServices}
            block
          >
            Lấy danh sách dịch vụ
          </Button>

          {services.length > 0 && (
            <Form.Item label="Chọn dịch vụ" required>
              <Select
                placeholder="Chọn dịch vụ"
                value={selectedService}
                onChange={handleServiceChange}
                loading={loadingFeeDetail}
                options={services.map(service => ({
                  label: service.name || service.code,
                  value: service.code,
                }))}
              />
            </Form.Item>
          )}
        </Space>
      </Card>

      {feeDetail && (
        <Card title="Chi tiết phí" size="small" style={{ marginBottom: 16 }}>
          <Space direction="vertical" style={{ width: "100%" }} size="middle">
            <Form.Item name="serviceFee" label="Phí dịch vụ">
              <InputNumber
                style={{ width: "100%" }}
                readOnly
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />
            </Form.Item>

            <Form.Item name="vatFee" label="Phí VAT">
              <InputNumber
                style={{ width: "100%" }}
                readOnly
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />
            </Form.Item>

            {feeDetail.extraFees && feeDetail.extraFees.length > 0 && (
              <div>
                <h4 style={{ marginBottom: 8 }}>Phí bổ sung</h4>
                <Table
                  columns={extraFeeColumns}
                  dataSource={feeDetail.extraFees}
                  pagination={false}
                  size="small"
                  rowKey={(_, index) => index!.toString()}
                />
              </div>
            )}

            <Form.Item name="sumCharge" label="Tổng phí">
              <InputNumber
                style={{ width: "100%" }}
                readOnly
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />
            </Form.Item>

            <div style={{ fontSize: "12px", color: "#999" }}>
              <p>Trọng lượng tính phí: {feeDetail.chargeableWeight}</p>
              <p>Thời gian dự kiến: {feeDetail.leadTime} ngày</p>
              <p>Ngày giao hàng dự kiến: {new Date(feeDetail.estimatedDeliveryDate).toLocaleDateString('vi-VN')}</p>
            </div>
          </Space>
        </Card>
      )}
    </div>
  );
};

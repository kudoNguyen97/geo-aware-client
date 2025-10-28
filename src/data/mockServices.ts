export interface Service {
  code: string;
  name: string;
  description?: string;
}

export interface FeeDetail {
  chargeableWeight: number;
  serviceFee: number;
  vatFee: number;
  leadTime: number;
  estimatedDeliveryDate: string;
  extraFees: {
    type: string;
    amount: number;
    description: string;
  }[];
}

export const mockServices: Service[] = [
  {
    code: "EXPRESS",
    name: "Giao hàng hỏa tốc",
    description: "Giao hàng trong 24h",
  },
  {
    code: "STANDARD",
    name: "Giao hàng tiêu chuẩn",
    description: "Giao hàng trong 3-5 ngày",
  },
  {
    code: "ECONOMY",
    name: "Giao hàng tiết kiệm",
    description: "Giao hàng trong 7-10 ngày",
  },
  {
    code: "AIR_FREIGHT",
    name: "Vận chuyển hàng không",
    description: "Vận chuyển đường hàng không quốc tế",
  },
  {
    code: "SEA_FREIGHT",
    name: "Vận chuyển đường biển",
    description: "Vận chuyển container đường biển",
  },
];

export const mockFeeDetails: Record<string, FeeDetail> = {
  EXPRESS: {
    chargeableWeight: 2.5,
    serviceFee: 150000,
    vatFee: 15000,
    leadTime: 1,
    estimatedDeliveryDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    extraFees: [
      {
        type: "FUEL_SURCHARGE",
        amount: 10000,
        description: "Phụ phí nhiên liệu",
      },
      {
        type: "REMOTE_AREA",
        amount: 25000,
        description: "Phí vùng sâu vùng xa",
      },
      {
        type: "INSURANCE",
        amount: 5000,
        description: "Phí bảo hiểm hàng hóa",
      },
    ],
  },
  STANDARD: {
    chargeableWeight: 3.0,
    serviceFee: 80000,
    vatFee: 8000,
    leadTime: 4,
    estimatedDeliveryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    extraFees: [
      {
        type: "FUEL_SURCHARGE",
        amount: 6000,
        description: "Phụ phí nhiên liệu",
      },
      {
        type: "REMOTE_AREA",
        amount: 15000,
        description: "Phí vùng sâu vùng xa",
      },
    ],
  },
  ECONOMY: {
    chargeableWeight: 3.5,
    serviceFee: 45000,
    vatFee: 4500,
    leadTime: 8,
    estimatedDeliveryDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    extraFees: [
      {
        type: "FUEL_SURCHARGE",
        amount: 3000,
        description: "Phụ phí nhiên liệu",
      },
    ],
  },
  AIR_FREIGHT: {
    chargeableWeight: 50.0,
    serviceFee: 2500000,
    vatFee: 250000,
    leadTime: 3,
    estimatedDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    extraFees: [
      {
        type: "FUEL_SURCHARGE",
        amount: 200000,
        description: "Phụ phí nhiên liệu hàng không",
      },
      {
        type: "SECURITY_FEE",
        amount: 150000,
        description: "Phí an ninh hàng không",
      },
      {
        type: "CUSTOMS_CLEARANCE",
        amount: 300000,
        description: "Phí làm thủ tục hải quan",
      },
      {
        type: "INSURANCE",
        amount: 100000,
        description: "Phí bảo hiểm hàng hóa quốc tế",
      },
    ],
  },
  SEA_FREIGHT: {
    chargeableWeight: 1000.0,
    serviceFee: 5000000,
    vatFee: 500000,
    leadTime: 30,
    estimatedDeliveryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    extraFees: [
      {
        type: "PORT_HANDLING",
        amount: 800000,
        description: "Phí bốc dỡ cảng",
      },
      {
        type: "CUSTOMS_CLEARANCE",
        amount: 500000,
        description: "Phí làm thủ tục hải quan",
      },
      {
        type: "CONTAINER_DEPOSIT",
        amount: 2000000,
        description: "Phí đặt cọc container",
      },
      {
        type: "DOCUMENTATION",
        amount: 200000,
        description: "Phí chứng từ",
      },
    ],
  },
};

// API mock functions
export const fetchMockServices = async (): Promise<Service[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockServices;
};

export const fetchMockFeeDetail = async (serviceCode: string): Promise<FeeDetail> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const feeDetail = mockFeeDetails[serviceCode];
  if (!feeDetail) {
    throw new Error("Service not found");
  }
  
  return feeDetail;
};

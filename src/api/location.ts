import { LocationOption } from "@/types/customer";

// Mock API functions - replace with your actual API endpoints
export const locationApi = {
  getRegions: async (): Promise<LocationOption[]> => {
    // Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { label: "Đông Nam Á", value: "southeast-asia", code: "SEA" },
          { label: "Đông Á", value: "east-asia", code: "EA" },
          { label: "Nam Á", value: "south-asia", code: "SA" },
        ]);
      }, 500);
    });
  },

  getCountries: async (regionCode: string): Promise<LocationOption[]> => {
    // Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (regionCode === "SEA") {
          resolve([
            { label: "Việt Nam", value: "vietnam", code: "VN" },
            { label: "Thái Lan", value: "thailand", code: "TH" },
            { label: "Singapore", value: "singapore", code: "SG" },
          ]);
        } else {
          resolve([]);
        }
      }, 500);
    });
  },

  getProvinces: async (countryCode: string): Promise<LocationOption[]> => {
    // Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (countryCode === "VN") {
          resolve([
            { label: "Hà Nội", value: "hanoi", code: "HN" },
            { label: "TP. Hồ Chí Minh", value: "hochiminh", code: "HCM" },
            { label: "Đà Nẵng", value: "danang", code: "DN" },
          ]);
        } else {
          resolve([]);
        }
      }, 500);
    });
  },

  getDistricts: async (provinceCode: string): Promise<LocationOption[]> => {
    // Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (provinceCode === "HN") {
          resolve([
            { label: "Quận Ba Đình", value: "ba-dinh", code: "BD" },
            { label: "Quận Hoàn Kiếm", value: "hoan-kiem", code: "HK" },
            { label: "Quận Cầu Giấy", value: "cau-giay", code: "CG" },
          ]);
        } else if (provinceCode === "HCM") {
          resolve([
            { label: "Quận 1", value: "quan-1", code: "Q1" },
            { label: "Quận 2", value: "quan-2", code: "Q2" },
            { label: "Quận 3", value: "quan-3", code: "Q3" },
          ]);
        } else {
          resolve([]);
        }
      }, 500);
    });
  },

  getWards: async (districtCode: string): Promise<LocationOption[]> => {
    // Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (districtCode) {
          resolve([
            { label: "Phường 1", value: "phuong-1", code: "P1" },
            { label: "Phường 2", value: "phuong-2", code: "P2" },
            { label: "Phường 3", value: "phuong-3", code: "P3" },
          ]);
        } else {
          resolve([]);
        }
      }, 500);
    });
  },
};

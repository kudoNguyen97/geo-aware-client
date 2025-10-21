import { Form, Input, Select, Checkbox, InputNumber } from "antd";
import { useQuery } from "@tanstack/react-query";
import { locationApi } from "@/api/location";
import { useEffect, useState } from "react";
import { AddressType } from "@/types/customer";

interface AddressFormFieldsProps {
  prefix: string | number | (string | number)[];
  isNested?: boolean;
}

export const AddressFormFields = ({ prefix, isNested = false }: AddressFormFieldsProps) => {
  const form = Form.useFormInstance();
  const [regionCode, setRegionCode] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("");
  const [provinceCode, setProvinceCode] = useState<string>("");
  const [districtCode, setDistrictCode] = useState<string>("");

  const { data: regions = [], isLoading: regionsLoading } = useQuery({
    queryKey: ["regions"],
    queryFn: locationApi.getRegions,
  });

  const { data: countries = [], isLoading: countriesLoading } = useQuery({
    queryKey: ["countries", regionCode],
    queryFn: () => locationApi.getCountries(regionCode),
    enabled: !!regionCode,
  });

  const { data: provinces = [], isLoading: provincesLoading } = useQuery({
    queryKey: ["provinces", countryCode],
    queryFn: () => locationApi.getProvinces(countryCode),
    enabled: !!countryCode,
  });

  const { data: districts = [], isLoading: districtsLoading } = useQuery({
    queryKey: ["districts", provinceCode],
    queryFn: () => locationApi.getDistricts(provinceCode),
    enabled: !!provinceCode,
  });

  const { data: wards = [], isLoading: wardsLoading } = useQuery({
    queryKey: ["wards", districtCode],
    queryFn: () => locationApi.getWards(districtCode),
    enabled: !!districtCode,
  });

  const getFieldName = (field: string) => {
    if (Array.isArray(prefix)) {
      return [...prefix, field];
    }
    return isNested ? [prefix, field] : field;
  };

  const handleRegionChange = (value: string, option: any) => {
    setRegionCode(option.code);
    setCountryCode("");
    setProvinceCode("");
    setDistrictCode("");
    
    form.setFieldValue(getFieldName("regionCode"), option.code);
    form.setFieldValue(getFieldName("country"), "");
    form.setFieldValue(getFieldName("countryCode"), "");
    form.setFieldValue(getFieldName("stateProvince"), "");
    form.setFieldValue(getFieldName("stateProvinceCode"), "");
    form.setFieldValue(getFieldName("city"), "");
    form.setFieldValue(getFieldName("cityCode"), "");
    form.setFieldValue(getFieldName("district"), "");
    form.setFieldValue(getFieldName("districtCode"), "");
    form.setFieldValue(getFieldName("ward"), "");
    form.setFieldValue(getFieldName("wardCode"), "");
  };

  const handleCountryChange = (value: string, option: any) => {
    setCountryCode(option.code);
    setProvinceCode("");
    setDistrictCode("");
    
    form.setFieldValue(getFieldName("countryCode"), option.code);
    form.setFieldValue(getFieldName("stateProvince"), "");
    form.setFieldValue(getFieldName("stateProvinceCode"), "");
    form.setFieldValue(getFieldName("city"), "");
    form.setFieldValue(getFieldName("cityCode"), "");
    form.setFieldValue(getFieldName("district"), "");
    form.setFieldValue(getFieldName("districtCode"), "");
    form.setFieldValue(getFieldName("ward"), "");
    form.setFieldValue(getFieldName("wardCode"), "");
  };

  const handleProvinceChange = (value: string, option: any) => {
    setProvinceCode(option.code);
    setDistrictCode("");
    
    form.setFieldValue(getFieldName("stateProvinceCode"), option.code);
    form.setFieldValue(getFieldName("cityCode"), option.code);
    form.setFieldValue(getFieldName("district"), "");
    form.setFieldValue(getFieldName("districtCode"), "");
    form.setFieldValue(getFieldName("ward"), "");
    form.setFieldValue(getFieldName("wardCode"), "");
  };

  const handleDistrictChange = (value: string, option: any) => {
    setDistrictCode(option.code);
    
    form.setFieldValue(getFieldName("districtCode"), option.code);
    form.setFieldValue(getFieldName("ward"), "");
    form.setFieldValue(getFieldName("wardCode"), "");
  };

  const handleWardChange = (value: string, option: any) => {
    form.setFieldValue(getFieldName("wardCode"), option.code);
  };

  return (
    <>
      <Form.Item name={getFieldName("regionCode")} hidden>
        <Input />
      </Form.Item>
      <Form.Item name={getFieldName("countryCode")} hidden>
        <Input />
      </Form.Item>
      <Form.Item name={getFieldName("stateProvinceCode")} hidden>
        <Input />
      </Form.Item>
      <Form.Item name={getFieldName("cityCode")} hidden>
        <Input />
      </Form.Item>
      <Form.Item name={getFieldName("districtCode")} hidden>
        <Input />
      </Form.Item>
      <Form.Item name={getFieldName("wardCode")} hidden>
        <Input />
      </Form.Item>

      <Form.Item
        name={getFieldName("region")}
        label="Vùng"
        rules={[{ required: true, message: "Vui lòng chọn vùng" }]}
      >
        <Select
          placeholder="Chọn vùng"
          loading={regionsLoading}
          onChange={handleRegionChange}
          options={regions}
        />
      </Form.Item>

      <Form.Item
        name={getFieldName("country")}
        label="Quốc gia"
        rules={[{ required: true, message: "Vui lòng chọn quốc gia" }]}
      >
        <Select
          placeholder="Chọn quốc gia"
          loading={countriesLoading}
          disabled={!regionCode}
          onChange={handleCountryChange}
          options={countries}
        />
      </Form.Item>

      <Form.Item
        name={getFieldName("stateProvince")}
        label="Tỉnh/Thành phố"
        rules={[{ required: true, message: "Vui lòng chọn tỉnh/thành phố" }]}
      >
        <Select
          placeholder="Chọn tỉnh/thành phố"
          loading={provincesLoading}
          disabled={!countryCode}
          onChange={handleProvinceChange}
          options={provinces}
        />
      </Form.Item>

      <Form.Item name={getFieldName("city")} hidden>
        <Input />
      </Form.Item>

      <Form.Item
        name={getFieldName("district")}
        label="Quận/Huyện"
        rules={[{ required: true, message: "Vui lòng chọn quận/huyện" }]}
      >
        <Select
          placeholder="Chọn quận/huyện"
          loading={districtsLoading}
          disabled={!provinceCode}
          onChange={handleDistrictChange}
          options={districts}
        />
      </Form.Item>

      <Form.Item
        name={getFieldName("ward")}
        label="Phường/Xã"
        rules={[{ required: true, message: "Vui lòng chọn phường/xã" }]}
      >
        <Select
          placeholder="Chọn phường/xã"
          loading={wardsLoading}
          disabled={!districtCode}
          onChange={handleWardChange}
          options={wards}
        />
      </Form.Item>

      <Form.Item
        name={getFieldName("street")}
        label="Địa chỉ"
        rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
      >
        <Input placeholder="Số nhà, tên đường" />
      </Form.Item>

      <Form.Item name={getFieldName("streetSecondary")} label="Địa chỉ phụ">
        <Input placeholder="Địa chỉ phụ (nếu có)" />
      </Form.Item>

      <Form.Item name={getFieldName("postalCode")} label="Mã bưu điện">
        <Input placeholder="Mã bưu điện" />
      </Form.Item>

      <Form.Item name={getFieldName("latitude")} label="Vĩ độ">
        <InputNumber placeholder="Vĩ độ" style={{ width: "100%" }} step={0.000001} />
      </Form.Item>

      <Form.Item name={getFieldName("longitude")} label="Kinh độ">
        <InputNumber placeholder="Kinh độ" style={{ width: "100%" }} step={0.000001} />
      </Form.Item>

      <Form.Item name={getFieldName("type")} label="Loại địa chỉ">
        <Select placeholder="Chọn loại địa chỉ">
          <Select.Option value={AddressType.ADDRESS_TYPE_UNSPECIFIED}>Chưa xác định</Select.Option>
          <Select.Option value={AddressType.BILLING}>Thanh toán</Select.Option>
          <Select.Option value={AddressType.SHIPPING}>Giao hàng</Select.Option>
          <Select.Option value={AddressType.BOTH}>Cả hai</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name={getFieldName("note")} label="Ghi chú">
        <Input.TextArea placeholder="Ghi chú về địa chỉ" rows={2} />
      </Form.Item>

      <Form.Item name={getFieldName("isSystemVerified")} valuePropName="checked">
        <Checkbox>Đã xác minh bởi hệ thống</Checkbox>
      </Form.Item>
    </>
  );
};

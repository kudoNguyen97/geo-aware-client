export enum CustomerStatus {
  STATUS_UNSPECIFIED = "STATUS_UNSPECIFIED",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum PartnerType {
  PARTNER_TYPE_UNSPECIFIED = "PARTNER_TYPE_UNSPECIFIED",
  SUPPLIER = "SUPPLIER",
  CUSTOMER = "CUSTOMER",
  BOTH = "BOTH",
}

export enum AddressType {
  ADDRESS_TYPE_UNSPECIFIED = "ADDRESS_TYPE_UNSPECIFIED",
  BILLING = "BILLING",
  SHIPPING = "SHIPPING",
  BOTH = "BOTH",
}

export interface Address {
  street: string;
  streetSecondary: string;
  ward: string;
  wardCode: string;
  district: string;
  districtCode: string;
  city: string;
  cityCode: string;
  stateProvince: string;
  stateProvinceCode: string;
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  type: AddressType;
  note: string;
  isSystemVerified: boolean;
}

export interface ContactInformation {
  id: string;
  name: string;
  contactName: string;
  phone: string;
  email: string;
  taxCode: string;
  contactAddress: Address;
}

export interface Customer {
  id: string;
  status: CustomerStatus;
  name: string;
  phone: string;
  email: string;
  address: string;
  type: PartnerType;
  code: string;
  taxCode: string;
  noted: string;
  createdAt: string;
  updatedAt: string;
  addresses: Address;
  exportInformations: ContactInformation[];
  importInformations: ContactInformation[];
}

export interface CreateCustomerPayload {
  customer: Customer;
}

export interface LocationOption {
  label: string;
  value: string;
  code: string;
}

export interface CreateUserAddressDto {
  userId: number;
  alias: string;
  streetAddress: string;
  apartmentOrSuite: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

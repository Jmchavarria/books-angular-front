export class UserAddresses {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly alias: string,
    public readonly streetAddress: string,
    public readonly apartmentOrSuite: string,
    public readonly city: string,
    public readonly state: string,
    public readonly postalCode: string,
    public readonly country: string,
    public readonly isDefault: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}

export interface CreateAuthorDto {
  firstName: string;
  lastName: string;
  birthdate: Date;
  biography?: string;
  countryOfBirth: string;
  literaryGenre?: string;
  photoUrl?: string;
}

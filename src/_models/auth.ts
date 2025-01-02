export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  expiredAt: string;
}

export interface ISignupPayload {
  email: string;
  surname: string;
  lastName: string;
  password: string;
  roleId: string;
  phone?: string;
  address?: string;
  city?: string;
  companyName?: string;
  country?: string;
  industry?: string;
}

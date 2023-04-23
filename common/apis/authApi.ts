import axiosClient from './axiosClient';

export interface IUser {
  telephone: String;
  password: String;
}

export interface IUserResponse {
  accessToken: String;
  admin: String;
  false: String;
  createdAt: String;
  refreshToken: String;
  telephone: String;
  updatedAt: String;
  username: String;
}

export const register = async (user: {
  username: String;
  telephone: String;
  address: String;
  password: String;
}) => {
  const url = '/auth/register';
  return axiosClient.post(url, user);
};

export const login = async (user: IUser): Promise<IUserResponse> => {
  const url = '/auth/login';
  return axiosClient.post(url, user);
};

// export const logout = async (user: IUser) => {
//   const url = '/auth/logout';
//   return axiosClient.post(url, user);
// };

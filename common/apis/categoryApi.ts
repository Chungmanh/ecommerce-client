import axiosClient from './axiosClient';

export interface ICategory {
  _id: string;
  name: String;
  description: String;
  status?: Boolean;
}

export const getAllCategory = async (): Promise<ICategory[]> => {
  const url = '/category/all';
  return axiosClient.get(url);
};

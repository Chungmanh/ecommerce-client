import axiosClient from '../apis/axiosClient';

export interface ICategory {
  _id?: string;
  name: string;
  avatar?: File | string;
  description: string;
  status?: Boolean;
}

export const getAllCategory = async (): Promise<ICategory[]> => {
  const url = '/category/all';
  return axiosClient.get(url);
};

export const createCategory = async (category: any): Promise<ICategory[]> => {
  const url = '/category/add';
  return axiosClient.post(url, category, {
    headers: {
      'content-type': 'multipart/form-data',
      // 'content-type': 'application/json',
    },
  });
};

export const getCategoryById = async (id: string): Promise<ICategory> => {
  const url = `/category/${id}`;
  return axiosClient.get(url);
};

export const deleteCategory = async (id: string) => {
  const url = `/category/delete/${id}`;
  return axiosClient.delete(url);
};

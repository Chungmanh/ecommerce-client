import axiosClient from './axiosClient';

export const addTrademark = async (trademark: object) => {
  const url = '/trademark/add';
  return axiosClient.post(url, trademark, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

export const getAllTrademarksByUser = async (): Promise<[]> => {
  const url = '/trademark/get-trademark-by-user';
  return axiosClient.get(url);
};

// export const getAllTrademarksByUser = async (): Promise<[]> => {
//   const url = '/trademark/all';
//   return axiosClient.get(url);
// };

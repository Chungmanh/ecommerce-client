import axiosClient from './axiosClient';

// export const addTrademark = async (trademark: object) => {
//   const url = '/trademark/add';
//   return axiosClient.post(url, trademark, {
//     headers: {
//       'content-type': 'application/json',
//     },
//   });
// };

export const getDataRevenue = async (date: {
  from: string;
  to: string;
}): Promise<any> => {
  const url = '/revenue/get-data';
  return axiosClient.post(url, date, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

import axios from 'axios';

const axiosClient = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_APP_API_URL,
  headers: {
    // Accept: "applicaiton/json",
    // 'Access-Control-Allow-Origin': '*',
    'content-type': 'application/json',
    // "content-type": "multipart/form-data",
  },

  // paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const accessToken = JSON.parse(`${localStorage?.getItem('accessToken')}`);
  // console.log('lay accessToken: ', accessToken);

  if (accessToken) {
    // console.log('token: ', accessToken);

    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    // console.log('response: ', response);

    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  async (error) => {
    // Handle errors
    const config = error.config;
    // console.log('error.response?.data: ', error.response);

    const { name, message } = error.response?.data || {};

    if (name === 'TokenExpiredError' && message === 'jwt expired') {
      console.log('Token het han', config);
      const accessToken = await refreshToken();

      if (accessToken) {
        // console.log('da lay lai:  ', accessToken);
        localStorage.setItem('accessToken', JSON.stringify(accessToken));
        config.headers.Authorization = `Bearer ${accessToken}`;
        // if (config.data) {
        //   console.log('Co form data');
        //   config.headers['content-type'] = 'multipart/form-data';
        // }
        return axiosClient(config);
      }
    }

    // if (name === 'Authenticated' && message === 'You are not authenticated') {
    //   return false;
    // }

    throw error;
  }
);

const refreshToken = async () => {
  const accessToken = await axiosClient.get('/auth/refreshToken');
  return accessToken;
};

export default axiosClient;

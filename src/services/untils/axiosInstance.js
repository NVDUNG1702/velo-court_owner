import axios from "axios";



const axiosIntance = axios.create({
    // baseURL: 'https://axiosIntance.example.com',
});

axiosIntance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosIntance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem('refreshToken');
            const { data } = await axios.post('https://axiosIntance.example.com/refresh', {
                token: refreshToken,
            });

            localStorage.setItem('token', data.newToken);

            originalRequest.headers.Authorization = `Bearer ${data.newToken}`;
            return axiosIntance(originalRequest);
        }
        return Promise.reject(error);
    }
);

export default axiosIntance;
import axios from "axios";

const TIME_OUT_SEC = 60000;

const axiosInstance = () => {
    const axiosInstance = axios.create({
        baseURL: "http://localhost:3000/",//base URL can be set here if needed
        timeout: TIME_OUT_SEC, // Set a timeout of 10 seconds
        headers: {
            "Content-Type": "application/json",
        },
    });

    axiosInstance.interceptors.request.use(
        (config) => {
            // You can add any request interceptors here, like adding auth tokens
            return config;
        },
        (error) => {
            // Handle request errors
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {

            if (error.response) {
                return {
                    isError: true,
                    status: error.response.status,
                    response: error.response,
                }
            } else if (error.request) {
                // The request was made but no response was received    
                return {
                    isError: true,
                    status: 500,
                    response: "Network error",
                    message: "No response received from the server."
                };
            } else {
                // Something happened in setting up the request that triggered an Error 
                return {
                    isError: true,
                    status: 500,
                    response: error.response,
                    message: error.message
                };
            }

        }
    );
    return axiosInstance;
};

export default axiosInstance;

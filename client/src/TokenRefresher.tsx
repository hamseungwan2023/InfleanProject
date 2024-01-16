import axios from "axios";
import { useEffect } from "react";

const TokenRefresher = () => {

  useEffect(() => {
    const intercept = axios.interceptors.response.use(
      (res) => res,
      async (error) => {
        const originalConfig = error.config;
        const msg = error.response.data.message;
        const status = error.response.status;

        if(status === 401) {
          if (msg === "기간이 만료된 토큰") {
            const res = await axios.post("/users/refreshToken",{
              refreshToken: localStorage.getItem("refreshToken")
            })

            localStorage.setItem("accessToken", res.data.accessToken);

            originalConfig.headers["Authorization"] = "Bearer " + res.data.accessToken;

            const refreshAPI = await axios.create({
              baseURL: "/",
              headers: { "Content-Type": "application/json" },
            })

            refreshAPI(originalConfig);
            window.location.reload();
          }
        } else {
          window.alert(msg);
        }

        return Promise.reject(error);
      }
    );
    return () => {
      axios.interceptors.response.eject(intercept);
    }
  }, []);
}

export default TokenRefresher;
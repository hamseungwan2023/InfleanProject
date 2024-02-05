import axios from "axios";
import { useEffect } from "react";

const TokenRefresher = () => {
  useEffect(() => {
    const intercept = axios.interceptors.response.use(
      (res) => { return res},
      async (error) => {
        const originalConfig = error.config;
        const msg = error.response.data.message;
        const status = error.response.status;

        if (status === 401) {
          console.log(msg);
          if (msg === "기간이 만료된 토큰") {
            const res = await axios.post("/user/refreshToken",{}, {
              headers: {
                Authorization: localStorage.getItem("refreshToken")
              },
            });
            
            await console.log(res);
            await localStorage.setItem("accessToken", res.data.accessToken);

            originalConfig.headers["Authorization"] =
              await "Bearer " + res.data.accessToken;

            await window.location.reload();
          }
        } else {
          window.alert(msg);
        }

        return Promise.reject(error);
      }
    );
    return () => {
      axios.interceptors.response.eject(intercept);
    };
  }, []);

  return <></>;
};

export default TokenRefresher;

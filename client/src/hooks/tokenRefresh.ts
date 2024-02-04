import axios from "axios";

export const tokenRefresh = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  try {
    const response = await axios.post(
      "/user/refreshToken",
      {},
      {
        headers: {
          Authorization: String(refreshToken),
        },
      }
    );

    console.log("성공");
    console.log(response.data);
    localStorage.clear();
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
  } catch (err: any) {
    console.error(err);
  }
};

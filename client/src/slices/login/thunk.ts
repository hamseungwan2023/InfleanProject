import { apiError, loginSuccess } from "./reducer";
import { userData } from "../../constants/userData";

export const loginUser =
  async (user: any, history: any) => async (dispatch: any) => {
    try {
      let response;
      const data = await userData;
      if (data) {
        localStorage.setItem("authUser", JSON.stringify(data));
        dispatch(loginSuccess(data));
        history.push("/");
      }
    } catch (error) {
      dispatch(apiError(error));
    }
  };

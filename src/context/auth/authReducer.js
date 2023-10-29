import {
  AUTH_WITH_TOKEN,
  LOGIN_SUCCESS,
  LOG_OUT,
  SET_LOADING,
} from "../../config/typeConstants";

const authReducer = (authState, action) => {
  switch (action.type) {
    case AUTH_WITH_TOKEN:
      return {
        ...authState,
        isAuthenticated: true,
        loading:false,
        user: {
          userId: action.payload,
          userName: localStorage.getItem("userName"),
        },
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("userName", action.payload.userName);
      return {
        ...authState,
        isAuthenticated: true,
        loading: false,
        user: {
          userId: action.payload.userId,
          userName: action.payload.userName,
        },
      };
    case LOG_OUT:
      return {
        ...authState,
        isAuthenticated: false,
      };
      case SET_LOADING:
        return{
          ...authState,
          isAuthenticated: false,
          loading:false
      }
    default:
      return authState;
  }
};
export default authReducer;

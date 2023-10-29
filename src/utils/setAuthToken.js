import axios from 'axios';
const setAuthToken = (accessToken,refreshToken) => {
  if (accessToken) {
    axios.defaults.headers.common['Authorization'] =`Bearer ${accessToken}`;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem("refreshToken",refreshToken)
  } else {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('accessToken');
    localStorage.removeItem("refreshToken")
  }
};

export default setAuthToken;
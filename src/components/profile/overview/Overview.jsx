import { useState, useEffect, useContext } from "react";
import "./Overview.css";
import { fetchUserProfileData } from "../../../services/viewUpdateProfile";
import authContext from "../../../context/auth/authContext";
import { toast } from "react-toastify";

const Overview = () => {
  const { authState } = useContext(authContext);
  const [userDetail, setUserDetail] = useState(authState?.user);

     useEffect(  () => {
           getUserDetails();
         
     }, []);

  const getUserDetails = () => {
    fetchUserProfileData(authState?.user?.userId)
      .then((response) => {
        setUserDetail(response);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  

  return (
    <>
      <table>
        <tbody>
          <tr className="row row-css">
            <td
              data-testid="username"
              className="col-lg-3 col-md-4 label label-css"
            >
              Username
            </td>
            <td className="col-lg-9 col-md-8 ">{userDetail?.userName}</td>
          </tr>

          <tr className="row row-css">
            <td
              data-testid="full-name"
              className="col-lg-3 col-md-4 label label-css"
            >
              Full Name
            </td>
            <td className="col-lg-9 col-md-8 ">
              {userDetail?.firstName} {userDetail?.lastName}
            </td>
          </tr>

          <tr className="row row-css">
            <td
              data-testid="email"
              className="col-lg-3 col-md-4 label label-css"
            >
              Email
            </td>
            <td className="col-lg-9 col-md-8 ">{userDetail?.email}</td>
          </tr>
          <tr className="row row-css">
            <td
              data-testid="mobile"
              className="col-lg-3 col-md-4 label label-css"
            >
              Mobile Number
            </td>
            <td className="col-lg-9 col-md-8 ">{userDetail?.phoneNumber}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Overview;

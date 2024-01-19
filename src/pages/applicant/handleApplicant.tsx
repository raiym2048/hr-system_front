import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "../../redux/store/store";
import { Outlet } from "react-router-dom";

const HandleApplicant = () => {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.authSlice);

  useEffect(() => {
    if (!auth && auth) {
      navigate("/registration");
    }
  });

  return (
    <>
      <Outlet />
    </>
  );
};


export default HandleApplicant
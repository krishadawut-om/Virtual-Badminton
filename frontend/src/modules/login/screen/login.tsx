import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BaseUrl } from "../../../common/constant/baseUrl";
import {
  deleteUserDataFromStorage,
  setUserDataFromStorage,
} from "../../../common/services/localStorage";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../../common/services/userService";
import GamePlay from "../../home/components/gamePlay/gamePlay";
import { Level } from "../../home/components/levelCard/levelCard";
import LoginPopup from "../components/loginPopup/loginPopup";
import RegisterPopup from "../components/registerPopup/registerPopup";

export default function Login() {
  const [isShowRegister, setIsShowRegister] = useState(false);
  const navigate = useNavigate();
  const [login, loginResult] = useLoginMutation();
  const [register, registerResult] = useRegisterMutation();

  async function handleLogin(e) {
    try {
      let result = await login(e).unwrap();
      setUserDataFromStorage(result);
      navigate("/home");
    } catch (error) {
      if (error.status === 400) {
        toast.error("Incorrect Password!");
      } else if (error.status === 401) {
        toast.error("User Not Found!");
      } else {
        toast.error("Something Went Wrong!");
      }
    }
  }

  async function handleRegister(e) {
    try {
      await register(e).unwrap();
      setIsShowRegister(false);
      toast.success("Register Success!");
    } catch (error) {
      if (error.status === 400) {
        toast.error("A User With That Username Already Exists ");
      } else {
        toast.error("Something Went Wrong!");
      }
    }
  }

  return (
    <div>
      {!isShowRegister && (
        <LoginPopup
          onClickLogin={(e) => handleLogin(e)}
          onClickRegister={() => setIsShowRegister(true)}
          onClickPlayAsGuest={() => {
            deleteUserDataFromStorage();
            navigate("/home");
          }}
          isLoading={loginResult.isLoading}
        />
      )}
      {isShowRegister && (
        <RegisterPopup
          onClickConfirm={(e) => handleRegister(e)}
          onClickCancel={() => setIsShowRegister(false)}
          isLoading={registerResult.isLoading}
        />
      )}
      <GamePlay
        isStart={false}
        level={Level.EASY}
        showCamera={false}
        fullHeight
      />
    </div>
  );
}

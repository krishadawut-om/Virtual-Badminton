import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../../../common/components/button/button";
import Textfield from "../../../../common/components/textfield/textfield";
import "./registerPopup.scss";

export default function RegisterPopup(props: {
  onClickConfirm?: (e: { username: string; password: string }) => void;
  onClickCancel?: () => void;
  isLoading?: boolean;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <>
      <div className="game-result-bg">
        <div className="game-result">
          <p className="game-result-title">สมัครสมาชิก</p>
          <div className="game-result-container">
            <Textfield
              placeholder="username"
              onChange={(e) => setUsername(e)}
            />
            <Textfield
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e)}
            />
            <Textfield
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e)}
            />
            <div style={{ height: "8px", margin: "0" }} />
            <div className="login-buttons-container">
              <div style={{ flex: "2" }}>
                <Button
                  text={"ยกเลิก"}
                  isDense
                  backgroundColor={"#6FC3F9"}
                  onClick={props.onClickCancel}
                />
              </div>
              <div style={{ flex: "3" }}>
                <Button
                  text={"ยืนยัน"}
                  isDense
                  isLoading={props.isLoading}
                  onClick={() => {
                    if (password !== "" && password === confirmPassword) {
                      props.onClickConfirm({
                        username: username,
                        password: password,
                      });
                    } else {
                      toast.error("Password Not Match!");
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

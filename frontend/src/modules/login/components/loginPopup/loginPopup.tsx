import { useState } from "react";
import Button from "../../../../common/components/button/button";
import Textfield from "../../../../common/components/textfield/textfield";
import "./loginPopup.scss";

export default function LoginPopup(props: {
  onClickLogin?: (e: { username: string; password: string }) => void;
  onClickRegister?: () => void;
  onClickPlayAsGuest?: () => void;
  isLoading?: boolean;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="game-result-bg">
        <div className="game-result">
          <p className="game-result-title">เข้าสู่ระบบ</p>
          <div className="game-result-container">
            <Textfield
              onChange={(e) => setUsername(e)}
              placeholder="username"
            />
            <Textfield
              onChange={(e) => setPassword(e)}
              type="password"
              placeholder="password"
            />
            <div style={{ height: "8px", margin: "0" }} />
            <div className="login-buttons-container">
              <div style={{ flex: "2" }}>
                <Button
                  text={"สมัคร"}
                  isDense
                  backgroundColor={"#6FC3F9"}
                  onClick={props.onClickRegister}
                />
              </div>
              <div style={{ flex: "3" }}>
                <Button
                  text={"เข้าสู่ระบบ"}
                  isLoading={props.isLoading}
                  isDense
                  onClick={() =>
                    props.onClickLogin({
                      username: username,
                      password: password,
                    })
                  }
                />
              </div>
            </div>
            <div
              style={{
                height: "1px",
                backgroundColor: "white",
                opacity: "0.5",
                margin: "16px 0",
              }}
            />
            <Button
              text={"เล่นในฐานะแขก"}
              isDense
              backgroundColor={"white"}
              fontColor={"black"}
              onClick={props.onClickPlayAsGuest}
            />
          </div>
        </div>
      </div>
    </>
  );
}

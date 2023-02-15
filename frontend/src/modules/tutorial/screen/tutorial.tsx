import { Level } from "../../home/components/levelCard/levelCard";
import Tutorial1Popup from "../components/tutorialsPopup/tutorial1Popup";
import { Step } from "react-joyride";
import BottomBar from "../../../common/components/bottomBar/bottomBar";
import { useEffect, useState } from "react";
import { Joyride } from "../components/joyride";
import Tutorial2Popup from "../components/tutorialsPopup/tutorial2Popup";
import Tutorial3Popup from "../components/tutorialsPopup/tutorial3Popup";
import Tutorial4Popup from "../components/tutorialsPopup/tutorial4Popup";
import Tutorial5Popup from "../components/tutorialsPopup/tutorial5Popup";
import Tutorial6Popup from "../components/tutorialsPopup/tutorial6popup";
import PopupBackground from "../components/tutorialsPopup/popupBackground";
import Confetti from "react-confetti";
import GamePlay from "../../home/components/gamePlay/gamePlay";

export default function Tutorial() {
  const [run, setRun] = useState<boolean>(true);
  const [stepIndexState, setStepIndexState] = useState(0);
  const [steps, setSteps] = useState<Step[]>();

  useEffect(() => {
    setSteps([
      {
        target: "body",
        content: "หากพร้อมแล้วกดถัดไปเพื่อเริ่มการสอนเลย !",
        placement: "center",
      },
      {
        target: "#my-first-step",
        content: "แบมือให้กล้องเพื่อเริ่มจับไม้",
        placement: "right",
        styles: { options: { width: 250 } },
      },
      {
        target: "#my-second-step",
        content: "ขยับมือเพื่อปรับตำแหน่งไม้",
        placement: "top",
        styles: { options: { width: 250 } },
      },
      {
        target: "#my-third-step",
        content: "กำมือเพื่อตีลูก",
        placement: "right",
        styles: { options: { width: 200 } },
      },
      {
        target: "#my-fourth-step",
        content: "ลากมือที่กำไปยังลูกศรเพื่อเลือกทิศทางในการตี",
        placement: "bottom",
        styles: { options: { width: 250 } },
      },
      {
        target: "#my-fifth-step",
        content: "หากเลือกทิศทางแล้วให้แบมือเพื่อยืนยันการเลือก",
        placement: "bottom",
        styles: { options: { width: 250 } },
      },
      {
        target: "#my-sixth-step",
        content:
          "หากแบมือแล้ววงล้อความเร็วจะหยุดเพื่อเป็นการเลือกความแรงในการตีลูก",
        placement: "bottom",
        styles: { options: { width: 300 } },
      },
      {
        target: "body",
        content: "คุณได้สำเร็จการสอนแล้ว !",
        placement: "center",
        styles: { buttonNext: { display: "none" } },
      },
    ]);
  }, []);

  return (
    <div id="test">
      <Joyride
        steps={steps}
        run={run}
        setRun={setRun}
        stepIndexState={stepIndexState}
        setStepIndexState={setStepIndexState}
      />
      {(stepIndexState === 0 || stepIndexState === 7) && <PopupBackground />}
      {stepIndexState === 1 && <Tutorial1Popup id="my-first-step" />}
      {stepIndexState === 2 && <Tutorial2Popup id="my-second-step" />}
      {stepIndexState === 3 && <Tutorial3Popup id="my-third-step" />}
      {stepIndexState === 4 && <Tutorial4Popup id="my-fourth-step" />}
      {stepIndexState === 5 && <Tutorial5Popup id="my-fifth-step" />}
      {stepIndexState === 6 && <Tutorial6Popup id="my-sixth-step" />}
      {stepIndexState === 7 && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <GamePlay isStart={false} level={Level.EASY} showCamera={false} />
      <div
        style={{
          position: "absolute",
          zIndex: "3",
          bottom: "0",
        }}
      >
        <BottomBar />
      </div>
    </div>
  );
}

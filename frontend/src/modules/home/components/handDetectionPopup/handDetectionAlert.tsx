import HandIcon from "../../../../common/images/icon/handIcon";

export default function HandDetectionAlert() {
  return (
    <div
      style={{
        position: "absolute",
        zIndex: "2",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontSize: "28px",
        fontWeight: "bold",
      }}
    >
      <HandIcon width={300} />
      ไม่สามารถตรวจจับหามือได้
      <br />
      กรุณาแบมือให้กล้องเพื่อเริ่มจับไม้
    </div>
  );
}

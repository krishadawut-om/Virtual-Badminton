import DirectionSelection from "../../../home/components/directionSelection/directionSelection";

export default function Tutorial4Popup(props: { id?: string }) {
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
      }}
    >
      <DirectionSelection
        isStart={false}
        handId={props.id}
        height={window.innerHeight - 180}
        startPos={{ x: window.innerWidth / 2, y: window.innerHeight / 2 - 200 }}
      />
    </div>
  );
}

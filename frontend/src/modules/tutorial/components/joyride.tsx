import ReactJoyride, { EVENTS, STATUS } from "react-joyride";

export const Joyride = (props) => {
  const { setRun, run, stepIndexState, setStepIndexState, steps } = props;

  const handleJoyrideCallback = (data) => {
    const { status, type } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      setRun(false);
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      setStepIndexState((prev) => prev + 1);
    }
  };

  return (
    <ReactJoyride
      run={run}
      steps={steps}
      stepIndex={stepIndexState}
      debug
      continuous
      showProgress={false}
      callback={handleJoyrideCallback}
      disableOverlayClose={true}
      hideBackButton={true}
      showSkipButton={false}
      hideCloseButton={true}
      spotlightPadding={0}
      disableOverlay
      locale={{ next: "ถัดไป", last: "สิ้นสุด" }}
      styles={{
        buttonNext: {
          backgroundColor: "#BC4D4D",
          padding: "8px 32px",
        },
      }}
    />
  );
};

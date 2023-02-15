/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Webcam from "react-webcam";
import {
  Color,
  ConeGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  RepeatWrapping,
  Scene,
  TextureLoader,
  WebGLRenderer,
} from "three";
import { GameResultModel } from "../../../../common/components/gameResult/gameResult";
import { GameModel, Shots } from "../../../../common/models/gameModel";
import {
  useCreateGameMutation,
  useGetTotalPlayingTimeMutation,
} from "../../../../common/services/gameService";
import { getUserDataFromStorage } from "../../../../common/services/localStorage";
import DirectionSelection, {
  Direction,
} from "../directionSelection/directionSelection";
import GameText from "../gameText/gameText";
import { Level } from "../levelCard/levelCard";
import ScoreBoard from "../scoreBoard/scoreBoard";
import BadmintonCourt3dModel from "./3dModel/badmintonCourt3dModel";
import BadmintonRacket3dModel from "./3dModel/badmintonRacket3dModel";
import BadmintonShuttle3dModel from "./3dModel/badmintonShuttle";
import {
  checkGainScore,
  checkHit,
  checkIsHandClose,
  degreesToRadians,
  directionToDegree,
  directionToTheta,
  getHitType,
  getMinutesBetweenDates,
  getRandomArbitrary,
  normalize,
  shuttleMovement,
  timer,
} from "./utils/gameUtils";

const netTexture = new TextureLoader().load("/ad.png");
netTexture.wrapS = netTexture.wrapT = RepeatWrapping;
netTexture.repeat.set(2, 1);
const net = new MeshBasicMaterial({
  map: netTexture,
});
const hitSound = new Audio("/sounds/hit.mp3");
const homeSound = new Audio("/sounds/home.mp3");
homeSound.loop = true;
homeSound.volume = 0.5;
const level1Sound = new Audio("/sounds/level1.mp3");
level1Sound.loop = true;
level1Sound.volume = 0.35;
const level2Sound = new Audio("/sounds/level2.mp3");
level2Sound.volume = 0.35;
level2Sound.loop = true;
const level3Sound = new Audio("/sounds/level3.mp3");
level3Sound.volume = 0.35;
level3Sound.loop = true;
const looseSound = new Audio("/sounds/loose.mp3");
const swooshSound = new Audio("/sounds/swoosh.mp3");
const winSound = new Audio("/sounds/win.mp3");

var currentDirection: Direction = Direction.OTHERS;
var currentSpeed: number = 3;
var isDirectionSelectionDone = false;
var stopCheck = false;

export default function GamePlay(props: {
  fullHeight?: boolean;
  isStart?: boolean;
  level: Level;
  showCamera?: boolean;
  onDone?: (e: GameResultModel) => void;
}) {
  const [playText, setPlayText] = useState("");
  const [opponentScore, setOpponentScore] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [isCaptureDirection, setIsCaptureDirection] = useState(false);
  const [startTime, setStartTime] = useState<Date>();
  const [createGame] = useCreateGameMutation();
  const userData = getUserDataFromStorage();
  const [getTotalPlayingTime] = useGetTotalPlayingTimeMutation({
    fixedCacheKey: "home-page-total-playing-time",
  });
  const [isEnd, setIsEnd] = useState(false);
  const [hitTypes, setHitTypes] = useState<Shots>({
    clear: 0,
    drive: 0,
    drop: 0,
    smash: 0,
  } as Shots);

  const badminonRacket = BadmintonRacket3dModel();
  const opponentBadminonRacket = BadmintonRacket3dModel();
  const badminonShuttle = BadmintonShuttle3dModel();
  const badmintonCourt = BadmintonCourt3dModel();
  const badmintonCourt2 = BadmintonCourt3dModel();
  const badmintonCourt3 = BadmintonCourt3dModel();

  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() => {
    homeSound.play();
    return () => {
      homeSound.pause();
      level1Sound.pause();
      level2Sound.pause();
      level3Sound.pause();
    };
  }, []);

  useEffect(() => {
    if (opponentScore === 7 || playerScore === 7) {
      if (!isEnd) {
        (async () => {
          if (userData.id) {
            await createGame({
              totalPlayingTime: Number.parseFloat(
                getMinutesBetweenDates(new Date(Date.now()), startTime)
              ),
              opponentScore: opponentScore,
              userScore: playerScore,
              userId: userData.id,
              shots: hitTypes,
            } as GameModel);
            getTotalPlayingTime(userData.id);
          }
          props.onDone?.({
            botScore: opponentScore,
            playerScore: playerScore,
            playTime: getMinutesBetweenDates(new Date(Date.now()), startTime),
            shots: hitTypes,
          });
        })();
      }
      if (opponentScore > playerScore) {
        looseSound.play();
      } else {
        winSound.play();
      }
      setOpponentScore(0);
      setPlayerScore(0);
      level1Sound.pause();
      level2Sound.pause();
      level3Sound.pause();
      homeSound.play();
      setIsEnd(true);
    }
  }, [playerScore, opponentScore]);

  useEffect(() => {
    let playerScoreCount = 0;
    let opponentScoreCount = 0;
    const scene = new Scene();
    scene.background = new Color("#69a2ff");
    const camera = new PerspectiveCamera(
      75, //degree
      width / height,
      0.1,
      15000
    );
    const renderer = new WebGLRenderer({ alpha: true });
    renderer.setSize(width, height - (props.fullHeight ? 0 : 50));

    badminonRacket.scale.set(10, 10, 10);
    badminonRacket.position.set(0, 0, 1000);
    badminonRacket.rotation.set(degreesToRadians(0), 0, degreesToRadians(270));
    opponentBadminonRacket.scale.set(10, 10, 10);
    opponentBadminonRacket.position.set(0, (height * 3) / 4, -2000);
    opponentBadminonRacket.rotation.set(
      degreesToRadians(0),
      0,
      degreesToRadians(270)
    );
    badminonShuttle.scale.set(15, 15, 15);
    badminonShuttle.position.set(0, (height * 3) / 3, 1000);
    badminonShuttle.rotation.set(
      degreesToRadians(-90),
      degreesToRadians(0),
      degreesToRadians(0)
    );
    badmintonCourt.scale.set(550, 550, 550);
    badmintonCourt.position.set(0, 0, -1000);
    badmintonCourt2.scale.set(550, 550, 550);
    badmintonCourt2.position.set(10000, 0, -1000);
    badmintonCourt3.scale.set(550, 550, 550);
    badmintonCourt3.position.set(-10000, 0, -1000);
    scene.add(badminonRacket);
    scene.add(opponentBadminonRacket);
    scene.add(badminonShuttle);
    scene.add(badmintonCourt);
    scene.add(badmintonCourt2);
    scene.add(badmintonCourt3);

    const geometry = new PlaneGeometry(2, 1);
    const material = new MeshBasicMaterial({
      color: "#42529c",
    });
    const plane = new Mesh(geometry, material);
    plane.scale.set(30000, 25000, 10);
    plane.position.set(0, -50, 0);
    plane.rotation.set(
      degreesToRadians(-90),
      degreesToRadians(0),
      degreesToRadians(0)
    );
    scene.add(plane);

    const ad = new Mesh(geometry, net);
    ad.scale.set(2500, 400, 10);
    ad.position.set(0, 500, -5000);
    scene.add(ad);
    const ad2 = new Mesh(geometry, net);
    ad2.scale.set(3500, 400, 10);
    ad2.position.set(-3000, 500, -1000);
    ad2.rotation.set(
      degreesToRadians(-25),
      degreesToRadians(90),
      degreesToRadians(25)
    );
    scene.add(ad2);

    const ad3 = new Mesh(geometry, net);
    ad3.scale.set(3500, 400, 10);
    ad3.position.set(3000, 500, -1000);
    ad3.rotation.set(
      degreesToRadians(-25),
      degreesToRadians(-90),
      degreesToRadians(-25)
    );
    scene.add(ad3);

    const ad4 = new Mesh(geometry, net);
    ad4.scale.set(2500, 400, 10);
    ad4.position.set(-8000, 500, -5000);

    scene.add(ad4);
    const ad5 = new Mesh(geometry, net);
    ad5.scale.set(2500, 400, 10);
    ad5.position.set(8000, 500, -5000);
    scene.add(ad5);

    const traingle = new ConeGeometry(1, 1);
    const arrow = new Mesh(
      traingle,
      new MeshBasicMaterial({
        color: "white",
      })
    );
    arrow.scale.set(100, 100, 100);
    arrow.position.set(0, (height * 3) / 3 + 200, 100);
    arrow.rotateX(degreesToRadians(180));
    scene.add(arrow);
    let isArrowUp = false;

    let animateArrow = () => {
      arrow.position.y += isArrowUp ? 1 : -1;
      if (arrow.position.y > (height * 3) / 3 + 200) {
        isArrowUp = false;
      } else if (arrow.position.y < (height * 3) / 3 + 150) {
        isArrowUp = true;
      }
      window.requestAnimationFrame(animateArrow);
    };
    window.requestAnimationFrame(animateArrow);

    camera.position.set(0, height / 2 + 500, 2000);
    renderer.render(scene, camera);
    document.getElementById("draw-area").replaceChildren(renderer.domElement);

    if (!props.isStart) {
      return;
    } else {
      homeSound.pause();
      switch (props.level) {
        case Level.EASY:
          level1Sound.play();
          break;
        case Level.MEDIUM:
          level2Sound.play();
          break;
        case Level.HARD:
          level3Sound.play();
          break;
      }
      setStartTime(new Date(Date.now()));
    }

    async function randomOpponentPlay() {
      let speed = getRandomArbitrary(30, 40);
      let theta = getRandomArbitrary(30, 60);
      let deg = getRandomArbitrary(0, 360);
      let pos = shuttleMovement(
        speed,
        theta,
        deg,
        7.5,
        10,
        badminonShuttle.position.x / 100
      );
      badminonShuttle.rotation.x = degreesToRadians(-90);
      renderer.render(scene, camera);
      let j = 0;
      async function animate3() {
        if (stopCheck) return;
        badminonShuttle.position.z = pos[j][0] * 100 - 2000;
        badminonShuttle.position.y = pos[j][1] * 100;
        badminonShuttle.position.x = pos[j][2] * 100;
        if (j === 0) {
          hitSound.play();
        }
        if (j < 20) {
          opponentBadminonRacket.rotateY(degreesToRadians(+2));
          badminonShuttle.position.z += 1;
        } else if (j < 40) {
          opponentBadminonRacket.rotateY(degreesToRadians(-2));
        }
        camera.position.set(
          0,
          height / 2 + 500 + badminonShuttle.position.y / 10,
          2000 + badminonShuttle.position.z / 5
        );
        if (badminonShuttle.position.z > 0) {
          badminonRacket.position.z = 1000 + badminonShuttle.position.z / 4;
        }
        renderer.render(scene, camera);
        j++;
        if (j < pos.length) {
          window.requestAnimationFrame(animate3);
        } else {
          let newScore = checkGainScore(
            badminonShuttle.position,
            width,
            height
          );

          if (newScore === -1) {
            opponentScoreCount += 1;
            setOpponentScore(opponentScoreCount);
          }
          if (newScore !== 0) {
            if (opponentScoreCount === 7 || playerScore === 7) {
              opponentScoreCount = 0;
              playerScoreCount = 0;
              document.removeEventListener("handsfree-data", play);
              return;
            }
            await timer(1000);
            badminonShuttle.position.z = -1000;
            badminonShuttle.position.y = (height * 3) / 3;
            badminonShuttle.position.x = 0;
            badminonShuttle.rotateX(degreesToRadians(180));
            opponentBadminonRacket.position.set(0, (height * 3) / 4, -2000);
            renderer.render(scene, camera);
            await timer(1000);
            setPlayText("Ready");
            await timer(1000);
            setPlayText("GO");
            setTimeout(() => setPlayText(""), 1000);
            await timer(1000);
            stopCheck = false;
            randomOpponentPlay();
          } else {
            stopCheck = true;
          }
        }
      }
      window.requestAnimationFrame(animate3);
    }

    let isMoving = false;
    let previousPosition = { x: 0, y: 0 };
    let previousIsHandClose = false;
    let isDirectionCaptureDone = true;

    async function play(event: any) {
      const data = event.detail;
      if (!data.hands) return;
      let hand = 0;
      if (data.hands.landmarksVisible[1]) {
        hand = 1;
      } else if (data.hands.landmarksVisible[0]) {
        hand = 0;
      }
      if (data.hands.landmarksVisible[hand]) {
        let currentPosition: { x: number; y: number } = {
          x: data.hands.pointer[hand].x,
          y: data.hands.pointer[hand].y,
        };
        if (
          Math.abs(currentPosition.x - previousPosition.x) > 10 ||
          Math.abs(currentPosition.y - previousPosition.y) > 10 ||
          previousIsHandClose !== checkIsHandClose(data.hands.landmarks[hand])
        ) {
          if (
            !previousIsHandClose &&
            checkIsHandClose(data.hands.landmarks[hand]) &&
            !isMoving &&
            isDirectionCaptureDone
          ) {
            if (checkHit(badminonRacket.position, badminonShuttle.position)) {
              stopCheck = true;
              isMoving = true;
              isDirectionCaptureDone = false;
              isDirectionSelectionDone = false;
              setIsCaptureDirection(true);
              setTimeout(() => setPlayText(""), 1000);
              while (!isDirectionSelectionDone) {
                await timer(100);
              }
              setIsCaptureDirection(false);
              let zPos = badminonShuttle.position.z;
              let i = 0;
              let animate = async () => {
                badminonRacket.rotateY(degreesToRadians(-2));
                badminonShuttle.position.z -= 4;
                renderer.render(scene, camera);
                i++;
                if (i < 20) {
                  window.requestAnimationFrame(animate);
                } else {
                  isDirectionCaptureDone = true;
                  setPlayText("NICE SHOT");
                  arrow.position.z = 5000;
                  hitSound.play();
                  setTimeout(() => setPlayText(""), 1500);
                  let pos = shuttleMovement(
                    normalize(currentSpeed, 1, 5, 2, 4) * 30,
                    directionToTheta(currentDirection),
                    directionToDegree(currentDirection),
                    badminonShuttle.position.z / 100,
                    badminonShuttle.position.y / 100,
                    badminonShuttle.position.x / 100
                  );
                  let hitType = getHitType(
                    pos.map((e) => ({ x: e[0], y: e[1], z: e[2] }))
                  );
                  setHitTypes({
                    clear: (hitTypes.clear += hitType === "clear" ? 1 : 0),
                    drive: (hitTypes.drive += hitType === "drive" ? 1 : 0),
                    drop: (hitTypes.drop += hitType === "drop" ? 1 : 0),
                    smash: (hitTypes.smash += hitType === "smash" ? 1 : 0),
                  });
                  let j = 0;
                  let z = 0;
                  let animate2 = async () => {
                    badminonShuttle.position.z = -pos[j][0] * 100 + zPos * 2;
                    badminonShuttle.position.y = pos[j][1] * 100;
                    badminonShuttle.position.x = pos[j][2] * 100;
                    if (z < 20) {
                      badminonRacket.rotateY(degreesToRadians(+2));
                    }
                    if (Math.round(badminonShuttle.rotation.x) !== 0) {
                      badminonShuttle.rotateX(degreesToRadians(-2.5));
                    }
                    camera.position.set(
                      0,
                      height / 2 + 500 + badminonShuttle.position.y / 10,
                      2000
                    );
                    //badminton racket follow shuttle
                    if (badminonShuttle.position.z > -100) {
                      badminonRacket.position.z =
                        1000 + badminonShuttle.position.z / 2;
                      opponentBadminonRacket.position.z =
                        -2000 - badminonShuttle.position.z / 10;
                    } else {
                      opponentBadminonRacket.position.z =
                        -2000 + badminonShuttle.position.z / 10;
                      if (
                        opponentBadminonRacket.position.x <
                        badminonShuttle.position.x
                      ) {
                        opponentBadminonRacket.position.x +=
                          2 * (props.level + 1);
                      } else if (
                        opponentBadminonRacket.position.x >
                        badminonShuttle.position.x
                      ) {
                        opponentBadminonRacket.position.x -=
                          2 * (props.level + 1);
                      }
                      opponentBadminonRacket.position.y =
                        (height * 3) / 4 + badminonShuttle.position.y / 10;
                    }
                    if (badminonShuttle.position.z < -500) {
                      opponentBadminonRacket.position.y =
                        (height * 3) / 4 + badminonShuttle.position.y / 10;
                    }

                    renderer.render(scene, camera);
                    j++;
                    z++;
                    if (
                      j < pos.length &&
                      stopCheck &&
                      !(
                        badminonShuttle.position.z < -250 &&
                        checkHit(
                          opponentBadminonRacket.position,
                          badminonShuttle.position,
                          true
                        )
                      )
                    ) {
                      window.requestAnimationFrame(animate2);
                    } else {
                      isMoving = false;
                      stopCheck = false;
                      if (
                        checkHit(
                          opponentBadminonRacket.position,
                          badminonShuttle.position,
                          true
                        )
                      ) {
                        randomOpponentPlay();
                      }
                      let newScore = checkGainScore(
                        badminonShuttle.position,
                        width,
                        height
                      );
                      if (newScore === 1) {
                        playerScoreCount += 1;
                        setPlayerScore(playerScoreCount);
                        setPlayText("IN");
                        setTimeout(() => setPlayText(""), 1500);
                      } else if (newScore === -1) {
                        setPlayText("OUT");
                        setTimeout(() => setPlayText(""), 1500);
                      }
                      if (newScore !== 0) {
                        if (
                          opponentScoreCount === 7 ||
                          playerScoreCount === 7
                        ) {
                          opponentScoreCount = 0;
                          playerScoreCount = 0;
                          document.removeEventListener("handsfree-data", play);
                          return;
                        }
                        await timer(2000);
                        setPlayText("YOUR TURN");
                        setTimeout(() => setPlayText(""), 1500);
                        arrow.position.z = 100;
                        badminonShuttle.position.z = 1000;
                        badminonShuttle.position.y = (height * 3) / 3;
                        badminonShuttle.position.x = 0;
                        badminonShuttle.rotateX(degreesToRadians(-120));
                        camera.position.set(0, height / 2 + 500, 2000);
                        renderer.render(scene, camera);
                      }
                    }
                  };
                  window.requestAnimationFrame(animate2);
                }
              };
              window.requestAnimationFrame(animate);
            } else {
              setPlayText("MISS");
              swooshSound.play();
              setTimeout(() => setPlayText(""), 1500);
            }
          }
          renderer.render(scene, camera);
          previousIsHandClose = checkIsHandClose(data.hands.landmarks[hand]);
        }
        if (isDirectionCaptureDone) {
          badminonRacket.position.x = currentPosition.x - width / 2;
          badminonRacket.position.y = -(currentPosition.y - height - 250);
          renderer.render(scene, camera);
        }
      }
    }
    document.addEventListener("handsfree-data", play);
  }, [props.isStart]);

  return (
    <>
      <div>
        <div id="draw-area" style={{ position: "absolute", zIndex: "-2" }} />
        {props.isStart && (
          <div style={{ position: "absolute", zIndex: "0" }}>
            <ScoreBoard player1={playerScore} player2={opponentScore} />
          </div>
        )}
        <div style={{ position: "absolute", zIndex: "-1" }}>
          {playText && <GameText text={playText} />}
        </div>
        {(props.showCamera ?? true) && (
          <div
            style={{
              position: "absolute",
              zIndex: "-1",
              bottom: "75px",
              right: "0",
              margin: "15px",
            }}
          >
            <Webcam
              audio={false}
              height={150}
              mirrored={true}
              videoConstraints={{}}
            />
          </div>
        )}
      </div>
      {isCaptureDirection && (
        <DirectionSelection
          height={window.innerHeight - 180}
          onSelect={(d, speed) => {
            currentDirection = d;
            currentSpeed = speed;
            isDirectionSelectionDone = true;
          }}
        />
      )}
    </>
  );
}

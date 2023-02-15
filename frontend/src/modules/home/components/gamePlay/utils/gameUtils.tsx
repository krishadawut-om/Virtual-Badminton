import { Vector3 } from "three";
import { Direction } from "../../directionSelection/directionSelection";

export function degreesToRadians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

export function checkIsHandClose(data: Array<{ x: number; y: number }>) {
  let top = (data[8].y + data[12].y + data[16].y + data[20].y) / 4;
  let bottom = (data[5].y + data[9].y + data[13].y + data[17].y) / 4;
  let diff = bottom - top;
  return diff < 0.025;
}

export function calculateSpeed(data: Array<{ x: number; y: number }>) {
  let accDistance = 0;
  for (let i = 0; i < data.length - 1; i++) {
    accDistance =
      accDistance +
      Math.sqrt(
        Math.pow(data[i].x - data[i + 1].x, 2) +
          Math.pow(data[i].y + data[i + 1].y, 2)
      );
  }
  return accDistance;
}

export function normalize(
  value: number,
  min: number,
  max: number,
  nmin: number,
  nmax: number
) {
  return ((value - min) / (max - min)) * (nmax - nmin) + nmin;
}

function zPosition(deg: number, n: number, startZ: number) {
  if (deg >= 0 && deg < 90) {
    deg = normalize(deg, 0, 90, 6, 0);
  } else if (deg >= 90 && deg < 180) {
    deg = normalize(deg, 90, 180, 0, -6);
  } else if (deg >= 180 && deg < 270) {
    deg = normalize(deg, 180, 270, -6, 0);
  } else {
    deg = normalize(deg, 270, 360, 0, 6);
  }
  let z = [startZ];
  let diff = (deg - startZ) / n;
  for (let i = 0; i < n; i++) {
    z.push(z[i] + diff);
  }
  return z;
}

export function shuttleMovement(
  u: number,
  theta: number,
  deg: number,
  startX: number,
  startY: number,
  startZ: number
) {
  let order = 2;
  let b = 0.05;
  let dt = 0.02;
  let ux = u * Math.cos(degreesToRadians(theta));
  let uy = u * Math.sin(degreesToRadians(theta));
  let pos = [[0, 0]];
  let vel = [[0, 0]];
  let acc = [[0, 0]];
  pos[0] = [startX, startY];
  vel[0] = [ux, uy];
  let g = [0, -9.8];
  let i = 0;
  while (pos[i][1] >= 0) {
    vel.push([vel[i][0] + acc[i][0] * dt, vel[i][1] + acc[i][1] * dt]);
    let speed = Math.sqrt(vel[i][0] * vel[i][0] + vel[i][1] * vel[i][1]);
    pos.push([pos[i][0] + vel[i][0] * dt, pos[i][1] + vel[i][1] * dt]);
    acc.push([
      -(b / 1) * Math.pow(speed, order - 1) * vel[i][0] + g[0],
      -(b / 1) * Math.pow(speed, order - 1) * vel[i][1] + g[1],
    ]);
    i += 1;
  }

  for (let i = 0; i < pos.length; i++) {
    let z = zPosition(deg, pos.length, startZ);
    pos[i][2] = z[i];
  }

  return pos;
}

export function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const timer = (ms) => new Promise((res) => setTimeout(res, ms));

export function checkHit(
  racketPos: Vector3,
  shuttlePos: Vector3,
  isOpponent?: boolean
) {
  let checkZ = isOpponent
    ? (shuttlePos.z > racketPos.z - 250 && shuttlePos.z < racketPos.z + 250) ||
      shuttlePos.z + 100 < racketPos.z
    : shuttlePos.z < racketPos.z + 750 && shuttlePos.z > racketPos.z - 750;
  let checkX = isOpponent
    ? shuttlePos.x < racketPos.x + 200 && shuttlePos.x > racketPos.x - 200
    : shuttlePos.x < racketPos.x + 150 && shuttlePos.x > racketPos.x - 150;
  let checkY = isOpponent
    ? shuttlePos.y < racketPos.y + 750 && shuttlePos.y > racketPos.y + 100
    : shuttlePos.y < racketPos.y + 700 && shuttlePos.y > racketPos.y + 100;
  return checkX && checkY && checkZ;
}

export function checkGainScore(
  shuttlePos: Vector3,
  width: number,
  height: number
) {
  if (shuttlePos.y > 0) return 0;
  if (
    shuttlePos.z < 0
    // shuttlePos.x > width - width / 2 &&
    // shuttlePos.x < width / 2
  ) {
    return 1;
  } else {
    return -1;
  }
}

export function directionToDegree(dirrection: Direction) {
  switch (dirrection) {
    case Direction.BOTTOM:
      return 270;
    case Direction.LEFT:
      return 180;
    case Direction.TOP:
      return 90;
    case Direction.RIGHT:
      return 0;
    default:
      return 20;
  }
}

export function directionToTheta(dirrection: Direction) {
  switch (dirrection) {
    case Direction.BOTTOM:
      return 10;
    case Direction.TOP:
      return 30;
    default:
      return 20;
  }
}

export function getMinutesBetweenDates(startDate: Date, endDate: Date): string {
  var diff = endDate.getTime() - startDate.getTime();
  return Math.abs(diff / 60000).toFixed(2);
}

export function getHitType(data: Array<{ x: number; y: number; z: number }>) {
  var startPoint = data[0];
  var endPoint = data[data.length - 1];

  // If distance minus by net less than first quarter of field = drop

  let net = 30; // Distance of net from 0 (Middle value of court)
  let quarter = 20; // Distance between net and first line of court (Quarter)
  if (Math.abs(endPoint.x - net) < quarter) {
    return "drop";
  }

  let highestPoint = data[0];
  data.forEach((element) => {
    if (element.y > highestPoint.y) {
      highestPoint = element;
    }
  });

  // If angle is negative = smash
  if (Math.abs(startPoint.y - highestPoint.y) < 5) {
    return "smash";
  }

  // Get Elevation Angle
  var flatPoint = { ...highestPoint };
  flatPoint.y = startPoint.y;

  var vector1 = {
    x: Math.abs(flatPoint.x - startPoint.x),
    y: Math.abs(flatPoint.y - startPoint.y),
    z: Math.abs(flatPoint.z - startPoint.z),
  };
  var vector2 = {
    x: Math.abs(highestPoint.x - startPoint.x),
    y: Math.abs(highestPoint.y - startPoint.y),
    z: Math.abs(highestPoint.z - startPoint.z),
  };

  var v1mag = Math.sqrt(
    Math.pow(vector1.x, 2) + Math.pow(vector1.y, 2) + Math.pow(vector1.z, 2)
  );
  var v2mag = Math.sqrt(
    Math.pow(vector2.x, 2) + Math.pow(vector2.y, 2) + Math.pow(vector2.z, 2)
  );

  var v1norm = {
    x: vector1.x / v1mag,
    y: vector1.y / v1mag,
    z: vector1.z / v1mag,
  };
  var v2norm = {
    x: vector2.x / v2mag,
    y: vector2.y / v2mag,
    z: vector2.z / v2mag,
  };

  var angle =
    (Math.acos(
      v1norm.x * v2norm.x + v1norm.y * v2norm.y + v1norm.z * v2norm.z
    ) *
      180.0) /
    Math.PI;

  // Specify each type base on angle
  if (angle < 10) {
    return "drive";
  }
  if (angle < 18) {
    return "clear";
  } else {
    return "save";
  }
}

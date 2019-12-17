export const manhattanDistance = (p: number[], q: number[]): number =>
  Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1]);

export const storeLines = (path: string) => {
  let [x, y] = [0, 0];
  const coordinates = [];
  const steps = path.split(",");
  steps.forEach(step => {
    const direction = step[0];
    const stepLength = parseInt(step.substring(1), 10);
    let x2 = x;
    let y2 = y;
    if (direction === "R") x2 += stepLength;
    else if (direction === "L") x2 -= stepLength;
    else if (direction === "U") y2 += stepLength;
    else if (direction === "D") y2 -= stepLength;
    coordinates.push([[x, y], [x2, y2]]);
    x = x2;
    y = y2;
  });
  return coordinates;
};

// export const compareCoordinates = (path1: string, path2: string) => {
//   // path1 = "R8,U5,L5,D3";
//   // path2 = "U7,R6,D4,L4";
//   const intersections = [];
//   const steps1 = storeCoordinates(path1);
//   const steps2 = storeCoordinates(path2);
//   for (let i = 0; i < steps1.length; i++) {
//     for (let e = 0; e < steps2.length; e++) {
//       if (JSON.stringify(steps1[i]) === JSON.stringify(steps2[e])) {
//         intersections.push(steps1[i]);
//       }
//     }
//   }
//   return intersections;
// };

// Took this from daddy's...
export const intersect = ([x1, y1], [x2, y2], [x3, y3], [x4, y4]) => {
  // Check if none of the lines are of length 0
  if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
    return undefined;
  }

  const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

  // Lines are parallel
  if (denominator === 0) {
    return undefined;
  }

  const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
  const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

  // is the intersection along the segments
  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
    return undefined;
  }

  // Return an array with the x and y coordinates of the intersection
  const x = x1 + ua * (x2 - x1);
  const y = y1 + ua * (y2 - y1);

  return [x, y];
};

export const findIntersections = (path1: string, path2: string) => {
  const coords1 = storeLines(path1);
  const coords2 = storeLines(path2);
  console.log(coords1);
  const intersections = [];
  coords1.forEach(line1 => {
    coords2.forEach(line2 => {
      console.log({ l1: line1, l2: line2[0] });
      const intersection = intersect(line1[0], line1[1], line2[0], line2[1]);
      if (intersection) {
        intersections.push(intersection);
      }
    });
  });
  return intersections;
};

export const shortestDistance = (path1: string, path2: string): number => {
  // path1 = "R8,U5,L5,D3";
  // path2 = "U7,R6,D4,L4";

  const intersections = findIntersections(path1, path2);

  let minDistance = 99999999999;
  for (let i = 0; i < intersections.length; i++) {
    const distance = manhattanDistance([0, 0], intersections[i]);
    minDistance = Math.min(minDistance, distance);
  }
  return minDistance;
};

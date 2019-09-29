// title      : snapfit
// author     : Michael Cohen
// license    : ISC License
// file       : snapfit.jscad

/* exported main */
const defaultParams = {
  entranceAngle: 40,
  overhangDepth: 3,
  retractionAngle: 20,
  snapLength: 16,
  snapHeight: 4,
  snapThickness: 2,
  snapWidth: 6
};

function snapFit({
  entranceAngle,
  overhangDepth,
  retractionAngle,
  snapHeight,
  snapThickness,
  snapWidth
} = defaultParams) {
  // calculate length/height of entrance triangle and retraction triangle
  const lengthTop = overhangDepth * Math.tan((entranceAngle * Math.PI) / 180);
  const lengthBottom =
    overhangDepth * Math.tan((retractionAngle * Math.PI) / 180);
  const snapLength = snapHeight + lengthTop + lengthBottom;

  const base = cube([snapWidth, snapThickness, snapLength]).color("cadetblue");
  let snap = cube([snapWidth, overhangDepth, snapLength])
    .snap(base, "y", "outside-")
    .color("blue");

  let entranceCutout = cube([snapWidth, snapWidth, snapLength])
    .snap(base, "z", "outside-")
    .snap(base, "y", "outside-");
  let exitCutout = cube([snapWidth, snapWidth, snapWidth])
    .snap(base, "z", "outside+")
    .snap(base, "y", "outside-");

  entranceCutout = entranceCutout.rotate(
    [0, snapThickness, snapLength],
    [-1, 0, 0],
    entranceAngle
  );
  exitCutout = exitCutout.rotate(
    [0, snapThickness, 0],
    [-1, 0, 0],
    -retractionAngle
  );
  snap = difference(snap, union(entranceCutout, exitCutout));

  let snapFit = union(base, snap);
  snapFit.properties.baseConnection = new CSG.Connector(
    [snapWidth / 2, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  );
  return snapFit;
}

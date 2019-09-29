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
  snapThickness: 7,
  snapWidth: 6
};

function snapFit({
  entranceAngle,
  overhangDepth,
  retractionAngle,
  snapLength,
  snapHeight,
  snapThickness,
  snapWidth
} = defaultParams) {
  const bTop = overhangDepth * Math.tan((entranceAngle * Math.PI) / 180);
  const bBottom = overhangDepth * Math.tan((retractionAngle * Math.PI) / 180);
  snapLength = snapHeight + bTop + bBottom;
  const base = cube([snapWidth, snapThickness, snapLength]).color("cadetblue");
  let entranceCutout = cube([snapLength, snapThickness, snapLength])
    .snap(base, "z", "outside-")
    .snap(base, "x", "outside-");
  let exitCutout = cube([snapWidth, snapThickness, snapWidth])
    .snap(base, "z", "outside+")
    .snap(base, "x", "outside-");
  let snap = cube([overhangDepth, snapThickness, snapLength])
    .snap(base, "x", "outside-")
    .color("blue");

  entranceCutout = entranceCutout.rotate(
    [snapWidth, 0, snapLength],
    [0, 1, 0],
    entranceAngle
  );

  exitCutout = exitCutout.rotate(
    [snapWidth, 0, 0],
    [0, 1, 0],
    -retractionAngle
  );
  snap = difference(snap, union(entranceCutout, exitCutout));
  let snapFit = union(base, snap).fillet(1, "z+");
  snapFit = difference(snapFit, entranceCutout);
  return coat(snapFit);
}

// ********************************************************
// Other jscad libraries are injected here.  Do not remove.
// Install jscad libraries using NPM
// ********************************************************
// include:js
// endinject

const wallWidth = 2;

function coat(obj) {
  const { x, y, z } = obj.size();
  console.log("opening dimensions", x, y, z);
  const xScale = (1 * (x + wallWidth * 2)) / x;
  const yScale = (1 * (x + wallWidth)) / x;

  let coating = obj.scale([xScale, 1, yScale]);
  //   coating = union(coating, );
  const base = difference(coating.align(obj, "xy"), obj);
  const support = cube([8, y, z * 0.5]).snap(base, "x", "inside+");
  return union(base, difference(support, obj));
}

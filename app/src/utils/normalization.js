export const normalizeGroups = groups => {
  groups = groups.sort((a, b) => a.level > b.level);
  let res = [];
  let curGroups = {};
  let prevGroups = {};
  let level = 0;
  groups.forEach(group => {
    let newGroup = { ...group };
    if (newGroup.level > level) {
      prevGroups = { ...curGroups };
      curGroups = {};
    }
    if (newGroup.level === 0) {
      res.push(newGroup);
    }
    if (newGroup.parent) {
      if (!prevGroups[newGroup.parent].children) {
        prevGroups[newGroup.parent].children = [];
      }
      prevGroups[newGroup.parent].children.push(newGroup);
    }
    curGroups[newGroup.id] = newGroup;
  });
  return res;
};

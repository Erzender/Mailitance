export const normalizeGroups = (groups, ops, mili, selected, admin) => {
  let accessibleGroups = [...new Set([...ops, ...mili])];
  groups = groups.sort((a, b) => a.level > b.level);
  let res = [];
  let curGroups = {};
  let prevGroups = {};
  let level = 0;
  groups.forEach(group => {
    let newGroup = { ...group };
    if (newGroup.id === selected) {
      newGroup.selected = true;
    }
    if (newGroup.level > level) {
      prevGroups = { ...curGroups };
      curGroups = {};
    }
    let accessible =
      admin ||
      (accessibleGroups.includes(newGroup.id) ||
        (Object.keys(prevGroups).length > 0 &&
          prevGroups[newGroup.parent].accessible));
    if (accessible) {
      newGroup.accessible = true;
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

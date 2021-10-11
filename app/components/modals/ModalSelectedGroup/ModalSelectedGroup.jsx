import styles from './ModalSelectedGroup.module.css'
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {groupsListSelector, selectedGroupSelector} from "../../../redux/groups/groupsSelectors";
import {groupSelect} from "../../../redux/groups/groupsActions";


const formatGroup = (group, groups) => {
  group.children = groups.filter(g =>  g.parent === group.id).map(g => formatGroup(g, groups));
  return group;
}

const formatGroups = groups => groups.filter(g => g.level === 0).map(group => formatGroup(group, groups));
const Group = ({title, children, id, selectedGroup, select}) => <li className={selectedGroup.id === id ? 'is-selected' : ''}>
  <button onClick={() => select(id)}>{title}</button>
  <ul>
    {children.map(c => <Group key={c.id} {...c} selectedGroup={selectedGroup} select={select}/>)}
  </ul>
</li>
export const ModalSelectedGroup = () => {
  const groups = useSelector(groupsListSelector);
  const selectedGroup = useSelector(selectedGroupSelector)
  const dispatch = useDispatch();

  return <div>
    <ul className={styles.list}>

      {groups && formatGroups(groups).map(g => <Group key={g.id} {...g} selectedGroup={selectedGroup} select={(id) => dispatch(groupSelect(id))}/>) }
    </ul>
  </div>
}
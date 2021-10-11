import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {groupByIdSelector} from "../../../redux/groups/groupsSelectors";
import {contactsFetch} from "../../../redux/contacts/contactsActions";
import {ContactsList} from "../../../components/lists/ContactsList/ContactsList";

export const Group = ({groupId}) => {
  const group = useSelector(groupByIdSelector(groupId));
  const dispatch = useDispatch();
  useEffect(() => {
    if (groupId) dispatch(contactsFetch(groupId))
  }, [groupId])

  return group ? <main>
    <h1>Group {group.title}</h1>
    <ContactsList />
  </main> : 'Loading';
}
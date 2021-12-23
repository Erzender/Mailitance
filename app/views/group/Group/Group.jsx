import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {groupByIdSelector, selectedGroupSelector} from "../../../redux/groups/groupsSelectors";
import {contactsFetch} from "../../../redux/contacts/contactsActions";
import {ContactsList} from "../../../components/lists/ContactsList/ContactsList";
import {useRouter} from "next/router";

export const Group = ({groupId}) => {
  const group = useSelector(groupByIdSelector(groupId));
  const dispatch = useDispatch();
  const selectedGroup = useSelector(selectedGroupSelector)
  const { push} = useRouter();
  useEffect(() => {
    if (groupId) dispatch(contactsFetch(groupId))
  }, [groupId])

  useEffect(() => {
    if(selectedGroup.id !== groupId)
      push('/groupe/'+selectedGroup.id)
  }, [selectedGroup])

  return group ? <main>
    <h1>Group {group.title}</h1>
    <ContactsList />
  </main> : 'Loading';
}
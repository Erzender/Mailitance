import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {groupByIdSelector, selectedGroupSelector} from "../../../redux/groups/groupsSelectors";
import {contactsFetch} from "../../../redux/contacts/contactsActions";
import {ContactsList} from "../../../components/lists/ContactsList/ContactsList";
import {useRouter} from "next/router";
import {contactsListSelector} from "../../../redux/contacts/contactsSelector";

export const Group = ({groupId}) => {
  const group = useSelector(groupByIdSelector(groupId));
  const dispatch = useDispatch();
  const selectedGroup = useSelector(selectedGroupSelector)
  const contacts = useSelector(contactsListSelector);
  const { push} = useRouter();
  useEffect(() => {
    if (groupId) dispatch(contactsFetch(groupId))
  }, [groupId])

  useEffect(() => {
    if(selectedGroup?.id !== groupId)
      push('/groupe/'+selectedGroup.id)
  }, [selectedGroup])

  return group ? <main>
    <h1>Group {group.title}</h1>
    <button onClick={() => {

      const csvContent = `data:text/csv;charset=utf-8,${['Nom de famille', 'Prénom', 'E-mail', 'Téléphone', 'Âge', 'Inscrit sur les lists'].join(',')}
      ${contacts.map(c => [c.lastname, c.firstname, c.email, c.phone, c.age, c.voteRegistration ? 1 : 0].join(',')).join("\n")}`

      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csvContent));
      link.setAttribute("download", group.title+'.csv');
      document.body.appendChild(link); // Required for FF
      link.click();
      document.body.removeChild(link);
    }
    }>Télécharger CSV</button>
    <ContactsList />
  </main> : 'Loading';
}
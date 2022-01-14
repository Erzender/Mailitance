import styles from './Group.module.css'
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {groupByIdSelector, selectedGroupSelector} from "../../../redux/groups/groupsSelectors";
import {contactsCreate, contactsFetch} from "../../../redux/contacts/contactsActions";
import {ContactsList} from "../../../components/lists/ContactsList/ContactsList";
import {useRouter} from "next/router";
import {contactsListSelector} from "../../../redux/contacts/contactsSelector";
import {isAdminSelector} from "../../../redux/account/accountSelectors";
import {isOperatorSelector} from "../../../redux/sharedSelectors";
import {Button} from "../../../components/buttons/Button/Button";

export const Group = ({groupId}) => {
  const inputFileRef = useRef();
  const group = useSelector(groupByIdSelector(groupId));
  const dispatch = useDispatch();
  const selectedGroup = useSelector(selectedGroupSelector)
  const contacts = useSelector(contactsListSelector);
  const [parsedCSV, setParsedCSV] = useState(null);
  const admin = useSelector(isAdminSelector);
  const isOperator = useSelector(isOperatorSelector);


  const { push} = useRouter();
  useEffect(() => {
    if (groupId) dispatch(contactsFetch(groupId))
  }, [groupId])

  useEffect(() => {
    if(selectedGroup && selectedGroup?.id !== groupId)
      push('/groupe/'+selectedGroup.id)
  }, [selectedGroup])

  const buttons = [
    {
      children: 'Télécharger CSV',
      onClick: () => {
        const csvContent = `data:text/csv;charset=utf-8,${['Nom de famille', 'Prénom', 'E-mail', 'Téléphone', 'Âge', 'Inscrit sur les lists'].join(',')}
      ${contacts.map(c => [c.lastname, c.firstname, c.email, c.phone, c.age, c.voteRegistration ? 1 : 0].join(',')).join("\n")}`

        const link = document.createElement("a");
        link.setAttribute("href", encodeURI(csvContent));
        link.setAttribute("download", group.title+'.csv');
        document.body.appendChild(link); // Required for FF
        link.click();
        document.body.removeChild(link);
      }
    }
  ];
  if (admin||isOperator) {
    buttons.push({
      children: 'Importer CSV',
    })
  }


  return group ? <main className={styles.group}>
    <h1>Group {group.title}</h1>

    <input ref={inputFileRef} type={"file"} onChange={(e) => {
      if (e.target.files[0].name.endsWith('.csv')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const lines = e.target.result.substring(e.target.result.indexOf("\n") + 1).split(/\r?\n/g)
          const parsedCSV = lines.map(l => {
            const [lastname, firstname, email, phone, age, voteRegistration] = l.split(/\s*,\s*/g).map(r => r.replace(/^\s*|\s*$/g, ''));
            return ({lastname, firstname, email, phone, age: parseInt(age), voteRegistration : !!voteRegistration, rgpdConsent: true })
          })
          contactsCreate(groupId, parsedCSV)
        };
        reader.readAsText(e.target.files[0]);
      }
    }} />
    <ContactsList
      buttons={[
        {
          children: 'Télécharger CSV',
          onClick: () => {
            const csvContent = `data:text/csv;charset=utf-8,${['Nom de famille', 'Prénom', 'E-mail', 'Téléphone', 'Âge', 'Inscrit sur les lists'].join(',')}
      ${contacts.map(c => [c.lastname, c.firstname, c.email, c.phone, c.age, c.voteRegistration ? 1 : 0].join(',')).join("\n")}`

            const link = document.createElement("a");
            link.setAttribute("href", encodeURI(csvContent));
            link.setAttribute("download", group.title+'.csv');
            document.body.appendChild(link); // Required for FF
            link.click();
            document.body.removeChild(link);
          }
        },
        (admin | isOperator) && {
          children: 'Importer CSV',
          onClick: () => inputFileRef.current.click()
        }
      ]} />
  </main> : 'Loading';
}
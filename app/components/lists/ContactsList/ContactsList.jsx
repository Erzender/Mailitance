import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {contactsListSelector} from "../../../redux/contacts/contactsSelector";
import {FiCheck, FiX} from "react-icons/fi";
import {Table} from "../Table/Table";
import styles from "../Table/Table.module.css";

const sorters = [
  { label: 'Nom de famille', name: 'lastname'},
  { label: 'Prénom', name: 'firstname' },
  { label: 'E-mail', name: 'email' },
  { label: 'Âge', name: 'age' },
]

export const ContactsList = () => {
  const contacts = useSelector(contactsListSelector);
  const [sorter, setSorter] = useState({ name: 'lastname', order: 1});

  const sort = _sorter => {
    if (_sorter !== sorter.name) setSorter({ name: _sorter, order: 1 });
    else setSorter({ name: _sorter, order: sorter.order === 1 ? -1 : 1})
  }
  return <Table>
    <thead>
      <tr>
        {sorters.map((s, i) => <th key={i}>
         <button className={sorter.name === s.name ? sorter.order > 0 ? styles.asc: styles.dsc : null} onClick={() => sort(s.name)}>{s.label}</button>
        </th>)}
        <th>Inscrit</th>
      </tr>
    </thead>
    <tbody>
    {contacts?.sort((a,b) => {
      console.log(sorter)
      const order = b[sorter.name] < a[sorter.name]  ? 1 : -1;
      return sorter.order > 0 ? order : -order;
    }).map(c => <tr key={c.id}>
      <td>{c.lastname}</td>
      <td>{c.firstname}</td>
      <td>{c.email}</td>
      <td>{c.age}</td>
      <td>{c.voteRegistration ? <FiCheck /> : <FiX/>}</td>
    </tr>)}
    </tbody>
  </Table>

}
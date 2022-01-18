import styles from './ContactList.module.css'
import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {contactsListSelector} from "../../../redux/contacts/contactsSelector";
import {FiCheck, FiX} from "react-icons/fi";
import {Table} from "../Table/Table";
import tableStyles from "../Table/Table.module.css";
import {StyledFormField} from "../../forms/StyledFormField/StyledFormField";
import {Button} from "../../buttons/Button/Button";
import {agesOptions, statusOptions} from "../../../constants";

const sorters = [
  { label: 'E-mail', name: 'email' },
  { label: 'Tél', name: 'phone' },
  { label: 'Âge', name: 'age', options: agesOptions },
  { label: 'Quartier', name: 'district' },
  { label: 'Secteur électoral', name: 'voteSector' },
  { label: 'Sujets d\'intérêt', name: 'topics' },
  { label: 'Jugement sur la FI', name: 'status', options: statusOptions },
  { label: 'Autres', name: 'detail' },
  { label: 'Remarques', name: 'comment' },
]

const statusCode = ['neutre', 'sympathisant', 'militant', 'organisateur'];

export const ContactsList = ({ buttons }) => {
  const contacts = useSelector(contactsListSelector);
  const [sorter, setSorter] = useState({ name: 'lastname', order: 1});
  const [searchParam, setSearchParam] = useState('lastname');
  const [search, setSearch] = useState('');

  const sort = _sorter => {
    if (_sorter !== sorter.name) setSorter({ name: _sorter, order: 1 });
    else setSorter({ name: _sorter, order: sorter.order === 1 ? -1 : 1})
  }

  const activeSorter = sorters.find(({name}) => name === searchParam);

  useEffect(() => {
    setSearch('');
  }, [ searchParam ])

  return <div className={styles.list}>
    <header>
      <div className={styles.search}>
        <StyledFormField label="Filter" onChange={e => setSearchParam(e.target.value)} type="select" options={sorters.map(s => ({ label: s.label, value: s.name}))} />
        <StyledFormField label={<span className="visually-hidden">Recherche</span> } value={search} onChange={e => setSearch(e.target.value === '-1' ? '' : e.target.value)} type={activeSorter?.options ? 'select' : 'search'} options={activeSorter?.options} />
      </div>
      {buttons.length && <div className={styles.buttons}>
      {buttons.map((b, i) => <Button key={"button" + i} {...b}/>)}
      </div>}
    </header>
    <Table>
      <thead>
      <tr>
        {sorters.map((s, i) => <th key={i}>
          <button className={sorter.name === s.name ? sorter.order > 0 ? tableStyles.asc: tableStyles.dsc : null} onClick={() => sort(s.name)}>{s.label}</button>
        </th>)}
        <th>Inscrit</th>
        <th>Besoin aide</th>
      </tr>
      </thead>
      <tbody>
      {contacts?.filter(c => {
        if (!search) return true;
        if (!c[searchParam]) return false;

        let value = c[searchParam];

        if (Array.isArray(value)) {
          return c[searchParam].some(elem => elem.toLowerCase().includes(search?.toLowerCase()))
        }
        if( typeof value === 'number') value = value.toString();

        return value?.toLowerCase().includes(search?.toLowerCase())
      }).sort((a,b) => {
        const order = b[sorter.name] < a[sorter.name]  ? 1 : -1;
        return sorter.order > 0 ? order : -order;
      }).map(c => <tr key={c.id}>
        <td>{c.email}</td>
        <td>{c.phone}</td>
        <td>{c.age}</td>
        <td>{c.district}</td>
        <td>{c.voteSector}</td>
        <td>{c.topics}</td>
        <td>{statusCode[c.status]}</td>
        <td>{c.detail}</td>
        <td>{c.comment}</td>
        <td>{c.voteRegistration ? <FiCheck /> : <FiX/>}</td>
        <td>{c.help ? <FiCheck /> : <FiX/>}</td>
      </tr>)}
      </tbody>
    </Table>
  </div>

}
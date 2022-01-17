import React, {useEffect} from 'react';
import {GroupForm} from "../../../components/forms/GroupForm";
import Head from "next/head";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {contactsListSelector} from "../../../redux/contacts/contactsSelector";
import {contactsDelete, contactsFetch} from "../../../redux/contacts/contactsActions";
import {Table} from "../../../components/lists/Table/Table";
import {FiTrash} from "react-icons/fi";
import {groupByIdSelector, selectedGroupSelector} from "../../../redux/groups/groupsSelectors";

export const AdminGroupsManage = () => {

  const dispatch = useDispatch();
  const { query } = useRouter()
  const contacts = useSelector(contactsListSelector)
  const group = useSelector(groupByIdSelector(query.id))

  useEffect(() => {
    dispatch(contactsFetch(query.id))
  }, [query.id])

  return  <main id="view-admin-groups-create">
    <Head>
      <title>Création de groupe | Mailitance</title>
    </Head>
    <h1>Gestion des contacts du groupe {group && group.title}</h1>
    {contacts ? <Table>
    <thead>
    <tr>
      <th>Prénom</th>
      <th>Nom</th>
      <th>Actions</th>
    </tr>
    </thead>
    <tbody>
    {contacts.map(c => <tr key={c.id}>
      <td>{c.firstname}</td>
      <td>{c.lastname}</td>
      <td><button onClick={() => dispatch(contactsDelete([c.email || c.phone]))}><FiTrash /></button></td>
    </tr>)}
    </tbody>
  </Table>: 'Loading'}
  </main>

}
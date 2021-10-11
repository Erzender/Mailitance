import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {contactsFetch} from "../../../redux/contacts/contactsActions";
import {groupByIdSelector} from "../../../redux/groups/groupsSelectors";
import Head from "next/head";
import {ViewNav} from "../../../components/layout/ViewNav/ViewNav";
import {isAdminSelector} from "../../../redux/account/accountSelectors";
import {asyncGroupMembersFetch} from "../../../redux/async/asyncGroup";
import {asyncAccountFetchAll} from "../../../redux/async/asyncAccount";

export const GroupManagement = ({ groupId }) => {

  const admin = useSelector(isAdminSelector);
  const group = useSelector(groupByIdSelector(groupId))
  const dispatch = useDispatch();
  useEffect(() => {
    if (groupId) {
      dispatch(contactsFetch(groupId))
      if (admin) {
        asyncGroupMembersFetch(groupId);
        asyncAccountFetchAll();
      }
    }


  }, [groupId])
  return <main id="view-single">
    <Head>
      <title> Gestion du groupe: {group?.title} | Mailitance</title>
    </Head>
    <h1>Gestion du groupe: {group?.title}</h1>

    <ViewNav actions={[
      admin && {
        children: 'Ajouter un utilisateur',
        href: `/groupe/${groupId}/utilisateur`
      }
    ]}/>
  </main>
}
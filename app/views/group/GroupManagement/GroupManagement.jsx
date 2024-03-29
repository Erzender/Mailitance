import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {groupByIdSelector, selectedGroupSelector} from "../../../redux/groups/groupsSelectors";
import Head from "next/head";
import {ViewNav} from "../../../components/layout/ViewNav/ViewNav";
import {isAdminSelector, loadedSelector} from "../../../redux/account/accountSelectors";
import {groupMembersFetch} from "../../../redux/groups/groupsActions";
import { usersFetchAll} from "../../../redux/users/usersActions";
import {isOperatorSelector} from "../../../redux/sharedSelectors";
import {ActivistForm} from "../../../components/forms/ActivistForm";
import {OperatorForm} from "../../../components/forms/OperatorForm";
import styles from '../../../components/forms/Form.module.css'
import {useRouter} from "next/router";

export const GroupManagement = ({ groupId }) => {

  const admin = useSelector(isAdminSelector);
  const isOperator = useSelector(isOperatorSelector);
  const group = useSelector(groupByIdSelector(groupId))
  const dispatch = useDispatch();
  const loaded = useSelector(loadedSelector);
  const selectedGroup = useSelector(selectedGroupSelector)
  const { push } = useRouter()


  useEffect(() => {
    if (loaded) {
      if (isOperator || admin) {
        dispatch(groupMembersFetch(groupId))
        dispatch(usersFetchAll())
      }
    }


  }, [loaded]);


  useEffect(() => {
    if (selectedGroup?.id !== groupId) push(`/groupe/${selectedGroup.id}/gestion`)
  }, [ selectedGroup])

  return group ? <main id="view-single">
    <Head>
      <title> Gestion du groupe: {group?.title} | Mailitance</title>
    </Head>
    <h1>Gestion du groupe: {group?.title}</h1>

    <ViewNav actions={[
      (admin || isOperator ) && {
        children: 'Ajouter un utilisateur',
        href: `/groupe/${groupId}/utilisateur`
      }
    ]}/>

    <h2>Militants</h2>
    <ul>
      {group.militants?.map(a => <li key={a.id}>
        {a.displayName}
      </li>)}
    </ul>
    {(isOperator || admin) && <ActivistForm className={styles.bordered} title="Ajouter un militant" groupId={groupId} />}

    <h2>Opérateurs</h2>
    <ul>
      {group.operators?.map(a => <li key={a.id}>
        {a.displayName}
      </li>)}
    </ul>
    {(isOperator || admin) && <OperatorForm className={styles.bordered} title="Ajouter un opérateur" groupId={groupId} />}


  </main> : null;
}
import React from 'react';
import {AccountForm} from "../../../components/forms/AccountForm";
import Head from "next/head";
import {useSelector} from "react-redux";
import {selectedGroupSelector} from "../../../redux/groups/groupsSelectors";

export const GroupUser = ({ groupId }) => {
  const group = useSelector(selectedGroupSelector)
  return  <main>
    <Head>
      <title>Création d'utilisateur | Mailitance</title>
    </Head>
    <h1>Création d'utilisateur</h1>
    <AccountForm />
  </main>
}
import React, {useEffect} from 'react';
import {ContactForm} from "../../../components/forms/ContactForm";
import Head from "next/head";
import {useSelector} from "react-redux";
import {selectedGroupSelector} from "../../../redux/groups/groupsSelectors";
import {useRouter} from "next/router";

export const GroupContact = ({ groupId }) => {

  const { push } = useRouter()
  const selectedGroup = useSelector(selectedGroupSelector)

  useEffect(() => {
    if (selectedGroup.id !== groupId) push(`/groupe/${selectedGroup.id}/contact`)
  }, [ selectedGroup])
  return <main>
    <Head>
      <title>Ajout de contact | Mailitance</title>
    </Head>
    <h1>Ajout de contact</h1>
    <ContactForm groupId={groupId} />
  </main>
}
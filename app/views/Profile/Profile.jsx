import React from 'react'
import Head from "next/head";
import {ProfileForm} from "../../components/forms/ProfileForm";


export const Profile = () => {
  return <main>
    <Head>
      <title>Profil | Mailitance</title>
    </Head>
    <h1>Profil</h1>
    <ProfileForm />
  </main>
}
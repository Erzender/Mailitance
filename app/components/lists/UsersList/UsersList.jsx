import React from 'react';
import {useSelector} from "react-redux";
import {isAdminSelector} from "../../../redux/account/accountSelectors";
import Link from 'next/link'

export const UsersList = ({ users }) => {

  const admin = useSelector(isAdminSelector);

  return <table>
    <thead>
    <tr><th>Username</th></tr>
    </thead>
    <tbody>
    {users.map(u => {
      const _content = u.username;
      const content = admin ? <Link href={`/admin/utilisateurs/${u.id}`}><a>{_content}</a></Link> : _content;

      return <tr key={u.id}>
        <td>{content}</td>
      </tr>;

    })}
    </tbody>
  </table>
}
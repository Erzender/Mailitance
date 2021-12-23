import {useSelector} from "react-redux";
import {Table} from "../Table/Table";
import Link from "next/link";
import React from "react";
import {isAdminSelector} from "../../../redux/account/accountSelectors";

export const GroupList = ({ groups }) =>
{

  const admin = useSelector(isAdminSelector);
  return <Table>
    <thead>
    <tr>
      <th>Name</th>
    </tr>
    </thead>
    <tbody>
    {groups.map(g => {
      const _content = g.title;
      const content = admin ? <Link href={`/admin/groupes/${g.id}`}><a>{_content}</a></Link> : _content;

      return <tr key={g.id}>
        <td>{content}</td>
      </tr>;

    })}
    </tbody>
  </Table>
}
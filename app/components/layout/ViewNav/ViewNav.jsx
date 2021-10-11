import React from 'react';
import {Button} from "../../buttons/Button/Button";

export const ViewNav = ({ actions }) =>
  <nav>
    <ul>
      {actions.filter(a => a).map((a, i) => <li key={i}>
        <Button {...a}/>
      </li>)}
    </ul>
  </nav>
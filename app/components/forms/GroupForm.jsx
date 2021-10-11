import React from 'react';
import GenericForm from "generic-form";
import  { StyledFormField} from './StyledFormField/StyledFormField';
import {useDispatch, useSelector} from "react-redux";
import {groupsListSelector} from "../../redux/groups/groupsSelectors";
import {groupCreate} from "../../redux/groups/groupsActions";
import {Button} from "../buttons/Button/Button";

export const GroupForm = () => {

  const dispatch = useDispatch();
  const groups = useSelector(groupsListSelector);

  return <GenericForm id="group-form" onSubmit={(e, { title, parentGroup}) => {
    e.preventDefault();
    parentGroup = parseInt(parentGroup)
    dispatch(groupCreate(title, parentGroup === -1 ? undefined: parentGroup))

  }}>
    <StyledFormField formId="group-form" type="text" name="title" label="Nom du groupe" validation={{ mandatory: true}} />
    <StyledFormField formId="group-form" type="select" name="parentGroup"label="Groupe parent" options={[
      {
        label: 'Sélectionner un groupe parent',
        value: -1
      },
      ...groups.map(g => ({
        label: g.title,
        value: g.id
      }))
    ]}/>
    <Button>Créer le groupe</Button>
  </GenericForm>
}
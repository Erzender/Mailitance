import React from "react";
import GenericForm from "generic-form";
import { StyledFormField } from "./StyledFormField/StyledFormField";
import { accountLogin } from "../../redux/account/accountActions";
import { errorEncountered } from "../../redux/account/accountSelectors";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../buttons/Button/Button";
import styles from "./Form.module.css";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const failed = useSelector(errorEncountered);

  return (
    <GenericForm
      onSubmit={(e, { username, password }) => {
        e.preventDefault();
        dispatch(accountLogin(username, password));
      }}
    >
      <StyledFormField type="text" name="username" />
      <StyledFormField type="password" name="password" />
      <Button>Connexion</Button>
      {failed && <div className={styles.error}>La connexion a échoué : {failed}</div>}
    </GenericForm>
  );
};

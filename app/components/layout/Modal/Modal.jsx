import styles from './Modal.module.css';
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {modalAndPayloadSelector} from "../../../redux/modal/modalSelectors";
import { FiX } from "react-icons/fi";
import {modalClose} from "../../../redux/modal/modalActions";

export const Modal = () => {
  const { ModalComponent, payload = {} } = useSelector(modalAndPayloadSelector);
  const dispatch = useDispatch();
  return ModalComponent ? <div className={styles.modal}>
    <div className={styles.modalContent}>
      <button className={styles.close} onClick={() => dispatch(modalClose())}><FiX /></button>
      <ModalComponent {...payload}/>
    </div>
  </div> : null;
}
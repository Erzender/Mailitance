import {MODAL_CLOSE, MODAL_OPEN} from "./modalActions";
import update from "immutability-helper";

const initialState = {
  ModalComponent: null,
  payload: null
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {

    case MODAL_OPEN:
      return update(state, {
        ModalComponent: {$set: action.ModalComponent},
        payload: {$set: action.payload}
      });

    case MODAL_CLOSE:
      return update(state, {
        $merge: {ModalComponent: null, payload: null}
      })


    default:
      return state;
  }
}
const PREFIX = 'MODAL';

export const MODAL_OPEN = `${PREFIX}/OPEN`;
export const MODAL_CLOSE = `${PREFIX}/CLOSE`;

export const modalOpen = (ModalComponent, payload) => ({
  type: MODAL_OPEN,
  ModalComponent,
  payload
})

export const modalClose = () => ({
  type: MODAL_CLOSE
})
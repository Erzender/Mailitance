import pipe from 'lodash/fp/pipe';
import property from 'lodash/fp/property';
import pick from 'lodash/fp/pick';

const modalStateSelector = property('modal');

export const modalAndPayloadSelector = pipe(
  modalStateSelector,
  pick(['ModalComponent', 'payload'])
);

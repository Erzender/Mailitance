import pipe from 'lodash/fp/pipe';
import property from 'lodash/fp/property';

const contactsStateSelector = property('contacts');

export const contactsListSelector = pipe(
  contactsStateSelector,
  property('list')
)

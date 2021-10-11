import pipe from 'lodash/fp/pipe';
import property from 'lodash/fp/property';

const usersStateSelector = property('users');

export const usersListSelector = pipe(
  usersStateSelector,
  property('list')
);

export const selectedUserSelector = pipe(
  usersStateSelector,
  property('selected')
)
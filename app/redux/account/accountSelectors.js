import pipe from 'lodash/fp/pipe';
import property from 'lodash/fp/property';

const accountStateSelector = property('account');

export const isLoggedInSelector = pipe(
  accountStateSelector,
  property('isLoggedIn')
);

export const isAdminSelector = pipe(
  accountStateSelector,
  property('admin')
);

export const userIdSelector = pipe(
  accountStateSelector,
  property('userId')
);

export const operatingGroupsSelector = pipe(
  accountStateSelector,
  property('operatingGroups')
);

export const militantGroupsSelector = pipe(
  accountStateSelector,
  property('militantGroups')
);
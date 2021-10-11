import pipe from 'lodash/fp/pipe';
import property from 'lodash/fp/property';
import pick from 'lodash/fp/pick';
import find from 'lodash/fp/find';

const groupsStateSelector = property('groups');

export const groupsListSelector = pipe(
  groupsStateSelector,
  property('list')
)

export const selectedGroupSelector = pipe(
  groupsStateSelector,
  pick(['selected', 'list']),
  ({selected, list }) => selected ? list?.find(({ id }) => id === selected ) : null
)
export const groupByIdSelector = id => pipe(
  groupsListSelector,
  find(g => g.id === parseInt(id))
);
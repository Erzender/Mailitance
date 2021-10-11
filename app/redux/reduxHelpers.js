const combineSelectors = (...selectors) => (state, props) =>
  selectors.reduce(
    (acc, selector) =>
      typeof selector !== 'function'
        ? acc
        : {
          ...acc,
          ...selector(state, props)
        },
    {}
  );

export default combineSelectors;

import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useSelectorCreator = (selectorCreator, ...args) => useSelector(
  useMemo(() => selectorCreator(...args), args)
);
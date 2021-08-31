import { configureStore, Store } from '@reduxjs/toolkit';
import createSagaMiddleware, { Task } from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import { boardLogic } from './gameLogicReducer';
export function makeStore(): Store {
  const saga = createSagaMiddleware();
  const store = configureStore({
    reducer: {
      boardLogic,
    },
    devTools: true,
    middleware: (baseMiddleware) => [
      ...baseMiddleware(),
      saga,
    ],
  })

  // store.sagaTask = saga.run(rootSaga);
  return store;
}

export const StoreWrapper = createWrapper(makeStore, { debug: true});
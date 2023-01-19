import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import { sessionPersistConfig, sessionReducer } from './session';
export const store = configureStore({
  reducer: {
    session: persistReducer(sessionPersistConfig, sessionReducer),
  },
  devTools: true,
  middleware: [sagaMiddleware],
});
export const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import { sessionPersistConfig, sessionReducer } from './session';
import rootSaga from './rootSaga';

export const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    session: persistReducer(sessionPersistConfig, sessionReducer),
  },
  devTools: true,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

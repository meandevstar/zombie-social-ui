import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import { sessionPersistConfig, sessionReducer } from './session';
import { survivorsPersistConfig, survivorsReducer } from './survivors';
import { tradePersistConfig, tradeReducer } from './trade';
import rootSaga from './rootSaga';

export const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    session: persistReducer(sessionPersistConfig, sessionReducer),
    survivors: persistReducer(survivorsPersistConfig, survivorsReducer),
    trade: persistReducer(tradePersistConfig, tradeReducer),
  },
  devTools: true,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

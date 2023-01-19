import storage from 'redux-persist/lib/storage';

const tradePersistConfig = {
  key: 'trade',
  whitelist: [],
  storage,
};

export default tradePersistConfig;

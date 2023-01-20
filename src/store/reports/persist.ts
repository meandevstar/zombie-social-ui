import storage from 'redux-persist/lib/storage';

const reportsPersistConfig = {
  key: 'reports',
  whitelist: [],
  storage,
};

export default reportsPersistConfig;

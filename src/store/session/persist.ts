import storage from 'redux-persist/lib/storage';

const sessionPersistConfig = {
  key: 'session',
  whitelist: ['user'],
  storage,
};

export default sessionPersistConfig;

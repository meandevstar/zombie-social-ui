import storage from 'redux-persist/lib/storage';

const survivorsPersistConfig = {
  key: 'survivors',
  whitelist: [],
  storage,
};

export default survivorsPersistConfig;

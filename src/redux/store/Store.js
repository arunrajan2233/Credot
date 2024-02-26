import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';
import { credotReducer } from '../reducer/Reducer';
 
const persistConfig = {
  key: 'credot',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, credotReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

let persister = persistStore(store);
export {store, persister};

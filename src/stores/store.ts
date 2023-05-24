import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';

import { userApi } from './auth/auth.api';
import authReducer from './auth/auth.slide';
import { blogsApi } from './blogs/blogs.api';
import { commentApi } from './comment/comment.api';
import storage from './sync-storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth'],
};
const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer,
  [blogsApi.reducerPath]: blogsApi.reducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(userApi.middleware)
      .concat(commentApi.middleware)
      .concat(blogsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

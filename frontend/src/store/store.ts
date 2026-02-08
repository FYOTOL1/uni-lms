import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice";
import subjectReducer from "./slices/SubjectSlice";
import userReducer from "./slices/UserSlice";

import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import createWebStorage from "redux-persist/es/storage/createWebStorage";

const persistConfig = {
  key: "auth",
  storage: createWebStorage("local"),
  whitelist: ["user", "subjects", "subject"],
};

const persistAuthReducer = persistReducer(persistConfig, authReducer);
const persistUserReducer = persistReducer(persistConfig, userReducer);
const persistSubjectReducer = persistReducer(persistConfig, subjectReducer);

export const store = configureStore({
  reducer: {
    auth: persistAuthReducer,
    user: persistUserReducer,
    subject: persistSubjectReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

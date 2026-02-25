import authReducer from "./slices/AuthSlice";
import userReducer from "./slices/UserSlice";
import subjectReducer from "./slices/SubjectSlice";
import lectureReducer from "./slices/LectureSlice";
import sectionReducer from "./slices/SectionSlice";
import assignmentReducer from "./slices/AssignmentSlice";

import createWebStorage from "redux-persist/es/storage/createWebStorage";
import persistStore from "redux-persist/es/persistStore";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "auth",
  storage: createWebStorage("local"),
  whitelist: ["user", "subjects", "subject"],
};

const persistAuthReducer = persistReducer(persistConfig, authReducer);
const persistUserReducer = persistReducer(persistConfig, userReducer);
const persistSubjectReducer = persistReducer(persistConfig, subjectReducer);
const persistLectureReducer = persistReducer(persistConfig, lectureReducer);
const persistSectionReducer = persistReducer(persistConfig, sectionReducer);
const persistAssignmentReducer = persistReducer(
  persistConfig,
  assignmentReducer,
);

export const store = configureStore({
  reducer: {
    auth: persistAuthReducer,
    user: persistUserReducer,
    subject: persistSubjectReducer,
    lecture: persistLectureReducer,
    section: persistSectionReducer,
    assignment: persistAssignmentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { createRoot } from "react-dom/client";
import { persistor, store } from "./store/store.ts";
import { Provider } from "react-redux";
import { StrictMode } from "react";
import App from "./App.tsx";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";

axios.defaults.withCredentials = true;

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URI,
});

type BackendResponseError = {
  message?: string;
  missedFields?: { field: string; message: string }[];
};

api.interceptors?.response.use(
  (res) => res,
  (error: AxiosError<BackendResponseError>) => {
    const message = error?.response?.data.message;
    return Promise.reject(new Error(message));
  },
);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Toaster
            position="top-left" // مكان ظهور الـ toast
            reverseOrder={false} // false: الأحدث يظهر في الأسفل
            gutter={8} // المسافة بين كل toast
            toastOptions={{
              duration: 2000, // مدة ظهور الرسالة بالمللي ثانية
            }}
          />
          <App />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
);

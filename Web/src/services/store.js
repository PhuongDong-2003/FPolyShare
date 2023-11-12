import { configureStore } from "@reduxjs/toolkit";
import ProductAPI from "./feature/Product/service";
import FeedbackAPI from "./feature/Feedback/service";
import TechAPI from "./feature/Tech/service";
import NotificationAPI from "./feature/Notification/service";

const store = configureStore({
  reducer: {
    [ProductAPI.reducerPath]: ProductAPI.reducer,
    [FeedbackAPI.reducerPath]: FeedbackAPI.reducer,
    [TechAPI.reducerPath]: TechAPI.reducer,
    [NotificationAPI.reducerPath]: NotificationAPI.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ProductAPI.middleware,
      FeedbackAPI.middleware,
      TechAPI.middleware,
      NotificationAPI.middleware
    ),
});

export default store;

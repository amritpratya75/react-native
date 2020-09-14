import React from "react";
import Navigator from "./routes/switch";
import { Provider as StoreProvider } from "react-redux";
import store from "./redux/store";

export default function App() {
  return (
    <StoreProvider store={store}>
      <Navigator />
    </StoreProvider>
  );
}

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { Player } from "./pages/Player.tsx";
import { store } from "./store/index.ts";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ReduxProvider store={store}>
            <Player />
        </ReduxProvider>
    </React.StrictMode>
);

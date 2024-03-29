import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import StateProvider from "components/logical/StateProvider";
import DataProvider from "components/logical/DataProvider";
import ObjectProvider from "components/logical/ObjectProvider";
import DataFlowProvider from "components/logical/DataFlowProvider";
import ActionProvider from "components/logical/ActionProvider";
import BoardProvider from "components/logical/BoardProvider";
import MediaProvider from "components/logical/MediaProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BoardProvider>
    <MediaProvider>
      <DataProvider>
        <StateProvider>
          <DataFlowProvider>
            <ObjectProvider>
              <ActionProvider>
                <App />
              </ActionProvider>
            </ObjectProvider>
          </DataFlowProvider>
        </StateProvider>
      </DataProvider>
    </MediaProvider>
  </BoardProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

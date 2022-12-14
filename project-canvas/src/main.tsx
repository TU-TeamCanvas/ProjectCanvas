import React from "react"
import ReactDOM from "react-dom/client"
import { HashRouter } from "react-router-dom"
import "styles/index.css"
import { App } from "./App"
import { ThemeProvider } from "./ThemeProvider"
import "./samples/node-api"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>
)

postMessage({ payload: "removeLoading" }, "*")

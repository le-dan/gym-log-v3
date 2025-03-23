import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router";
import App from "./pages/App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<HashRouter>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</HashRouter>
);

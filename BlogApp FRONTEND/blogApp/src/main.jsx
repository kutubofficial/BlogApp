import "./index.css";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import {AuthProvider} from "./components/AuthProvider";
// import axios from "axios";
// axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
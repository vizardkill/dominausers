import ReactDOM from "react-dom/client";
import UserMicroFrontEnd from "./app/core/users";

const App = () => (<UserMicroFrontEnd />);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);

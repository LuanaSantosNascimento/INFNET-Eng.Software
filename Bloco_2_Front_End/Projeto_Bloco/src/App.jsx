import GlobalStyle from "./css/global";
import RoutesApp from "./routes/routes";
import { AuthProvider } from "./contexts/auth";
import "./App.css";


export default function App() {
  return (
    <AuthProvider>
      <RoutesApp />
      <GlobalStyle />
    </AuthProvider>
  );
}

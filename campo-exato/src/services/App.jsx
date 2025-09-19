import { UserProvider } from "../context/UserContext";
import AppRoutes from "../routes/AppRoutes";

const App = () => (
  <UserProvider>
    <AppRoutes />
  </UserProvider>
);

export default App;

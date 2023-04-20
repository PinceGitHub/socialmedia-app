import { AuthProvider } from "./contexts/AuthProvider";
import Signin from "./pages/Signin/Signin";

function App() {
  return (
    <AuthProvider>
      <Signin />
    </AuthProvider>
  );
}

export default App;

import { BrowserRouter } from "react-router-dom";

import { AppRoutes } from "./routes/routes";

import { ApplicationProvider } from "./context/ApplicationContext";
import { DatabaseProvider } from "./context/DatabaseContext";

function App() {
  return (
    <ApplicationProvider>
      <DatabaseProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </DatabaseProvider>
    </ApplicationProvider>
  );
}

export default App;

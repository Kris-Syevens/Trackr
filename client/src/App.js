import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register, Error, Landing, ProtectedRoute } from "./pages";
import { ThemeProvider } from "styled-components";
import { useAppContext } from "./context/appContext";
import { useEffect } from "react";
import { lightTheme, darkTheme } from "./assets/wrappers/utils/theme";
import {
  AddJob,
  AllJobs,
  Stats,
  SharedLayout,
  Profile,
} from "./pages/dashboard";

function App() {
  const { showDarkmode } = useAppContext();

  useEffect(() => {
    showDarkmode
      ? document.body.classList.add("dark-mode")
      : document.body.classList.remove("dark-mode");
  }, [showDarkmode]);

  return (
    <ThemeProvider theme={showDarkmode ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SharedLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Stats />} />
            <Route path="add-job" element={<AddJob />} />
            <Route path="all-jobs" element={<AllJobs />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

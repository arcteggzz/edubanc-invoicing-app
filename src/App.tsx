import { OverviewPage, SplashPage } from "./pages";
import { routePaths } from "./utils";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path={routePaths.SPLASH} element={<SplashPage />} />
        <Route path={routePaths.HOME} element={<OverviewPage />} />
      </Routes>
    </>
  );
};

export default App;

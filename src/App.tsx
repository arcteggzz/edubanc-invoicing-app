import { OverviewPage, SplashPage, IntroductionPage } from "./pages";
import { routePaths } from "./utils";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path={routePaths.SPLASH} element={<SplashPage />} />
        <Route path={routePaths.HOME} element={<OverviewPage />} />
        <Route path={routePaths.INTRODUCTION} element={<IntroductionPage />} />
      </Routes>
    </>
  );
};

export default App;

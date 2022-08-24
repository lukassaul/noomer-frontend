import { Suspense } from 'react'
//import ReactGA from 'react-ga4';
import GlobalStyle from './globalStyles';
import GlobalFonts from './fonts/fonts';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
//import { useSelector } from "react-redux";
import lazyWithRetry from "./lazyWithRetry";
//import { RootState } from "./app/store";
import Spinner from './components/Spinner'

const ScrollToTop = lazyWithRetry(() => import("./ScrollToTop"))

const NavBar  = lazyWithRetry(() => import("./components/NavBar"))
const TickerSlider  = lazyWithRetry(() => import("./components/TickerSlider"))
const Home  = lazyWithRetry(() => import("./pages/Home"))
const Listing  = lazyWithRetry(() => import("./pages/Listing"))


/*
  Initialize React-GA
  TRACKING_ID is the tracking id from google analytics
*/
// const TRACKING_ID = process.env.REACT_APP_GA_KEY;
// if (TRACKING_ID) {
//   ReactGA.initialize(TRACKING_ID);
//   ReactGA.send("pageview");
// }

function App() {

  return (
    <Suspense fallback={<Spinner />}>
      <Router>
        <ScrollToTop>
          <GlobalFonts />
          <GlobalStyle />
          <NavBar />
          <TickerSlider />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listing" element={<Listing />} />
          </Routes>
        </ScrollToTop>
      </Router>
    </Suspense>
  );
}

export default App;

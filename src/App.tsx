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
const Login  = lazyWithRetry(() => import("./pages/Login"))
const ForgotPassword  = lazyWithRetry(() => import("./pages/ForgotPassword"))
const Home  = lazyWithRetry(() => import("./pages/Home"))
const Listing  = lazyWithRetry(() => import("./pages/PriceListing"))
const PriceDetails  = lazyWithRetry(() => import("./pages/PriceDetails"))
const CreatePriceRecord  = lazyWithRetry(() => import("./pages/CreatePriceRecord"))


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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/listing" element={<Listing />} />
            <Route path="/priceRecord/:id" element={<PriceDetails />} />
            <Route path="/priceRecord/create" element={<CreatePriceRecord />} />
          </Routes>
        </ScrollToTop>
      </Router>
    </Suspense>
  );
}

export default App;

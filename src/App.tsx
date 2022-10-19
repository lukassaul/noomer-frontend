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
import { useSelector } from "react-redux";
import lazyWithRetry from "./lazyWithRetry";
import { RootState } from "./app/store";
import Spinner from './components/Spinner'

const ScrollToTop = lazyWithRetry(() => import("./ScrollToTop"))

const NavBar  = lazyWithRetry(() => import("./components/NavBar"))
const Register  = lazyWithRetry(() => import("./pages/Register"))
const Login  = lazyWithRetry(() => import("./pages/Login"))
const EmailSent  = lazyWithRetry(() => import("./pages/EmailSent"))
const Verification  = lazyWithRetry(() => import("./pages/Verification"))
const ForgotPassword  = lazyWithRetry(() => import("./pages/ForgotPassword"))
const PasswordReset  = lazyWithRetry(() => import("./pages/PasswordReset"))
const ChangePassword  = lazyWithRetry(() => import("./pages/ChangePassword"))
const DeactivateAccount = lazyWithRetry(() => import("./pages/DeactivateAccount"))
const Dashboard  = lazyWithRetry(() => import("./pages/UserDashboard"))
const EditProfile  = lazyWithRetry(() => import("./pages/ProfileEdit"))
const Home  = lazyWithRetry(() => import("./pages/Home"))
const Listing  = lazyWithRetry(() => import("./pages/PriceListing"))
const PriceDetails  = lazyWithRetry(() => import("./pages/PriceDetails"))
const CreatePriceRecord  = lazyWithRetry(() => import("./pages/CreatePriceRecord"))
const NoomerResult  = lazyWithRetry(() => import("./pages/NoomerResult"))
const EditRating  = lazyWithRetry(() => import("./pages/RatingEdit"))
const EditPriceRecord  = lazyWithRetry(() => import("./pages/EditPriceRecord"))
const Categories  = lazyWithRetry(() => import("./pages/Categories"))
const FAQs  = lazyWithRetry(() => import("./pages/FAQs"))
const AboutUs  = lazyWithRetry(() => import("./pages/AboutUs"))
const TermsOfUse  = lazyWithRetry(() => import("./pages/TermsOfUse"))
const PrivacyPolicy  = lazyWithRetry(() => import("./pages/PrivacyPolicy"))


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
  const token = localStorage.getItem('token')
  const { isAddSuccess } = useSelector((state: RootState) => state.addPassword)
  const { isLogSuccess } = useSelector((state: RootState) => state.login)

  return (
    <Suspense fallback={<Spinner />}>
      <Router>
        <ScrollToTop>
          <GlobalFonts />
          <GlobalStyle />
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/emailsent" element={<EmailSent />} />
            <Route path="/setpassword" element={<Verification />} />
            <Route path="/passwordReset" element={<PasswordReset />} />
            <Route path="/change/password" element={token || isAddSuccess || isLogSuccess ? <ChangePassword /> : <Navigate to='/login' />} />
            <Route path="/account/deactivate" element={token || isAddSuccess || isLogSuccess ? <DeactivateAccount /> : <Navigate to='/login' />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/dashboard" element={token || isLogSuccess ? <Dashboard /> : <Navigate to='/login' />} />
            <Route path="/profile/edit" element={token || isLogSuccess ? <EditProfile /> : <Navigate to='/login' />} />
            <Route path="/listing" element={<Listing />} />
            <Route path="/priceRecord/:id" element={<PriceDetails />} />
            <Route path="/priceRecord/create" element={token || isLogSuccess ? <CreatePriceRecord /> : <Navigate to='/login' />} />
            <Route path="/priceRecord/edit" element={token || isLogSuccess ? <EditPriceRecord /> : <Navigate to='/login' />} />
            <Route path="/noomer" element={<NoomerResult />} />
            <Route path="/rating/edit" element={token || isLogSuccess ? <EditRating /> : <Navigate to='/login' />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/terms" element={<TermsOfUse />} />
            <Route path="/policy" element={<PrivacyPolicy />} />
          </Routes>
        </ScrollToTop>
      </Router>
    </Suspense>
  );
}

export default App;

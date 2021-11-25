//@ts-nocheck
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from 'react-router-dom';
import ProtectedRoute from './ProtectedRouting.web';

// ******Routes*****/////

import { ModalContainer } from 'react-router-modal';
import HomeScreen from '../../components/src/HomeScreen';
import TopNav from '../../components/src/TopNav';

import InfoPage from '../../blocks/info-page/src/InfoPageBlock';
// import AlertBlock from '../../blocks/alert/src/AlertBlock.web';
import EmailAccountRegistration from '../../blocks/email-account-registration/src/EmailAccountRegistrationWeb';
import ContentManagement from '../../blocks/ContentManagement/src/ContentManagement';
import Download from '../../blocks/Download/src/Download';
import Notes from '../../blocks/Notes/src/Notes';
import Categoriessubcategories from '../../blocks/categoriessubcategories/src/Categoriessubcategories';
import CustomisableUserSubscriptions from '../../blocks/CustomisableUserSubscriptions/src/CustomisableUserSubscriptions';
import OTPInputAuth from '../../blocks/otp-input-confirmation/src/OTPInputAuth';
import UploadMedia from '../../blocks/UploadMedia/src/UploadMedia';
import OfflineBrowsing from '../../blocks/OfflineBrowsing/src/OfflineBrowsing';
import ReviewPrompt from '../../blocks/ReviewPrompt/src/ReviewPrompt';
import SocialMediaAccountRegistrationScreen from '../../blocks/social-media-account-registration/src/SocialMediaAccountRegistrationScreen';
import Catalogue from '../../blocks/catalogue/src/Sidebar.web';
import PreviewAudioAndContent from '../../blocks/PreviewAudioAndContent/src/PreviewAudioAndContent';
import PaymentAdmin from '../../blocks/PaymentAdmin/src/PaymentAdmin';
import ApiIntegration from '../../blocks/ApiIntegration/src/ApiIntegration';
import Search from '../../blocks/Search/src/Search';
import AdminConsole from '../../blocks/AdminConsole/src/AdminConsoleWeb';
import QrCodes from '../../blocks/QrCodes/src/QrCodes';
import SocialMediaAccountLoginScreen from '../../blocks/social-media-account-login/src/SocialMediaAccountLoginScreen.web';
import Analytics from '../../blocks/Analytics/src/Analytics';
import Ordermanagement from '../../blocks/ordermanagement/src/Ordermanagement';
import OrderDetails from '../../blocks/ordermanagement/src/OrderDetails';
import CountryCodeSelector from '../../blocks/country-code-selector/src/CountryCodeSelector';
import PdfToEpubConvertedIntegration from '../../blocks/PdfToEpubConvertedIntegration/src/PdfToEpubConvertedIntegration';
import Payments from '../../blocks/Payments/src/Payments';
import AudioMusic from '../../blocks/AudioMusic/src/AudioMusic';
import EmailAccountLoginBlock from '../../blocks/email-account-login/src/EmailAccountLoginBlockWeb';
import ForgotPassword from '../../blocks/forgot-password/src/ForgotPassword';
import ForgotPasswordOTP from '../../blocks/forgot-password/src/ForgotPasswordOTP';
import NewPassword from '../../blocks/forgot-password/src/NewPasswordWeb';
import PublisherDashboard from '../../blocks/ContentManagement/src/PublisherDashboardWeb';
import MyBooks from '../../blocks/catalogue/src/MyBooks.web';
import Home from '../../blocks/catalogue/src/Home.web';
import MyNotes from '../../blocks/catalogue/src/MyNotes.web';
import BookDetails from '../../blocks/catalogue/src/BookDetails.web';
import BookRead from '../../blocks/catalogue/src/BookRead.web';
import MyEarnings from '../../blocks/catalogue/src/MyEarnings.web';
import BookNotes from '../../blocks/catalogue/src/bookNotes.web';
import buyNotes from '../../blocks/catalogue/src/buyNotes.web';
import viewMynotes from '../../blocks/catalogue/src/viewMynotes.web';
import purchasedNoteView from '../../blocks/catalogue/src/purchasedNoteView.web';
import buyNotesPrev from '../../blocks/catalogue/src/buyNotesPreview.web';
import buyNotesPurchase from '../../blocks/catalogue/src/buyNotesPurchase.web';
import viewAllBooks from '../../blocks/catalogue/src/ViewAllBooks.web';
import packageBooks from '../../blocks/catalogue/src/packageBooks.web';
import SearchBooks from '../../blocks/catalogue/src/SearchBooks.web';
import userProfile from '../../blocks/catalogue/src/userProfile.web';
import BookReadAbled from '../../blocks/catalogue/src/BookReadAbled.web';
import MyPackages from '../../blocks/catalogue/src/MyPackages.web';
import BuyPackages from '../../blocks/catalogue/src/BuyPackages.web';
import BuyBook from '../../blocks/Payments/src/BuyBook.web';
import BuyPackage from '../../blocks/Payments/src/packagesPayment.web';
import PaymentCompletion from '../../blocks/Payments/src/PaymentCompletion.web';
import MyCart from '../../blocks/Payments/src/Cart.web';
import purchasedBooks from '../../blocks/catalogue/src/purchasedbooks.web';
import purchasedBookPreview from '../../blocks/catalogue/src/purchasedbookPreview.web';
import purchasedRating from '../../blocks/catalogue/src/purchasedRating.web';

class WebRoutes extends Component {
  render() {
    const { history } = this.props;
    const Appthem = JSON.parse(localStorage.getItem('appThemData'));

    return (
      <Router history={history}>
        <div>
          <div>
            <Switch>
              {/* *****routes start******* */}
              <Route path="/" exact component={EmailAccountLoginBlock} />
              <Route
                path="/EmailAccountRegistration"
                exact
                component={EmailAccountRegistration}
              />
              {/* *****routes end******* */}
              {/* ****ProtectedRoute start****** */}
              <ProtectedRoute
                path="/Catalogue/Home"
                exact
                component={Home}
              />
              <Route path="/Publisher" component={PublisherDashboard} />
              <ProtectedRoute
                path="/ContentManagement"
                exact
                component={ContentManagement}
              />
              <ProtectedRoute path="/Notes" exact component={Notes} />
              <ProtectedRoute
                path="/Categoriessubcategories"
                exact
                component={Categoriessubcategories}
              />
              <ProtectedRoute
                path="/CustomisableUserSubscriptions"
                exact
                component={CustomisableUserSubscriptions}
              />
              <ProtectedRoute
                path="/OTPInputAuth"
                exact
                component={OTPInputAuth}
              />
              <ProtectedRoute
                path="/OfflineBrowsing"
                exact
                component={OfflineBrowsing}
              />
              <ProtectedRoute
                path="/UploadMedia"
                exact
                component={UploadMedia}
              />
              <ProtectedRoute
                path="/ReviewPrompt"
                exact
                component={ReviewPrompt}
              />
              <ProtectedRoute
                path="/purchasedNotes"
                exact
                component={purchasedBooks}
              />
              <ProtectedRoute
                path="/purchasedNotePreview/:id"
                exact
                component={purchasedBookPreview}
              />
              <ProtectedRoute
                path="/Rating/:id"
                exact
                component={purchasedRating}
              />
              <ProtectedRoute
                component={MyBooks}
                path="/Catalogue/MyBooks"
                exact
              />
              <ProtectedRoute
                exact
                component={MyPackages}
                path="/MyPackages"
              />
              <ProtectedRoute
                component={BuyPackages}
                path="/BuyPackages"
                exact
              />
              <ProtectedRoute
                component={packageBooks}
                path="/package-books/:id"
                exact
              />
              <ProtectedRoute
                component={MyNotes}
                path="/Catalogue/MyNotes"
                exact
              />
              <ProtectedRoute component={buyNotes} path="/buyNotes" exact />
              <ProtectedRoute
                component={viewMynotes}
                path="/viewMynotes/:id"
                exact
              />
              <ProtectedRoute
                component={purchasedNoteView}
                path="/purchasedNoteView/:id"
                exact
              />
              <ProtectedRoute
                component={buyNotesPrev}
                path="/buyNotesPreview/:id"
                exact
              />
              <ProtectedRoute
                component={buyNotesPurchase}
                path="/buyNotesPurchase/:id"
                exact
              />
              <ProtectedRoute
                component={BuyPackages}
                path="/BuyPackages"
                exact
              />
              <ProtectedRoute
                component={BookNotes}
                path="/booknotes/:id"
                exact
              />
              <ProtectedRoute
                component={MyEarnings}
                path="/Catalogue/MyEarnings"
                exact
              />
              <ProtectedRoute
                component={BookDetails}
                path="/Catalogue/BookDetails/:id"
                exact
              />
              <ProtectedRoute
                component={BookRead}
                path="/book-read/:id"
                exact
              />
              <ProtectedRoute
                component={BookReadAbled}
                path="/book"
                exact
              />
              <ProtectedRoute
                component={viewAllBooks}
                path="/view-allBooks"
                exact
              />
              <ProtectedRoute
                component={SearchBooks}
                path="/search-books"
                exact
              />
              <ProtectedRoute
                component={userProfile}
                path="/user-profile"
                exact
              />
              <ProtectedRoute component={BuyBook} path="/buy-book" exact />
              <ProtectedRoute
                component={BuyPackage}
                path="/buy-package/:id/:id"
                exact
              />
              <ProtectedRoute
                component={PaymentCompletion}
                path="/order-placed/:id"
                exact
              />
              <ProtectedRoute component={MyCart} path="/cart" exact />
              <ProtectedRoute
                component={PreviewAudioAndContent}
                path="/PreviewAudioAndContent"
                exact
              />
              <ProtectedRoute
                component={PaymentAdmin}
                path="/PaymentAdmin"
                exact
              />
              <ProtectedRoute
                component={ApiIntegration}
                path="/ApiIntegration"
                exact
              />
              <ProtectedRoute component={Search} path="/Search" exact />
              <Route
                component={AdminConsole}
                path="/AdminConsole"
                // exact
              />

              <ProtectedRoute
                component={SocialMediaAccountLoginScreen}
                path="/SocialMediaAccountLoginScreen"
                exact
              />
              <ProtectedRoute
                component={Ordermanagement}
                path="/Ordermanagement"
                exact
              />
              <ProtectedRoute
                component={CountryCodeSelector}
                path="/CountryCodeSelector"
                exact
              />
              <ProtectedRoute component={Payments} path="/Payments" exact />
              <ProtectedRoute
                component={AudioMusic}
                path="/AudioMusic"
                exact
              />
              <ProtectedRoute
                component={ForgotPassword}
                path="/ForgotPassword"
                exact
              />
              <ProtectedRoute
                component={ForgotPasswordOTP}
                path="/ForgotPasswordOTP"
                exact
              />
              <Route component={NewPassword} path="/bx_block_forgot_password/resetPassword" exact />
              <ProtectedRoute
                component={PreviewAudioAndContent}
                path="/PreviewAudioAndContent"
                exact
              />
              <ProtectedRoute component={QrCodes} path="/QrCodes" exact />
              <ProtectedRoute
                component={Analytics}
                path="/Analytics"
                exact
              />
              <ProtectedRoute
                component={OrderDetails}
                path="/OrderDetails"
                exact
              />
              <ProtectedRoute
                component={PdfToEpubConvertedIntegration}
                path="/PdfToEpubConvertedIntegration"
                exact
              />

              <ProtectedRoute path="/InfoPage" exact component={InfoPage} />
              <ProtectedRoute path="/Download" exact component={Download} />
              {/* ****ProtectedRoute end****** */}
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default withRouter(WebRoutes);

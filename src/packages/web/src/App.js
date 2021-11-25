// App.js - WEB
import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-firebase';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import WebRoutesGenerator from '../../components/src/NativeWebRouteWrapper';
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
import WebRoutes from './webRoutes';


const routeMap = {
  PublisherDashboard: {
    component: PublisherDashboard,
    path: '/Publisher'
  },
  EmailAccountRegistration: {
    component: EmailAccountRegistration,
    path: '/EmailAccountRegistration'
  },
  ContentManagement: {
    component: ContentManagement,
    path: '/ContentManagement'
  },
  Download: {
    component: Download,
    path: '/Download'
  },
  Notes: {
    component: Notes,
    path: '/Notes'
  },
  Categoriessubcategories: {
    component: Categoriessubcategories,
    path: '/Categoriessubcategories'
  },
  CustomisableUserSubscriptions: {
    component: CustomisableUserSubscriptions,
    path: '/CustomisableUserSubscriptions'
  },
  OTPInputAuth: {
    component: OTPInputAuth,
    path: '/OTPInputAuth'
  },
  UploadMedia: {
    component: UploadMedia,
    path: '/UploadMedia'
  },
  OfflineBrowsing: {
    component: OfflineBrowsing,
    path: '/OfflineBrowsing'
  },
  ReviewPrompt: {
    component: ReviewPrompt,
    path: '/ReviewPrompt'
  },
  SocialMediaAccountRegistrationScreen: {
    component: SocialMediaAccountRegistrationScreen,
    path: '/SocialMediaAccountRegistrationScreen'
  },
  purchasedBooks: {
    component: purchasedBooks,
    path: '/purchasedNotes',
    exact: true
  },
  purchasedBookPreview: {
    component: purchasedBookPreview,
    path: '/purchasedNotePreview/:id',
    exact: true
  },
  purchasedRating: {
    component: purchasedRating,
    path: '/Rating/:id',
    exact: true
  },
  MyBooks: {
    component: MyBooks,
    path: '/Catalogue/MyBooks',
    exact: true
  },
  MyPackages: {
    component: MyPackages,
    path: '/MyPackages',
    exact: true
  },
  BuyPackages: {
    component: BuyPackages,
    path: '/BuyPackages',
    exact: true
  },
  Home: {
    component: Home,
    path: '/Catalogue/Home',
    exact: true
  },
  packageBooks: {
    component: packageBooks,
    path: '/package-books/:id',
    exact: true
  },
  MyNotes: {
    component: MyNotes,
    path: '/Catalogue/MyNotes',
    exact: true
  },
  buyNotes: {
    component: buyNotes,
    path: '/buyNotes',
    exact: true
  },
  viewMynotes: {
    component: viewMynotes,
    path: '/viewMynotes/:id',
    exact: true
  },
  purchasedNoteView: {
    component: purchasedNoteView,
    path: '/purchasedNoteView/:id',
    exact: true
  },
  buyNotesPrev: {
    component: buyNotesPrev,
    path: '/buyNotesPreview/:id',
    exact: true
  },
  buyNotesPurchase: {
    component: buyNotesPurchase,
    path: '/buyNotesPurchase/:id',
    exact: true
  },
  BookNotes: {
    component: BookNotes,
    path: '/booknotes/:id',
    exact: true
  },
  MyEarnings: {
    component: MyEarnings,
    path: '/Catalogue/MyEarnings',
    exact: true
  },
  BookDetails: {
    component: BookDetails,
    path: '/Catalogue/BookDetails/:id',
    exact: true
  },
  BookRead: {
    component: BookRead,
    path: '/book-read/:id',
    exact: true
  },
  BookReadAbled: {
    component: BookReadAbled,
    path: '/book',
    exact: true
  },
  viewAllBooks: {
    component: viewAllBooks,
    path: '/view-allBooks',
    exact: true
  },
  SearchBooks: {
    component: SearchBooks,
    path: '/search-books',
    exact: true
  },
  userProfile: {
    component: userProfile,
    path: '/user-profile',
    exact: true
  },
  BuyBook: {
    component: BuyBook,
    path: '/buy-book',
    exact: true
  },
  BuyPackage: {
    component: BuyPackage,
    path: '/buy-package/:id/:id',
    exact: true
  },
  PaymentCompletion: {
    component: PaymentCompletion,
    path: '/order-placed',
    exact: true
  },
  MyCart: {
    component: MyCart,
    path: '/cart',
    exact: true
  },
  PreviewAudioAndContent: {
    component: PreviewAudioAndContent,
    path: '/PreviewAudioAndContent'
  },
  PaymentAdmin: {
    component: PaymentAdmin,
    path: '/PaymentAdmin'
  },
  ApiIntegration: {
    component: ApiIntegration,
    path: '/ApiIntegration'
  },
  Search: {
    component: Search,
    path: '/Search'
  },
  AdminConsole: {
    component: AdminConsole,
    path: '/AdminConsole'
  },
  SocialMediaAccountLoginScreen: {
    component: SocialMediaAccountLoginScreen,
    path: '/SocialMediaAccountLoginScreen'
  },
  Ordermanagement: {
    component: Ordermanagement,
    path: '/Ordermanagement'
  },
  CountryCodeSelector: {
    component: CountryCodeSelector,
    path: '/CountryCodeSelector'
  },
  Payments: {
    component: Payments,
    path: '/Payments'
  },
  AudioMusic: {
    component: AudioMusic,
    path: '/AudioMusic'
  },
  ForgotPassword: {
    component: ForgotPassword,
    path: '/ForgotPassword'
  },
  ForgotPasswordOTP: {
    component: ForgotPasswordOTP,
    path: '/ForgotPasswordOTP'
  },
  NewPassword: {
    component: NewPassword,
    path: '/ResetPassword'
  },

  PreviewAudioAndContent: {
    component: PreviewAudioAndContent,
    path: '/PreviewAudioAndContent'
  },
  QrCodes: {
    component: QrCodes,
    path: '/QrCodes'
  },
  Analytics: {
    component: Analytics,
    path: '/Analytics'
  },
  OrderDetails: {
    component: OrderDetails,
    path: '/OrderDetails'
  },
  PdfToEpubConvertedIntegration: {
    component: PdfToEpubConvertedIntegration,
    path: '/PdfToEpubConvertedIntegration'
  },
  EmailAccountLoginBlock: {
    component: EmailAccountLoginBlock,
    path: '/',
    exact: true
  },
  // EmailAccountLoginBlock: {
  //     component: EmailAccountLoginBlock,
  //     path: "/EmailAccountLoginBlock",
  //     },

  // Home: {
  // component: HomeScreen,
  // path: '/Home',
  // // exact: true
  // },
  InfoPage: {
    component: InfoPage,
    path: '/InfoPage'
  }

  // AlertWeb: {
  //   component: AlertBlock,
  //   path: '*/AlertWeb',
  //   modal: true
  // }
};

const firebaseAPI = firebase.initializeApp({
  apiKey: 'AIzaSyDgl9aTbKMdRZ9-ijSZRionh3V591gMJl4',
  authDomain: 'rnmasterapp-c11e9.firebaseapp.com',
  databaseURL: 'https://rnmasterapp-c11e9.firebaseio.com',
  projectId: 'rnmasterapp-c11e9',
  storageBucket: 'rnmasterapp-c11e9.appspot.com',
  messagingSenderId: '649592030497',
  appId: '1:649592030497:web:7728bee3f2baef208daa60',
  measurementId: 'G-FYBCF3Z2W3'
});

class App extends Component {
  componentDidMount = () => {
    const defaultAnalytics = firebaseAPI.analytics();
    defaultAnalytics.logEvent('APP_Loaded');
  };

  render() {
    return (
      <>
        <View style={{ height: '100vh', width: '100%' }}>
          {/* {WebRoutesGenerator({ webRoutes })} */}
          
          <WebRoutes />
          <ToastContainer />
        </View>
      </>
    );
  }
}

export default App;

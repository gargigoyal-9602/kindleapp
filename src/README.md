# **React Native** | _**KindleLikeApp**_ | _**42900**_

## **Catalog ProjectId: 38865** | **Catalog BuildId: 1751**

## NOTE FOR DEVELOPERS:
Clone the code-engine branch into your working branch. The contents of the branch may get overwritten.
## Author:
Code-Engine
## Keywords:
 - KindleLikeApp
 - mobile
 - web
## Assembled Features To Block Status

| **Feature-Name**        | **Block-Name**        | **Path**  | **Status**  |
|:-------------|:-------------|:-------------|:-------------|
| Catalogue      | catalogue<br>      | {+packages/blocks/catalogue+}<br> | {+Non-Empty+} |
| CategoriessubCategories      | categoriessubcategories<br>      | {+packages/blocks/categoriessubcategories+}<br> | {+Non-Empty+} |
| SignuploginModule      | social-media-account-registration<br>social-media-account<br>email-account-login<br>email-account-registration<br>country-code-selector<br>forgot-password<br>otp-input-confirmation<br>social-media-account-login<br>      | {+packages/blocks/social-media-account-registration+}<br>{+packages/blocks/social-media-account+}<br>{+packages/blocks/email-account-login+}<br>{+packages/blocks/email-account-registration+}<br>{+packages/blocks/country-code-selector+}<br>{+packages/blocks/forgot-password+}<br>{+packages/blocks/otp-input-confirmation+}<br>{+packages/blocks/social-media-account-login+}<br> | {+Non-Empty+} |
| OrderManagement      | ordermanagement<br>      | {+packages/blocks/ordermanagement+}<br> | {+Non-Empty+} |
| CustomisableUserSubscriptions      | CustomisableUserSubscriptions      | {-packages/blocks/CustomisableUserSubscriptions-} | {-Empty-} |
| Search      | Search      | {-packages/blocks/Search-} | {-Empty-} |
| UploadMedia      | UploadMedia      | {-packages/blocks/UploadMedia-} | {-Empty-} |
| ApiIntegration      | ApiIntegration      | {-packages/blocks/ApiIntegration-} | {-Empty-} |
| PaymentAdmin      | PaymentAdmin      | {-packages/blocks/PaymentAdmin-} | {-Empty-} |
| Download      | Download      | {-packages/blocks/Download-} | {-Empty-} |
| ReviewPrompt      | ReviewPrompt      | {-packages/blocks/ReviewPrompt-} | {-Empty-} |
| Payments      | Payments      | {-packages/blocks/Payments-} | {-Empty-} |
| AdminConsole      | AdminConsole      | {-packages/blocks/AdminConsole-} | {-Empty-} |
| QrCodes      | QrCodes      | {-packages/blocks/QrCodes-} | {-Empty-} |
| Analytics      | Analytics      | {-packages/blocks/Analytics-} | {-Empty-} |
| AudioMusic      | AudioMusic      | {-packages/blocks/AudioMusic-} | {-Empty-} |
| Notes      | Notes      | {-packages/blocks/Notes-} | {-Empty-} |
| ContentManagement      | ContentManagement      | {-packages/blocks/ContentManagement-} | {-Empty-} |
| OfflineBrowsing      | OfflineBrowsing      | {-packages/blocks/OfflineBrowsing-} | {-Empty-} |
| PdfToEpubConvertedIntegration      | PdfToEpubConvertedIntegration      | {-packages/blocks/PdfToEpubConvertedIntegration-} | {-Empty-} |
| PreviewAudioAndContent      | PreviewAudioAndContent      | {-packages/blocks/PreviewAudioAndContent-} | {-Empty-} |

## AWS BACKEND DEPLOYMENT URL
 - BaseURL exported as: "https://kindlelikeapp-42900-ruby.42900.dev.ap-southeast-1.aws.svc.builder.cafe"
## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

See docs folder for additional information.

### Prerequisites

What things you need to install the software and how to install them

* React Native (last tested on react-native0.61.3)
  - https://facebook.github.io/react-native/docs/getting-started

* IFF brew is installed and user doesn't have permisions.
```
  $ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)"
  $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

* XCode 11 or greater

* XCode Command Line Tools
```
  $ xcode-select --install
```

* Android SDK
```
  $ brew cask install android-sdk
```

* JDK 11
```
  $ brew tap homebrew/cask-versions
  $ brew cask install java
  $ brew cask install java11
```

### Installing

A step by step series of examples that tell you how to get a development env running

Install yarn
```
  $ brew install yarn
```

Install node

```
  $ brew install node
```

Web
```
  $ yarn
  $ yarn workspace web start 
  (Note: After udpating depencies run again if no cocde erros. )
```

iOS
```
  $ yarn
  $ cd packages/mobile/ios && pod install && cd ../../../ && cp node-runners/RCTUIImageViewAnimated.m node_modules/react-native/Libraries/Image/RCTUIImageViewAnimated.m && npx react-native bundle --entry-file ./packages/mobile/index.js --platform ios --dev true --bundle-output ./packages/mobile/ios/main.jsbundle && yarn ios
```

Android - https://docs.expo.io/versions/latest/workflow/android-studio-emulator/
```
  $ yarn
  $ export JAVA_HOME=`/usr/libexec/java_home -v 11`; java -version; export ANDROID_HOME=${HOME}/Library/Android/sdk; export PATH=${PATH}:${ANDROID_HOME}/emulator && yarn android
```

## Running the tests

```
  $ yarn test
```


## CI/CD Details

We use GitlabCI for our deployment/Build pipelines

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).




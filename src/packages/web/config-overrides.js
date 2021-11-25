const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

//MARK::Add Web Blocks
const appIncludes = [
resolveApp('../blocks/catalogue/src/'),
resolveApp('../blocks/categoriessubcategories/src/'),
resolveApp('../blocks/social-media-account-registration/src/'),
resolveApp('../blocks/social-media-account/src/'),
resolveApp('../blocks/email-account-login/src/'),
resolveApp('../blocks/email-account-registration/src/'),
resolveApp('../blocks/country-code-selector/src/'),
resolveApp('../blocks/forgot-password/src/'),
resolveApp('../blocks/otp-input-confirmation/src/'),
resolveApp('../blocks/social-media-account-login/src/'),
resolveApp('../blocks/ordermanagement/src/'),
resolveApp('../blocks/CustomisableUserSubscriptions/src/'),
resolveApp('../blocks/Search/src/'),
resolveApp('../blocks/UploadMedia/src/'),
resolveApp('../blocks/ApiIntegration/src/'),
resolveApp('../blocks/PaymentAdmin/src/'),
resolveApp('../blocks/Download/src/'),
resolveApp('../blocks/ReviewPrompt/src/'),
resolveApp('../blocks/Payments/src/'),
resolveApp('../blocks/AdminConsole/src/'),
resolveApp('../blocks/QrCodes/src/'),
resolveApp('../blocks/Analytics/src/'),
resolveApp('../blocks/AudioMusic/src/'),
resolveApp('../blocks/Notes/src/'),
resolveApp('../blocks/ContentManagement/src/'),
resolveApp('../blocks/OfflineBrowsing/src/'),
resolveApp('../blocks/PdfToEpubConvertedIntegration/src/'),
resolveApp('../blocks/PreviewAudioAndContent/src/'),

  resolveApp('src'),
  resolveApp('../components/src'),
  resolveApp('../framework/src'),
  resolveApp('../../node_modules/react-native-elements'),
  resolveApp('../../node_modules/react-native-vector-icons'),
  resolveApp('../../node_modules/react-native-ratings'),
  resolveApp('../../node_modules/react-native-image-picker'),
  resolveApp('../../node_modules/react-native-check-box'),
  resolveApp('../blocks/restClient/src'),
  resolveApp('../blocks/alert/src'),
  resolveApp('../blocks/adapters/src'),
  resolveApp('../blocks/info-page/src')
]

module.exports = function override(config, env) {
  // allow importing from outside of src folder
  config.resolve.plugins = config.resolve.plugins.filter(
    plugin => plugin.constructor.name !== 'ModuleScopePlugin'
  )
  config.module.rules[0].include = appIncludes
  config.module.rules[1] = null
  config.module.rules[2].oneOf[1].include = appIncludes
  config.module.rules[2].oneOf[1].options.plugins = [
    require.resolve('babel-plugin-react-native-web'),
  ].concat(config.module.rules[2].oneOf[1].options.plugins)
  config.module.rules = config.module.rules.filter(Boolean)
  config.plugins.push(
    new webpack.DefinePlugin({ __DEV__: env !== 'production' })
  )
  return config
}
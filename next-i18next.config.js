// used for SSR (getServerSideProps)
// const path = require('path')
// const localePath = path.resolve('./public/locales')
const { resolve } = require('path');

module.exports = {
  // https://www.i18next.com/overview/configuration-options#logging
  debug: process.env.NODE_ENV === 'development',
  i18n: {
    locales: ['ja', 'en', 'vi'],
    defaultLocale: 'en',
  },
  localePath: resolve('./public/locales'),
  // localePath,
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};

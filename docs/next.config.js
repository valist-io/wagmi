const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js',
  unstable_contentDump: true,
  unstable_flexsearch: true,
  unstable_staticImage: true,
})

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// Only use preconstruct for development
const withPreconstruct =
  process.env.NODE_ENV === 'development'
    ? require('@preconstruct/next')
    : (config) => config

/** @type {import('next').NextConfig} */
const config = {
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  reactStrictMode: true,
  redirects: () => {
    return [
      {
        source: '/examples',
        destination: '/examples/connect-wallet',
        statusCode: 302,
      },
      {
        source: '/guides/:path*',
        destination: '/examples/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = withPreconstruct(withBundleAnalyzer(withNextra(config)))

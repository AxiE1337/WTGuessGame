/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  publicExcludes: ['!maps/**/*', '!tanks/**/*'],
})

module.exports = withPWA({
  reactStrictMode: true,
})

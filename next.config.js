/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID,
  }
}

module.exports = nextConfig

export const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: 'http://localhost:3000',
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: 'https://dev-kuudrn3zb6ggs5dl.jp.auth0.com'
};
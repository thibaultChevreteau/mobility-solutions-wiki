import { handleAuth, handleLogin } from "@auth0/nextjs-auth0"

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      audience: "https://editorial.com", // or AUTH0_AUDIENCE
      scope: "openid profile email write:solutions write:draft", // add 'openid', 'profile', and 'email' for identity
    },
  }),
  signup: handleLogin({
    authorizationParams: {
      screen_hint: "signup",
      scope: "openid profile email", // add 'openid', 'profile', and 'email'
    },
  }),
})

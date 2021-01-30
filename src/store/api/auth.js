import { constructUrl, BaseUrl } from "./base";

const loginRoute = `auth`;

const vCodeRoute = "vcode";

const authBaseRoute = constructUrl(BaseUrl, loginRoute);

const authVcodeBaseRoute = constructUrl(authBaseRoute, vCodeRoute);

export const loginUrl = constructUrl(authBaseRoute, "login");

export const logoutUrl = constructUrl(authBaseRoute, "logout");

export const signUpUrl = constructUrl(authBaseRoute, "signup");

export const verifyUserUrl = constructUrl(authBaseRoute, "verify");

export const authVcodeRequestPostUrl = constructUrl(
  authVcodeBaseRoute,
  "request"
);

export const authResendVcodeRequestPostUrl = constructUrl(
  authVcodeBaseRoute,
  "resend"
);


export const authVcodeResendPostUrl = constructUrl(
  authVcodeBaseRoute,
  "resend"
);

export const authForgotPasswordUrl = constructUrl(
  authBaseRoute,
  "forgot-password"
);

export const authResetPasswordUrl = constructUrl(
  authBaseRoute,
  "reset-password"
);


export const authVcodeVerifyPostUrl = constructUrl(authBaseRoute, "verify");

export const RoutesName = {
  LOGIN: "/login",
  HOME: "/home",
  SIGN_UP: "/sign-up",
  DETAILS: "/details/:id",
  NEW_POSTS: "/new-posts",
  NEW_GROUP: "/new-group",
  WEBHOOKS: "/webhooks",
  LANDING_PAGE: "/",
  PROFILE: "/profile",
  SUCCESS: "/success",
  GROUP: "/groups",
};

// Create a type from the RoutesName object values
export type RoutePath = (typeof RoutesName)[keyof typeof RoutesName];

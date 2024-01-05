import controller from "../controllers/auth";
import validate from "../controllers/auth/auth.validate";
import AuthController from "../controllers/auth";
import express from "express";
const router = express.Router();
require("../../config/passport");
import passport from "passport";
const requireAuth = passport.authenticate("jwt", {
  session: false
});
import trimRequest from "trim-request";

/*
 * Auth routes
 */

/*
 * Register route
 */
router.post(
  "/otp",
  trimRequest.all,
  validate.otp,
  controller.sendVerificationCode
);

/*
 * Register route
 */
router.post(
  "/register",
  trimRequest.all,
  validate.register,
  controller.register
);

/*
 * Register with -social media route
 */
router.post(
  "/socialLogin",
  trimRequest.all,
  validate.socialMedia,
  controller.Sociallogin
);

/*
 * Verify route
 */
// router.post('/verify', trimRequest.all, validate.verify, controller.verify)

/*
 * Forgot password route
 */
router.post(
  "/forgot",
  trimRequest.all,
  validate.forgotPassword,
  controller.forgotPassword
);

/*
 * Reset password route
 */
router.post(
  "/reset",
  trimRequest.all,
  validate.resetPassword,
  controller.resetPassword
);

/*
 * Get new refresh token
 */
router.get(
  "/token",
  requireAuth,
  AuthController.roleAuthorization(["user", "admin"]),
  trimRequest.all,
  controller.getRefreshToken
);

/*
 * Login route
 */
router.post("/login", trimRequest.all, validate.login, controller.login);

module.exports = router;

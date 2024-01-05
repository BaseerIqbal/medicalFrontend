const { validationResult } = require("../../middleware/utils");
const { check } = require("express-validator");

/**
 * Validates register request
 */
exports.otp = [
  check("phone")
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY")
    .trim(),

  (req, res, next) => {
    validationResult(req, res, next);
  }
];

/**
 * Validates register request
 */
exports.socialMedia = [
  check("provider")
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY"),
  check("socialToken")
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY"),
  check("name")
    .optional()
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY"),
  check("email")
    .optional()
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY")
    .isEmail()
    .withMessage("EMAIL_IS_NOT_VALID"),
  check("phone")
    .optional()
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY")
    .trim(),
  (req, res, next) => {
    validationResult(req, res, next);
  }
];

/**
 * Validates register request
 */
exports.register = [
  check("name")
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY"),
  check("email")
    .optional()
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY")
    .isEmail()
    .withMessage("EMAIL_IS_NOT_VALID"),
  check("phone")
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY")
    .trim(),
  check("password")
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY")
    .isLength({
      min: 5
    })
    .withMessage("PASSWORD_TOO_SHORT_MIN_5"),
  check("provider")
    .optional()
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY"),
  check("socialToken")
    .optional()
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY"),
  (req, res, next) => {
    validationResult(req, res, next);
  }
];

/**
 * Validates login request
 */
exports.login = [
  check("email")
    .optional()
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY")
    .isEmail()
    .withMessage("EMAIL_IS_NOT_VALID"),
  check("phone")
    .optional()
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY")
    .trim(),
  check("password")
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY")
    .isLength({
      min: 5
    })
    .withMessage("PASSWORD_TOO_SHORT_MIN_5"),
  check("provider")
    .optional()
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY"),
  check("socialToken")
    .optional()
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY"),
  (req, res, next) => {
    validationResult(req, res, next);
  }
];

/**
 * Validates verify request
 */
exports.verify = [
  check("id")
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY"),
  (req, res, next) => {
    validationResult(req, res, next);
  }
];

/**
 * Validates forgot password request
 */
exports.forgotPassword = [
  check("email")
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY")
    .isEmail()
    .withMessage("EMAIL_IS_NOT_VALID"),
  (req, res, next) => {
    validationResult(req, res, next);
  }
];

/**
 * Validates reset password request
 */
exports.resetPassword = [
  check("id")
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY"),
  check("password")
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY")
    .isLength({
      min: 5
    })
    .withMessage("PASSWORD_TOO_SHORT_MIN_5"),
  (req, res, next) => {
    validationResult(req, res, next);
  }
];

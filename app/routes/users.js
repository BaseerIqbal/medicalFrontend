import controller from "../controllers/users";
import validate from "../controllers/users/users.validate";
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
 * Users routes
 */

/*
 * Get items route
 */
router.get(
  "/",
  requireAuth,
  AuthController.roleAuthorization(["admin"]),
  trimRequest.all,
  controller.getItems
);

/*
 * Create new item route
 */
router.post(
  "/",
  requireAuth,
  AuthController.roleAuthorization(["admin"]),
  trimRequest.all,
  validate.createItem,
  controller.createItem
);

/*
 * Get item route
 */
router.get(
  "/:id",
  requireAuth,
  AuthController.roleAuthorization(["admin"]),
  trimRequest.all,
  validate.getItem,
  controller.getItem
);

/*
 * Update item route
 */
router.patch(
  "/:id",
  requireAuth,
  AuthController.roleAuthorization(["admin"]),
  trimRequest.all,
  validate.updateItem,
  controller.updateItem
);

/*
 * Delete item route
 */
router.delete(
  "/:id",
  requireAuth,
  AuthController.roleAuthorization(["admin"]),
  trimRequest.all,
  validate.deleteItem,
  controller.deleteItem
);

module.exports = router;

import controller from '../controllers/profile'
import validate from '../controllers/profile/profile.validate'
import AuthController from '../controllers/auth'
import express from 'express'
import multer from 'multer'
const path = require('path')
const router = express.Router()
require('../../config/passport')
import passport from 'passport'
const requireAuth = passport.authenticate('jwt', {
  session: false
})
import trimRequest from 'trim-request'

/*
 * Profile routes
 */

/*
 * Get profile route
 */
router.get(
  '/',
  requireAuth,
  AuthController.roleAuthorization(['user', 'admin']),
  trimRequest.all,
  controller.getProfile
)

/*
 *Upload profile pic
 */
var userStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    console.log('erer')
    cb(null, path.join(__dirname, '../../public/uploads/user'))
  },
  filename: function(req, file, cb) {
    console.log('dfgdfgdgdfg')
    cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
  }
})

var uploadPic = multer({ storage: userStorage }).single('pic')

/*
 * Update profile route
 */
router.patch(
  '/',
  uploadPic,
  requireAuth,
  AuthController.roleAuthorization(['user', 'admin']),
  trimRequest.all,
  validate.updateProfile,
  controller.updateProfile
)

/*
 * Change password route
 */
router.post(
  '/changePassword',
  requireAuth,
  AuthController.roleAuthorization(['user', 'admin']),
  trimRequest.all,
  validate.changePassword,
  controller.changePassword
)

module.exports = router

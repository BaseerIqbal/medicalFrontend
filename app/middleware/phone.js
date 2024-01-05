const parseString = require("xml2js").parseString;
const Request = require("request");
const i18n = require("i18n");
const User = require("../models/user");
const { itemAlreadyExists } = require("../middleware/utils");

/**
 * Sends email
 * @param {Object} data - data
 * @param {boolean} callback - callback
 */
const sendVerificationCode = async (data, callback) => {
  let msg = "Here is your verification code " + data.code;
  let sendUrl = `http://messaging.ooredoo.qa/bms/soap/Messenger.asmx/HTTP_SendSms?customerID=2369&userName=IdealMe&userPassword=V%40przO5wt6&originator=Ideal+Me&smsText=${msg}&recipientPhone=${data.phone}&messageType=0&defDate=&blink=false&flash=false&Private=false`;

  Request.get(sendUrl, (error, response, body) => {
    parseString(body, function(err, result) {
      let status = result.SendResult["Result"][0];

      if (status !== "OK") {
        return callback(false);
      }
      return callback(data.code);
    });
  });
};

module.exports = {
  /**
   * Checks User model if user with an specific email exists
   * @param {string} email - user email
   */
  async phoneExists(obj) {
    return new Promise((resolve, reject) => {
      User.findOne({ phone: obj.phone }, (err, item) => {
        if (!item) {
          let data = {
            phone: obj.phone,
            code: Math.floor(Math.random() * 9000) + 1000
          };
          sendVerificationCode(data, messageSent => {
            if (messageSent) resolve(messageSent);
            else {
              itemAlreadyExists(false, true, reject, "VERIFICATION NOT SENT");
              resolve(false);
            }
          });
        } else {
          itemAlreadyExists(err, item, reject, "PHONE_ALREADY_EXISTS");
          resolve(false);
        }
      });
    });
  },

  /**
   * Checks User model if user with an specific email exists but excluding user id
   * @param {string} id - user id
   * @param {string} phone - user email
   */
  async phoneExistsExcludingMyself(id, phone) {
    return new Promise((resolve, reject) => {
      User.findOne(
        {
          phone,
          _id: {
            $ne: id
          }
        },
        (err, item) => {
          itemAlreadyExists(err, item, reject, "PHONE_ALREADY_EXISTS");
          resolve(false);
        }
      );
    });
  }
};

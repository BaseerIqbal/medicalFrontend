const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const VerifySchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true
    },
    verification: {
      type: String
    },
    verified: {
      type: Boolean,
      default: true
    },
    phone: {
      type: Number,
      unique: true,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

VerifySchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Verify', VerifySchema)

const { model, Schema } = require("mongoose");

// room has a 1 to N relationship with user
// here we are storing the email, which is unique
// and can be populated from the user model
// with a new virtual path "user" where room.admin <=> user.email
const roomSchema = new Schema(
  {
    roomID: {
      type: String,
    },
    admin: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },// When set to true converting a Mongoose document to a plain JavaScript object
    toJSON: { virtuals: true },
  }
);
//odm-object data modelling 
roomSchema.virtual("user", {
  ref: "User",
  localField: "admin",
  foreignField: "email",
  justOne: true,
});

module.exports = model("Room", roomSchema);

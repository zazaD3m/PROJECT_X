import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    address: { type: String, default: "" },
    role: {
      type: String,
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    wishlist: [{ type: ObjectId, ref: "Product" }],
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    next(error);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  try {
    if (!this.password) {
      return null;
    }
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    return error;
  }
};

const User = model("User", userSchema, "users");

export default User;

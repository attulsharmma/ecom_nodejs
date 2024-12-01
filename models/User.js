import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);
dotenv.config();
const { JWT_SECRET } = process.env;

// Hash password before saving the user
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

// Function to generate reset token
UserSchema.methods.generateResetToken = function () {
  const user = this;
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
  return user.save();
};
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", UserSchema);

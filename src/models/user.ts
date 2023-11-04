import { Document, model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { capitalize, isValidEmail, isValidPassword } from "../utils";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => {
          return isValidEmail(v);
        },
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => {
          return isValidPassword(v);
        },
        message: "Invalid passord format",
      },
    },
  },
  { timestamps: true }
);

// Middleware function executed before saving a user to the database
UserSchema.pre("save", function () {
  this.name = capitalize(this.name);
  this.email = this.email.toLowerCase();

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
});

// Exclude the "password" field from query retults by default
UserSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
  },
});

const User = model("User", UserSchema);
export default User;

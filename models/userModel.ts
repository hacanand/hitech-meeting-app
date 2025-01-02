import mongoose, { Document, Schema, Model } from 'mongoose';

interface IUser extends Document {
  id: string;
  type: 'user';
  userType: 'salesperson' | 'customer';
  clerkId: string;
  email: string;
  fullName: string;
  profilePicture?: string;
  calendlyAccessToken?: string;
  calendlyRefreshToken?: string;
  calendlyUserId?: string;
  token?: {
    access_token: string;
    refresh_token: string;
    scope: string;
    token_type: string;
    expiry_date: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ['user'],
      required: true,
      default: 'user',
    },
    userType: {
      type: String,
      enum: ['salesperson', 'customer'],
      required: true,
    },
    clerkId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    calendlyAccessToken: {
      type: String,
      required: function (this: IUser) {
        return this.userType === 'salesperson';
      },
    },
    calendlyRefreshToken: {
      type: String,
      required: function (this: IUser) {
        return this.userType === 'salesperson';
      },
    },
    calendlyUserId: {
      type: String,
      required: function (this: IUser) {
        return this.userType === 'salesperson';
      },
    },
    token: {
      access_token: { type: String, required: false },
      refresh_token: { type: String, required: false },
      scope: { type: String, required: false },
      token_type: { type: String, required: false },
      expiry_date: { type: Number, required: false },
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
    versionKey: false, // Remove __v field
  }
);

userSchema.pre<IUser>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;

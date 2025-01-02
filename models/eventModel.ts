import mongoose, { Document, Schema, Model } from "mongoose";

interface IEvent extends Document {
  id: string;
  type: "event";
  createrId: string;
  eventName: string;
  eventDescription: string;
  eventDuration: number;
  startTime: Date;
  endTime: Date;
  calendlyEventId: string;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema: Schema<IEvent> = new Schema(
  {
    id: {
      type: String,
      required: [true, "Event ID is required"],
      unique: true,
    },
    type: {
      type: String,
      enum: ["event"],
      required: true,
      default: "event",
    },
    createrId: {
      type: String,
      required: [true, "Creator ID is required"],
      ref: "User", // Reference to the User model
    },
    eventName: {
      type: String,
      required: [true, "Event name is required"],
      trim: true,
      maxlength: [100, "Event name must not exceed 100 characters"],
    },
    eventDescription: {
      type: String,
      required: [true, "Event description is required"],
      trim: true,
      maxlength: [500, "Event description must not exceed 500 characters"],
    },
    eventDuration: {
      type: Number,
      required: [true, "Event duration is required"],
      min: [1, "Event duration must be at least 1 minute"],
    },
    startTime: {
      type: Date,
      required: [true, "Start time is required"],
    },
    endTime: {
      type: Date,
      required: [true, "End time is required"],
    },
    calendlyEventId: {
      type: String,
      required: [true, "Calendly event ID is required"],
      unique: true,
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

/// INDEXES
eventSchema.index({ createrId: 1, eventName: 1 }); // Optimize queries for creator's events

/// VALIDATIONS
eventSchema.pre<IEvent>("validate", function (next) {
  // Ensure startTime is before endTime
  if (this.startTime >= this.endTime) {
    return next(new Error("Start time must be before end time"));
  }

  // Ensure eventDuration matches the time difference
  const durationInMinutes =
    (this.endTime.getTime() - this.startTime.getTime()) / (1000 * 60);
  if (this.eventDuration !== durationInMinutes) {
    return next(
      new Error(
        "Event duration must match the difference between startTime and endTime"
      )
    );
  }

  next();
});

/// PRE-SAVE HOOKS
eventSchema.pre<IEvent>("save", function (next) {
  this.updatedAt = new Date(); // Update the `updatedAt` field
  next();
});

/// STATIC METHODS
eventSchema.statics.findByCreator = async function (creatorId: string) {
  try {
    return await this.find({ createrId: creatorId });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(
        `Error finding events for creator ID: ${creatorId}. Details: ${err.message}`
      );
    } else {
      throw new Error(`Error finding events for creator ID: ${creatorId}.`);
    }
  }
};

/// EXPORT MODEL
const Event: Model<IEvent> = mongoose.model<IEvent>("Event", eventSchema);

export default Event;

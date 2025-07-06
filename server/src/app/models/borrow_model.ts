import mongoose, { Schema } from "mongoose";
import { IBorrow } from "../interfaces/borow_interfaces";

const borrowSchema = new mongoose.Schema<IBorrow>({
    book:{
        type:Schema.Types.ObjectId,
        ref:"Books",
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
        min:0
    },
    dueDate:{
        type:Date,
        required:true,
    },
})

export const borrowModel = mongoose.model<IBorrow>("Borrows", borrowSchema)
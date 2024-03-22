"use server"
import { connectToDb } from "@/lib/utils";
import mongoose from 'mongoose';


const reviewSchema = new mongoose.Schema({
    safety: Number,
    communication: Number,
    recommend: String,
    facetArr: [String],
    feedbackText: String, 
})

const Review = mongoose.models?.Review || mongoose.model("Review", reviewSchema);



export async function reviewPost(formData){
    const {safety, communication, recommend, facetArr, feedbackText} = formData;

    try{
        await connectToDb();
        const newReview = new Review({
            safety, communication, recommend, facetArr, feedbackText
        });
        await newReview.save();
    }catch(err){
        console.log(err);
        return {error: "Something went wrong!"}
    }
}
const express = require("express");
const { WomenModel } = require("../models/women.model")

const womenRouter = express.Router();
womenRouter.use(express.json());

womenRouter.get("/", async (req, res) => {
    const query = req.query
    const data = await WomenModel.find(query);
    res.send(data);
})

womenRouter.post("/create", async (req, res) => {
    const { name, avatar, price, rating } = req.body

    try {
        const men = new WomenModel({ name, avatar, price, rating });
        await men.save()
        res.send("Registered");

    } catch (error) {
        console.log(error);
        res.send("Error in creating");
    }
})

womenRouter.patch("/update/:id", async (req, res) => {
    const obj = req.body
    const id = req.params.id
    try {
        await WomenModel.findByIdAndUpdate({"_id":id},obj);
        res.send("Updated successfully");
    } catch (error) {
        console.log(error)
        res.send("Error updating")
    }
})

womenRouter.delete("/delete/:id", async (req, res) => {
    const obj = req.body
    const id = req.params.id
    try {
        await WomenModel.findByIdAndDelete({"_id":id},obj);
        res.send("Deleted successfully");
    } catch (error) {
        console.log(error)
        res.send("Error deleting")
    }
})

module.exports = { womenRouter }
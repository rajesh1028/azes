const express = require("express");
const { MenModel } = require("../models/men.model")

const menRouter = express.Router();
menRouter.use(express.json());

menRouter.get("/", async (req, res) => {
    const query = req.query
    const data = await MenModel.find(query);
    res.send(data);
})

menRouter.post("/create", async (req, res) => {
    const { name, avatar, price, rating } = req.body

    try {
        const men = new MenModel({ name, avatar, price, rating });
        await men.save()
        res.send("Registered");

    } catch (error) {
        console.log(error);
        res.send("Error in creating");
    }
})

menRouter.patch("/update/:id", async (req, res) => {
    const obj = req.body
    const id = req.params.id
    try {
        await MenModel.findByIdAndUpdate({"_id":id},obj);
        res.send("Updated successfully");
    } catch (error) {
        console.log(error)
        res.send("Error updating")
    }
})

menRouter.delete("/delete/:id", async (req, res) => {
    const obj = req.body
    const id = req.params.id
    try {
        await MenModel.findByIdAndDelete({"_id":id},obj);
        res.send("Deleted successfully");
    } catch (error) {
        console.log(error)
        res.send("Error deleting")
    }
})

module.exports = { menRouter }
const express = require("express");
const { CartModel } = require("../models/cart.model")

const cartRouter = express.Router();
cartRouter.use(express.json());

cartRouter.get("/", async (req, res) => {
    const query = req.query
    const data = await CartModel.find(query);
    res.send(data);
})

cartRouter.post("/create", async (req, res) => {
    const { name, avatar, price, rating } = req.body

    try {
        const cart = new CartModel({ name, avatar, price, rating });
        await cart.save()
        res.send("Registered");

    } catch (error) {
        console.log(error);
        res.send("Error in creating");
    }
})

cartRouter.patch("/update/:id", async (req, res) => {
    const obj = req.body
    const id = req.params.id
    try {
        await CartModel.findByIdAndUpdate({"_id":id},obj);
        res.send("Updated successfully");
    } catch (error) {
        console.log(error)
        res.send("Error updating")
    }
})

cartRouter.delete("/delete/:id", async (req, res) => {
    const obj = req.body
    const id = req.params.id
    try {
        await CartModel.findByIdAndDelete({"_id":id},obj);
        res.send("Deleted successfully");
    } catch (error) {
        console.log(error)
        res.send("Error deleting")
    }
})

module.exports = { cartRouter }
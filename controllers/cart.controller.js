import Cart from "../models/Cart.js";
import User from "../models/User.js";
import { messages } from "../constants.js";
export const addNewCartItem = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, quantity } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send({ message: messages.USER_NOT_FOUND, status: false });
    }
    let cart = await Cart.findOne({ userId });
    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
      await cart.save();
    } else {
      cart = new Cart({ userId, items: [{ productId, quantity }] });
      console.log(cart);
      await cart.save();
    }
    res.status(200).send({ status: true, message: "Cart Item added" });
  } catch (error) {
    console.log("error", error.message);
    res.status(500).send({ message: error.message });
  }
};
export const viewCartItem = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send({ message: messages.USER_NOT_FOUND, status: false });
    }
    let cart = await Cart.findOne({ userId });
    if (cart) {
      res.status(200).send({ status: true, cart });
    } else {
      res.status(200).send({ status: false, message: "Cart is Empty" });
    }
  } catch (error) {
    console.log("error", error.message);
    res.status(500).send({ message: error.message });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const userId = req.userId;

    const { productId } = req.query;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send({ message: messages.USER_NOT_FOUND, status: false });
    }
    let cart = await Cart.findOne({ userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );
      if (itemIndex > -1) {
        cart.items.splice(itemIndex, 1);
        // Remove the item from the array
        await cart.save();
        return res.status(200).send({ message: "Item deleted", cart });
      } else {
        return res
          .status(404)
          .send({ message: "Item not found in cart", status: false });
      }
    } else {
      res.status(200).send({ status: false, message: "Cart is Empty" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

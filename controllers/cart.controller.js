import Cart from "../models/Cart.js";
import User from "../models/User.js";
import { messages } from "../constants.js";
export const addNewCartiItem = async (req, res) => {
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
        (item) => item.product.toString() === productId
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
      await cart.save();
    } else {
      cart = new Cart({ userId, items: [{ product: productId, quantity }] });
      console.log(cart);
      await cart.save();
    }
    res.status(200).send({ message: "ok" });
  } catch (error) {
    console.log("error", error.message);
    res.status(500).send({ message: error.message });
  }
};

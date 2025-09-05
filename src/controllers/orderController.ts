import { Request, Response } from "express";
import Order from "../model/orderModel";
import CartItem from "../model/cartModel";
import Product from "../model/productModel";

async function saveOrder(req: Request, res: Response) {
  try {
    const cartItems = await CartItem.find().populate('productId');
    if (cartItems.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    let totalPrice = 0;
    const orderItems = [];
    for (const cartItem of cartItems) {
      const product = cartItem.productId as any;
      if (!product) {
        return res.status(400).json({ success: false, message: "Invalid product in cart" });
      }
      const itemTotal = product.price * cartItem.quantity;
      totalPrice += itemTotal;
      orderItems.push({
        productId: cartItem.productId,
        quantity: cartItem.quantity
      });
    }

    const newOrder = await Order.create({ items: orderItems, totalPrice });
    await CartItem.deleteMany({});
    return res.status(201).json({ success: true, data: newOrder, message: "Order placed successfully" });
  } catch (error) {
    console.error("Error saving order:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

async function deleteOrder(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    return res.status(200).json({ success: true, message: "Order cancelled successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

async function getOrderById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate('items.productId');
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error("Error getting order:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

async function getAllOrders(req: Request, res: Response) {
  try {
    const orders = await Order.find().populate('items.productId');
    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error getting orders:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// 🔹 NEW FUNCTION: Update an order
async function updateOrder(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Items are required to update order" });
    }

    // Calculate total price by fetching product prices
    let totalPrice = 0;
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ success: false, message: `Product ${item.productId} not found` });
      }
      totalPrice += product.price * item.quantity;
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { items, totalPrice },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    return res.status(200).json({ success: true, data: updatedOrder, message: "Order updated successfully" });
  } catch (error) {
    console.error("Error updating order:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

const orderController = { saveOrder, deleteOrder, getOrderById, getAllOrders, updateOrder };
export default orderController;

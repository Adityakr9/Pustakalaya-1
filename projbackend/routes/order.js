const express = require("express");
const router = express.Router();

const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require("../controllers/authentication");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");

const { getOrderById, createOrder, getAllOrders, getOrderStatus, updateStatus } = require("../controllers/order");

// Params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

// Actual Routes

// create
router.post(
  "/order/create/:usedId",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);


// read
router.get("/order/all/:usedId", isSignedIn, isAuthenticated, isAdmin, getAllOrders);


// status of Order  (these routes are for Admin now, later we will define for User also to getOrderStatus)
router.get("/order/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus);
router.put("/order/:orderId/status/:userId", isSignedIn, isAuthenticated, isAdmin, updateStatus);
module.exports = router;

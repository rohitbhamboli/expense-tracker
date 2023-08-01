const express = require("express");
const {
  addIncome,
  getIncome,
  getExpense,
  addExpense,
  deleteExpense,
  deleteIncome,
} = require("../controllers/transactionController");
const authTransaction = require("../middlewares/authTransaction");

const router = express.Router();

//add expense
router.post("/add-expense", authTransaction, addExpense);
//get expense
router.get("/get-expense", authTransaction, getExpense);
//get income
router.get("/get-income", authTransaction, getIncome);
//add income
router.post("/add-income", authTransaction, addIncome);
//delete-income
router.delete("/delete-income/:id", authTransaction, deleteIncome);
//delete-expense
router.delete("/delete-expense/:id", authTransaction, deleteExpense);
module.exports = router;

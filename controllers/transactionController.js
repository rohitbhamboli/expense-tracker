const User = require("../models/userSchema");
const { Income, Expense } = require("../models/transactionModel");
// const Expense = require("../models/transactionModel");

//get expense
const getExpense = async (req, res) => {
  //   console.log(req.userId);
  const exp = await Expense.find({ user: req.userId });
  res.status(200).send(exp);
};

//get income
const getIncome = async (req, res) => {
  //   console.log(req.userId);
  const inc = await Income.find({ user: req.userId });
  res.status(200).send(inc);
};

//add expense
const addExpense = async (req, res) => {
  const { title, type, amount, date, description } = req.body;

  if (!title || !type || !amount || !date) {
    res.status(422).json({ error: "Please Fill the required fields" });
  }
  try {
    const newExpense = new Expense({
      user: req.userId,
      title,
      type,
      amount,
      date,
      description,
    });

    const isSaved = await newExpense.save();
    if (isSaved._id) {
      return res.status(200).json({ message: "expense added" });
    } else {
      return res.status(503).json({ error: "expense was not added" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "failed to add expense", errorMessage: error.message });
  }
};

//add income
const addIncome = async (req, res) => {
  const { title, type, amount, date, description } = req.body;

  if (!title || !type || !amount || !date) {
    res.status(422).json({ error: "Please Fill the required fields" });
  }
  try {
    const newIncome = new Income({
      user: req.userId,
      title,
      type,
      amount,
      date,
      description,
    });
    const isSaved = await newIncome.save();
    if (isSaved._id) {
      return res.status(200).json({ message: "income added" });
    } else {
      return res.status(503).json({ error: "income was not added" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "failed to add income", errorMessage: error.message });
  }
};

const deleteExpense = async (req, res) => {
  const expenseId = req.params.id;

  try {
    const deletedExpense = await Expense.findOneAndDelete({ _id: expenseId });
    if (!deletedExpense) {
      return res.status(404).json({ error: "Could not delete expense" });
    }
    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
const deleteIncome = async (req, res) => {
  const incomeId = req.params.id;
  try {
    const deletedIncome = await Income.findOneAndDelete({ _id: incomeId });
    if (!deletedIncome) {
      return res.status(404).json({ error: "Could not delete expense" });
    }
    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  getExpense,
  addExpense,
  getIncome,
  addIncome,
  deleteExpense,
  deleteIncome,
};

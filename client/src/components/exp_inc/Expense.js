import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import TransactionTable from "./TransactionTable";
import "./transactionForm.css";
import "../login_register/form.css";
import {
  addExpense,
  deleteExpense,
  getExpense,
} from "../../api/transactionApi";
import { useNavigate } from "react-router-dom";
import Spinner from "../spinner/Spinner";

const Expense = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [allExpenses, setAllExpenses] = useState([]);
  const [data, setData] = useState({
    title: "",
    type: "",
    date: "",
    amount: "",
    description: "",
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const expenseData = await addExpense(data);
      if (expenseData.ok) {
        setLoading(false);
      }
    } catch (error) {
      navigate("/login");
      console.log(error);
    } finally {
      setLoading(false);
    }
    setData({
      title: "",
      type: "",
      date: "",
      amount: "",
      description: "",
    });
  };

  //transaction data
  useEffect(() => {
    getExpense()
      .then((res) => {
        if (res.status === 200 || res.status === 304) {
          setLoading(false);
          setAllExpenses(res.data);
        } else {
          throw new Error(res.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loading]);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await deleteExpense(id);
      if (response.ok) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />
      {loading ? (
        <Spinner />
      ) : (
        <div className="container">
          <div className="transaction-form">
            <h2 className="form-title">Add Expense</h2>
            <form method="POST" onSubmit={handleSubmit}>
              <div className="form-group">
                <i className="fa-solid fa-book"></i>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={data.title || ""}
                  placeholder="Expense Title"
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="form-group">
                <i className="fa-solid fa-coins"></i>
                <select
                  name="type"
                  id="type"
                  value={data.type}
                  onChange={handleChange}
                >
                  <option default>Type</option>
                  <option value="Rent">Rent</option>
                  <option value="Electricity">Electricity</option>
                  <option value="Internet">Internet</option>
                  <option value="Phone">Phone</option>
                  <option value="Investment">Investment</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Food">Food</option>
                  <option value="Travelling">Travelling</option>
                  <option value="Vehicle">Vehicle</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <i className="fa-solid fa-indian-rupee-sign"></i>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={data.amount || ""}
                  placeholder="Amount"
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="form-group">
                <i className="fa-solid fa-calendar-days"></i>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={data.date || ""}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="form-group">
                <i className="fa-solid fa-comment"></i>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={data.description || ""}
                  placeholder="Description"
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              <button className="form-button" type="submit">
                <i className="fa-solid fa-plus"></i>Add Expense
              </button>
            </form>
          </div>
          <TransactionTable
            data={allExpenses}
            onDelete={handleDelete}
            itemsPerPage={5}
          />
        </div>
      )}
    </>
  );
};

export default Expense;

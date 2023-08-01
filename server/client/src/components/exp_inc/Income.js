import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import TransactionTable from "./TransactionTable";
import { addIncome, deleteIncome, getIncome } from "../../api/transactionApi";
import { useNavigate } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import "./transactionForm.css";
import "../login_register/form.css";

const Income = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [allIncomes, setAllIncomes] = useState([]);
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
      const incomeData = await addIncome(data);
      if (incomeData.ok) {
        setLoading(false);
      }
    } catch (error) {
      navigate("/login");
      setLoading(false);
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

  useEffect(() => {
    getIncome()
      .then((res) => {
        if (res.status === 200 || res.status === 304) {
          setAllIncomes(res.data);
        } else {
          throw new Error(res.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loading]);

  //transaction table page data

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await deleteIncome(id);
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
            <h2 className="form-title">Add Income</h2>
            <form method="POST" onSubmit={handleSubmit}>
              <div className="form-group">
                <i className="fa-solid fa-book"></i>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={data.title || ""}
                  placeholder="Income Title"
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
                  <option value="Salary">Salary</option>
                  <option value="Stocks">Stocks</option>
                  <option value="Rent">Rent</option>
                  <option value="Interest">Interest</option>
                  <option value="Crypto">Crypto</option>
                  <option value="Side">Side Income</option>
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
                <i className="fa-solid fa-plus"></i> Add Income
              </button>
            </form>
          </div>
          {/* <div className="transaction-data"> */}
          <TransactionTable
            data={allIncomes}
            onDelete={handleDelete}
            itemsPerPage={5}
          />
          {/* </div> */}
        </div>
      )}
    </>
  );
};

export default Income;

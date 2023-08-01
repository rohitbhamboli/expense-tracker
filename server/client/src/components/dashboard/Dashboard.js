import React, { useEffect, useState, useContext } from "react";
import Navbar from "../navbar/Navbar";
import Home from "./Home";
import { getUser } from "../../api/userApi";
import "./dashboard.css";
import { getExpense, getIncome } from "../../api/transactionApi";
import { UserContext } from "../../App";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const { state } = useContext(UserContext);
  const [userData, setUserData] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [pieData, setPieData] = useState({
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Total of ",
        data: [0, 0],
        backgroundColor: ["green", "red"],
        borderWidth: 0,
      },
    ],
  });

  //effect for get data
  useEffect(() => {
    const renderHome = async () => {
      try {
        const userResponse = await getUser();
        setUserData(userResponse.data);
        const incomeResponse = await getIncome();
        setIncomeData(incomeResponse.data);
        const expenseResponse = await getExpense();
        setExpenseData(expenseResponse.data);
        setIsLogin(true);
      } catch (error) {
        setIsLogin(false);
        console.error("Error fetching data:", error);
      }
    };

    renderHome();
  }, [state]);

  //effect for process data
  useEffect(() => {
    // Calculate total income
    const calculateTotalIncome = () => {
      const total = incomeData.reduce((sum, item) => sum + item.amount, 0);
      setTotalIncome(total);
    };

    // Calculate total expense
    const calculateTotalExpense = () => {
      const total = expenseData.reduce((sum, item) => sum + item.amount, 0);
      setTotalExpense(total);
    };

    // Calculate total savings
    const calculateTotalSavings = () => {
      const total = totalIncome - totalExpense;
      setTotalSavings(total);
    };
    //add data to chart state
    const addChartData = () => {
      setPieData((prevState) => ({
        ...prevState,
        datasets: [
          {
            ...prevState.datasets[0],
            data: [totalIncome, totalExpense],
          },
        ],
      }));
    };

    calculateTotalExpense();
    calculateTotalIncome();
    calculateTotalSavings();
    addChartData();
    // eslint-disable-next-line
  }, [incomeData, expenseData, totalExpense, totalIncome, totalSavings]);

  return (
    <>
      <Navbar />
      {isLogin ? (
        <div className="dashboard-container">
          <div className="card card-graph">
            <Pie className="chart" data={pieData} />
          </div>
          <div className="card card-2">
            <div className="total">
              <p>Hi, {userData.name} your current balance is</p>
              <h1>
                <span className={totalSavings > 0 ? "green" : "red"}>
                  <i className="fa-solid fa-indian-rupee-sign"></i>
                  {totalSavings}
                </span>
              </h1>
            </div>
            <div className="transaction">
              <div className="income">
                Earned
                <span className="green">
                  <i className="fa-solid fa-indian-rupee-sign"></i>
                  {totalIncome}
                </span>
              </div>
              <div className="expense">
                Spent
                <span className="red">
                  <i className="fa-solid fa-indian-rupee-sign"></i>
                  {totalExpense}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Home />
      )}
    </>
  );
};

export default Dashboard;

import React from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import "./Form.css";

// Register the required components
ChartJS.register(ArcElement, Tooltip, Legend);

function Addexpense(){
    // variable declaration
    const [expense,SetExpense]=useState([]);
    const [description,setDescription]=useState("");
    const [amount,setAmount]=useState(0);
    const [date,setDate]=useState(new Date().toISOString().split('T')[0]);
    const [category,setCategory]=useState("Food");
    const [count,setCount]=useState(0);
    
    // function declaration
    function handledescription(e){
        setDescription(e.target.value)
    }
    function handleamount(e){
        setAmount(e.target.value)
    }
    function handledate(e){
        setDate(e.target.value);
    }
    function handleCategory(e){
        setCategory(e.target.value);
    }
    function add(){
        console.log("Add function called");
        const newexpense={description:description,amount:amount,date:date,category:category};
        console.log("New expense:", newexpense);
        SetExpense([...expense,newexpense]);
        setCount(count+1);
        toast.success('Successfully Added', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }

    function calculateTotal() {
        return expense.reduce((total, item) => total + parseFloat(item.amount), 0);
    }

    const data = {
        labels: ["Food", "Transport", "Entertainment", "Health", "Shopping", "Other"],
        datasets: [
            {
                label: "Expense Distribution",
                data: expense.map(item => item.amount),
                backgroundColor: [
                    "#FF6384", // Food
                    "#36A2EB", // Transport
                    "#FFCE56", // Entertainment
                    "#4BC0C0", // Health
                    "#9966FF", // Shopping
                    "#FF9F40", // Other
                ],
                hoverOffset: 4,
            },
        ],
    };
    
    return(
        <>
        <div className="Container">
            <div>Total Expense: {calculateTotal()}</div>
            <div>Number of expenses:{count}</div>
            <input type="text" placeholder="Enter Description" value={description} onChange={handledescription}></input>
            <br/>
            <input type="number" placeholder="Enter Amount" value={amount} onChange={handleamount}></input>
            <br/>
            <input type="date" value={date} onChange={handledate}></input>
            <br/>
            <select value={category} onChange={handleCategory}>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Health">Health</option>
                <option value="Shopping">Shopping</option>
                <option value="Other">Other</option>
            </select>
            <button onClick={add}>button</button>
            <ToastContainer /> 
        </div>
        <div className="information">
                <div className="expense-list">
                {expense.map((expen,index)=><div className="items" key={index}><p>{expen.description}</p> 
                <p>{expen.amount}</p> 
                <p>{expen.date}</p>
                <p>{expen.category}</p>
                </div>)}
                </div>
            </div>
            <Pie data={data} />
        </>
    );
}
export default Addexpense;
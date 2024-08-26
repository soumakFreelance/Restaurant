import { Button } from '@mui/material';
import { useCart, useDishpatchKart } from '../Components/ContextReducer';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';

export default function Cart() {
  let data = useCart();
  let dispatch = useDishpatchKart();

  if (data.length === 0) {
    return (
      <div className='cartEmptyContainer'>
        <div className='cartEmpty'>The Cart is Empty</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    try {
      let userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        console.error("User email not found in localStorage");
        return;
      }

      let response = await fetch(
        // "http://localhost:5000/api/orderData"
        `${window.location.origin}/api/orderData`
        , {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let result = await response.json();
      console.log("Order response:", result);

      if (response.status === 200) {
        dispatch({ type: "DROP" });
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Option</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((food, index) => (
            <tr key={index}>
              <th scope='row'>{index + 1}</th>
              <td>{food.name}</td>
              <td>{food.qty}</td>
              <td>{food.size}</td>
              <td>{food.price}</td>
              <td>
                <button type="button" className='btn p-0'>
                  <DeleteIcon onClick={() => { dispatch({ type: "REMOVE", index: index }) }} color='error' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='cartTotalPrice'>
        <h1 className='fs-2'>Total Price: {totalPrice}/-</h1>
      </div>
      <Button className="checkout-button" color='success' variant='contained' size='large' onClick={handleCheckOut}>
        Check out
      </Button>
    </div>
  );
}


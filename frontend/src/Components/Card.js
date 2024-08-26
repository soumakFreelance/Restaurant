import React, { useEffect, useRef, useState } from 'react';
import Card from '@mui/material/Card';
import { useDishpatchKart, useCart } from './ContextReducer';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';

export default function MediaCard(props) {

  const dispatch = useDishpatchKart();
  const data = useCart();
  const priceRef = useRef();
  const options = props.options || {};
  const sizeOption = Object.keys(options);
  const foodItem = props.foodItem || {};
  const picture = foodItem.img || '';
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  // const handleAddtoKart = async() => {

  //   let food = []

  //   for(const item of data) {

  //     if(item.id === props.foodItem._id) {
  //       food = item;

  //       break;
  //     }
  //   }

  //   if(food !== []) {
  //     if(food.size=== size)
  //     {
  //       await dispatch({type: "UPDATE",id: props.foodItem._id,price: finalPrice,qty:qty})
  //     }
  //     return
  //   }

  //   else if (food.size !== size) {
  //   await dispatch({type:"ADD",id:foodItem._id,name: foodItem.name,price: finalPrice,qty: qty,size: size})
  //   // console.log(data);
  //   }
  // }

  const handleAddtoKart = async () => {
    let food = null;

    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }

    if (food) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
        return
      }

      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
        return
      }
      return
    }
    await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
  };

  const finalPrice = qty * parseInt(options[size]);
  useEffect(
    () => {
      setSize(priceRef.current.value)
    }, []
  )

  return (
    <Card sx={{ maxWidth: 345, margin: 3, border: "2px solid black", background: " #425047" }}>
      <CardMedia
        sx={{ height: 240 }}
        image={picture || 'https://via.placeholder.com/240'}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" className='foodName'>
          {foodItem.name}
        </Typography>
        <div className='container w-100'>
          <select className='selectFood rounded' onChange={(e) => setQty(e.target.value)}>
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              )
            })}
          </select>
          <select className='selectPlate' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
            {sizeOption.map((data) => {
              return <option key={data} value={data}>{data}</option>
            })}
          </select>
          <div className='totalPrice fs-5 total m-3'>
            ₹{finalPrice}/-
          </div>
        </div>
      </CardContent>
      <hr />
      <CardActions className='btnAdd'>
        <Button size="medium" color='success' variant='contained' onClick={handleAddtoKart}>Add to Kart</Button>
      </CardActions>

    </Card>
  );
}

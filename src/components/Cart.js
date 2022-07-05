import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@mui/material";

function Cart() {
  const menuList = useSelector((state) => state.orders);

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={6} md={4}>
          Name
        </Grid>
        <Grid item xs={6} md={2}>
          Price
        </Grid>
        <Grid item xs={6} md={2}>
          Quantity
        </Grid>
        <Grid item xs={6} md={4}>
          Total
        </Grid>
        {menuList.map((food) => {
          if (10 - food.quantity >= 1) {
            return (
              <>
                <Grid item xs={6} md={4}>
                  {food.name}
                </Grid>
                <Grid item xs={6} md={2}>
                  {food.price}€
                </Grid>
                <Grid item xs={6} md={2}>
                  {10 - food.quantity}
                </Grid>
                <Grid item xs={6} md={4}>
                  {food.price * 1 * (10 - food.quantity)} €
                </Grid>
              </>
            );
          } else return "";
        })}
      </Grid>
    </>
  );
}

export default Cart;

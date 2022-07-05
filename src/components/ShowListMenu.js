import FoodCard from "./FoodCard";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import { Typography } from "@mui/material";
import Cart from "./Cart";

function ShowListMenu() {
  const menuList = useSelector((state) => state.orders);
  return (
    <>
      <AppBar position="static" color="error">
        <Typography variant="h4" component="div" align={"center"} m={2}>
          Order your favourite food
        </Typography>
      </AppBar>
      <Box m={4}></Box>
      <Container>
        <Stack direction="row" spacing={2}>
          {menuList.map((food) => {
            return (
              <FoodCard
                key={food.id}
                idArray={food.id}
                name={food.name}
                quantity={food.quantity}
                image={food.image}
                price={food.price}
              />
            );
          })}
        </Stack>
      </Container>
      <Cart />
    </>
  );
}

export default ShowListMenu;

import FoodCard from "./FoodCard";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import { Typography } from "@mui/material";
import Cart from "./Cart";
import { Button } from "@mui/material";

function ShowListMenu() {
  const menuList = useSelector((state) => state.orders);

  const [carouselLeft, setCarouselLeft] = useState(0);
  const [carouselRight, setCarouselRight] = useState(4);
  const menuVisibile = menuList.filter((food) => food.id >= carouselLeft && food.id < carouselRight);

  function left() {
    if (carouselLeft === 0) {
      return;
    }
    setCarouselLeft(carouselLeft - 1);
    setCarouselRight(carouselRight - 1);
  }

  function right() {
    if (carouselLeft === menuList.length - 4) {
      return;
    }
    setCarouselLeft(carouselLeft + 1);
    setCarouselRight(carouselRight + 1);
  }
  return (
    <>
      <AppBar position="static" color="error">
        <Typography variant="h4" component="div" align={"center"} m={2}>
          Order your favourite food
        </Typography>
      </AppBar>
      <Box m={4}></Box>
      <Stack direction="row">
        <Button onClick={() => left()} color="error">
          -
        </Button>
        <Container>
          <Stack direction="row" spacing={2}>
            {menuVisibile.map((food) => {
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
        <Button onClick={() => right()} color="error">
          +
        </Button>
      </Stack>
      <Cart />
    </>
  );
}

export default ShowListMenu;

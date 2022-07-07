import FoodCard from "./FoodCard";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import { Typography } from "@mui/material";
import Cart from "./Cart";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    right: -5,
    top: 0,
  },
}));

function ShowListMenu() {
  const menuList = useSelector((state) => state.orders);
  const navigate = useNavigate();

  const [badge, setBadge] = useState(0);

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

  const logout = () => {
    localStorage.removeItem("logged");
    navigate("");
  };

  const itemInCart = useEffect(() => {
    setBadge(menuList.filter((food) => food.ordered > 0).length);
  }, [menuList]);

  return (
    <>
      <AppBar position="static" color="error">
        <Typography variant="h4" component="div" align={"center"} m={2}>
          Order your favourite food
        </Typography>
      </AppBar>
      <Box m={4} display="flex" justifyContent="flex-end">
        <Link to={"/orders"}>
          <Button sx={{ margin: "8px" }} variant="contained" color="error">
            Orders
          </Button>
        </Link>
        {localStorage.getItem("logged") ? (
          <Button sx={{ margin: "8px" }} variant="contained" color="error" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Button sx={{ margin: "8px" }} variant="contained" color="error" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={badge} color="success">
            <ShoppingCartIcon color="error" />
          </StyledBadge>
        </IconButton>
      </Box>
      <Stack direction="row">
        <Button onClick={() => left()} color="error">
          <Typography variant="h4">-</Typography>
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
                  itemInCart={itemInCart}
                />
              );
            })}
          </Stack>
        </Container>
        <Button onClick={() => right()} color="error">
          <Typography variant="h4">+</Typography>
        </Button>
      </Stack>
      <Cart setBadge={setBadge} />
    </>
  );
}

export default ShowListMenu;

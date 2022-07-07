import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useSelector, useDispatch } from "react-redux";
import { order, removeFromOrder } from "../features/counter/counterSlice";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

function FoodCard({ idArray, quantity, name, image, price, itemInCart }) {
  const [increment, setIncrement] = useState(1);
  const dispatch = useDispatch();

  function add() {
    dispatch(removeFromOrder([idArray, increment]));
    itemInCart();
  }

  function remove() {
    dispatch(order([idArray, increment]));
    itemInCart();
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={image} alt="cake" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ height: "45px" }}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={3}>
            We have {quantity * 1} remaining left
          </Typography>
          <Typography variant="h6" align="right">
            {price} €
          </Typography>
        </CardContent>
      </CardActionArea>
      <Stack direction="row" spacing={1} m={1}>
        <Button variant="outlined" color="error" onClick={() => add()}>
          <RemoveCircleOutlineIcon />
        </Button>
        <TextField
          color="error"
          id="quantity"
          label="Quantity"
          variant="outlined"
          value={increment}
          onChange={(e) => setIncrement(e.target.value * 1)}
        />
        <Button variant="outlined" color="error" onClick={() => remove()}>
          <AddCircleOutlineIcon />
        </Button>
      </Stack>
    </Card>
  );
}

export default FoodCard;

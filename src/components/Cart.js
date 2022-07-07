import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { Button, Box, Alert } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { pay } from "../features/counter/moneySlice";
import { resetCart } from "../features/counter/counterSlice";
import ModalOpen from "./ModalOpen";
import { useNavigate } from "react-router-dom";
import { newOrder } from "../features/counter/orderSlice";

function Cart({ setBadge }) {
  const menuList = useSelector((state) => state.orders);
  const money = useSelector((state) => state.money);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = useCallback(() => {
    return menuList.map(({ price, ordered }) => price * ordered).reduce((sum, i) => sum + i, 0);
  }, [menuList]);
  const [openModal, setOpenModal] = useState(false);

  const ordine = useCallback(() => {
    return menuList.filter((food) => {
      if (food.ordered > 0) return food;
      else return "";
    });
  }, [menuList]);

  function clickToPay() {
    if (money.money - subtotal() >= 0) {
      ordine();
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = today.getMonth() + 1;
      const dd = today.getDate();
      dispatch(newOrder([subtotal(), ordine(), `${dd}-${mm}-${yyyy}`]));
      dispatch(resetCart());
    }
    dispatch(pay(subtotal()));
    setOpenModal(false);
  }

  function checkIfLogged() {
    if (localStorage.getItem("logged")) {
      if (subtotal() <= 0) {
        return;
      }
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  }

  return (
    <Container sx={{ marginTop: "25px", marginBottom: "25px" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuList.map((food) => {
              if (food.ordered > 0) {
                return (
                  <TableRow key={food.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {food.name}
                    </TableCell>
                    <TableCell align="right">{food.ordered * 1}</TableCell>
                    <TableCell align="right">{food.price}€</TableCell>
                    <TableCell align="right">{food.ordered * food.price}€</TableCell>
                  </TableRow>
                );
              } else return "";
            })}

            <TableRow>
              <TableCell>Total to pay</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">{subtotal()}€</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box m={2} display="flex" justifyContent="flex-end" alignItems="flex-end">
        <Button variant="contained" color={"success"} endIcon={<SendIcon />} onClick={() => checkIfLogged()}>
          Order
        </Button>
      </Box>
      <ModalOpen
        openModal={openModal}
        setOpenModal={setOpenModal}
        clickToPay={clickToPay}
        subtotal={subtotal}
        setBadge={setBadge}
      />
      <Box m={2}>You have {money.money}€ left</Box>
      {money.error === 1 ? (
        <Alert variant="outlined" severity="error">
          Not enougth money!
        </Alert>
      ) : (
        money.error === -1 && (
          <Alert variant="outlined" severity="success">
            Order completed!
          </Alert>
        )
      )}
    </Container>
  );
}

export default Cart;

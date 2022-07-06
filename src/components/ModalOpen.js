import React from "react";
import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ModalOpen({ openModal, setOpenModal, clickToPay, subtotal }) {
  const menuList = useSelector((state) => state.orders);

  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Cart Review:
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 200 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">SubTotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menuList.map((food) => {
                if (food.ordered > 0) {
                  return (
                    <TableRow key={food.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell align="center">{food.ordered} x </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {food.name}
                      </TableCell>
                      <TableCell align="center">{food.price}€</TableCell>
                      <TableCell align="center">{food.ordered * food.price}€</TableCell>
                    </TableRow>
                  );
                } else return "";
              })}

              <TableRow>
                <TableCell align="center">Total</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="center">{subtotal()}€</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box m={2} display="flex" justifyContent="flex-end" alignItems="flex-end">
          <Button variant="contained" color={"success"} endIcon={<SendIcon />} onClick={() => clickToPay()}>
            Pay
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ModalOpen;

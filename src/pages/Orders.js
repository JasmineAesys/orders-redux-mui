import React from "react";
import { useSelector } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container } from "@mui/material";
import { AppBar } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

function Orders() {
  const getOrders = useSelector((state) => state.successfullOrders);
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="static" color="error">
        <Typography variant="h4" component="div" align={"center"} m={2}>
          Recently Orders
        </Typography>
      </AppBar>
      <Container sx={{ marginTop: "25px", marginBottom: "25px" }}>
        {getOrders.map((order, i) => {
          return (
            <Accordion key={i}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>
                  {order.date} - Order #{i} - Total: {order.totalOrder}€
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {order.itemList.map((singleFood, j) => {
                  return (
                    <Grid container key={j}>
                      <Grid item xs={0.3}>
                        {singleFood.quantity}
                      </Grid>
                      <Grid item xs={0.2}>
                        x
                      </Grid>
                      <Grid item xs={0.3}>
                        {singleFood.price}
                      </Grid>
                      <Grid item xs={0.2}>
                        €
                      </Grid>
                      <Grid item xs={0.4}>
                        ---
                      </Grid>
                      <Grid item xs={4}>
                        {singleFood.name}
                      </Grid>
                    </Grid>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          );
        })}
        <Box m={2} display="flex" justifyContent="flex-end" alignItems="flex-end">
          <Button variant="contained" color="error" onClick={() => navigate(-1)}>
            Back to Menu
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default Orders;

import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Card, Typography, Button, Modal, CardContent } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Calender from '../Components/CommonComponents/Calender'
import Footer from "../Components/CommonComponents/Footer"
import EditIcon from '@material-ui/icons/Edit';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderData, pushOrder, orderDetailAciton } from '../Store/Actions/auth'
import Alert from '@material-ui/lab/Alert';
import CardActions from '@material-ui/core/CardActions';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import PublishIcon from '@material-ui/icons/Publish';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify'; const columns = [
  { id: 'name', label: 'Order ID', minWidth: 170 },
  { id: 'code', label: 'Customer', minWidth: 170 },
  {
    id: 'population',
    label: 'Date',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Status',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'action',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    [theme.breakpoints.down("sm")]: {
      maxWidth: '324px',
    },

  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  container: {
    maxHeight: 440,
  },
  heading: {
    padding: '15px 25px',
    borderBottom: '1px solid rgba(0,0,0,.1)',
    display: 'block',
    width: '100%',
    textAlign: 'left',
    fontWeight: 600,
    fontSize: 18,
    marginBottom: 30,
  },
  alertbox: {
    marginBottom: '40px'
  }

}));
const useStyles1 = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function StickyHeadTable() {
  const orderDetail = useSelector((state) => state.auth.orderDetail.Result)
  const [order, setOrder] = useState([{ "job_pickup_name": "", }])
  const [active2, setActive2] = useState(true)

  useEffect(() => {
    setOrder(orderDetail)
    setActive2(false)
    console.log(order);

  }, [orderDetail])
  const [open, setOpen] = React.useState(false);
  const classes1 = useStyles1();



  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch()
  useEffect(() => {
    console.log("check");
    dispatch(getOrderData())
  }, [])
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [active, setActive] = React.useState(true);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const orderData = useSelector((state) => state.auth.orderData.Result)
  useEffect(() => {
    if (orderData.length > 0) {
      setData(orderData)
      setActive(false)
    }
  }, [orderData])
  const rows = [
    createData('data[0].app_id', 'Adam Denisov', "04/28/2018", "Delivered",),
    createData('23412355-2', 'Adam Denisov', "04/28/2018", "Assigned",),
    createData('23412355-2', 'Chioke Okonkwo', "04/28/2018", "Assigned",),
    createData('23412355-2', 'Iruka Akuchi', "04/28/2018", "Delivered",),
  ];
  console.log(rows);


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [value, onChange] = useState(new Date());
  const handlepushOrder = (id) => {
    console.log("check");
    dispatch(pushOrder(id))
    dispatch(getOrderData())

  }
  const handleviewDetails = (id) => {
    setOpen(true);
    //Here we are calling the action and passing the data.
    dispatch(orderDetailAciton(id))
  }

  const iconChange = (status, id) => {
    if (status === 2) {
      return (<Tooltip disableFocusListener title="View Details">
        <FormatAlignJustifyIcon onClick={() => { handleviewDetails(id) }} style={{ color: "gray" }} />
      </Tooltip>)
    }
    else {
      return (<Tooltip disableFocusListener title="Push This Order To Tookan">
        <PublishIcon onClick={() => { handlepushOrder(id) }} style={{ color: "gray" }} />
      </Tooltip>)
    }

  }

  const statusChange = (status) => {
    if (status === 2) {
      return (
        " Job Created"
      )
    }
    else {
      return ("Job Pendding")
    }

  }
  const openLink = (a) => {
    window.open(a);
  }
  return (<>
    <div className={classes.alertbox}> <Alert severity="info">This page helps to view all the orders and initiate the pending ones.</Alert></div>
    <div style={{ marginBottom: "-15%" }}>
      <div >
        <Paper className={classes.root} >
          <Typography className={classes.heading} style={{ marginBottom: '0' }}>
            Latest Orders
          </Typography>
          <TableContainer className={classes.container} >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell

                  >
                    Order ID
                  </TableCell> <TableCell

                  >
                    Customer
                  </TableCell> <TableCell

                  >
                    Date
                  </TableCell> <TableCell

                  >
                    Status
                  </TableCell>
                  <TableCell

                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              {active ? (
                <TableRow >
                  <TableCell colSpan={5} style={{ textAlign: 'center' }}><CircularProgress /></TableCell>
                </TableRow>

              ) : (
                <TableBody>
                  {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>

                        <TableCell >

                          {row.order_id}
                        </TableCell>
                        <TableCell >

                          {row.shipping_name}
                        </TableCell>
                        <TableCell >

                          {row.created_on}
                        </TableCell>
                        <TableCell >

                          <React.Fragment style={{ marginLeft: "10%" }}>{statusChange(row.status)}</React.Fragment>
                        </TableCell>
                        <TableCell >
                          <Tooltip disableFocusListener title="More Option">
                            <MoreVertOutlinedIcon style={{ color: "gray" }} />
                          </Tooltip>
                          <Tooltip disableFocusListener title="Edit">
                            <EditIcon style={{ color: "gray" }} />
                          </Tooltip>

                          <React.Fragment style={{ marginLeft: "10%" }}>{iconChange(row.status, row.order_id)}</React.Fragment>

                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              )}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />


        </Paper>
      </div>
      <Typography style={{ margin: "5%", marginBottom: "25px", marginLeft: '0', textAlign: "left" }} gutterBottom variant="h5" component="h2">
        Click on the calendar to see scheduled orders


      </Typography>
      <TableContainer style={{ maxWidth: "1000px", }}>
        <Calender />

      </TableContainer>


      <Footer />
      <br />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Card className={classes1.root} style={{ width: "50%", marginLeft: "25%", marginTop: "20%" }}>

            {(orderDetail.length) ? (

              <div>
                <CardActions style={{ textAlign: 'right', display: 'flow-root' }}>
                  <CloseIcon onClick={handleClose} />
                </CardActions>

                <CardContent>

                  <Typography component="h2" style={{ marginBottom: '10px' }}>
                    <b> Name:</b> {orderDetail[0].job_pickup_name}

                  </Typography>
                  <Typography component="h2" style={{ marginBottom: '10px' }}>
                    <b>Address:</b> {orderDetail[0].job_pickup_address}

                  </Typography>
                  <Typography component="h2" style={{ marginBottom: '10px' }}>
                    <b> Message:</b> {orderDetail[0].message}

                  </Typography>
                  <Typography component="h2">
                    <b> Track Order:</b> <Button style={{ backgroundColor: "#84C5A3", marginLeft: '10px' }} onClick={() => { openLink(orderDetail[0].tracking_link) }}> Track</Button>

                  </Typography>

                </CardContent>

              </div>
            ) : (
              <TableContainer className={classes.container} >
                <Table stickyHeader aria-label="sticky table">
                  <TableRow >
                    <TableCell colSpan={5} style={{ textAlign: 'center' }}><CircularProgress /></TableCell>
                  </TableRow>
                </Table>
              </TableContainer>
            )}

          </Card>
        </Fade>
      </Modal>
    </div>
  </>
  );
}

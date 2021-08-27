import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Button } from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';

import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 350,
    width: 250,
  },
  control: {
    padding: theme.spacing(2),
  },

  alertbox: {
    marginBottom: '40px'
  }
}));


export default function SpacingGrid() {

  const history = useHistory();

  const handleSubscribe = () => {
    history.push("/subscribe")
  }


  const [active, setActive] = useState(true);

  const Sub = JSON.parse(localStorage.getItem('subscribe'))
  const classes = useStyles();

  let planCheck = () => {
    console.log(Sub);
    console.log(Sub != null, Sub.data.plan_id);
    if (Sub != null) {
      if (Sub.data.plan_id === "1") {
        return (
          <div className={classes.alertbox}> <Alert severity="info">Congrats, you Subscribed to STARTER Plan. Click on Upgrade Plan Button to upgrade.</Alert></div>
        )
      }
      if (Sub.data.plan_id === "2") {
        return (
          <div className={classes.alertbox}> <Alert severity="info">Congrats, you Subscribed to PROFESSIONAL Plan. Click on Upgrade Plan Button to upgrade.</Alert></div>
        )

      }
      if (Sub.data.plan_id === "3") {

        return (<div className={classes.alertbox}> <Alert severity="info">Congrats, you Subscribed to E-COMMERCE Plan. Click on Upgrade Plan Button to upgrade.</Alert></div>)
      }
    }
  }


  useEffect(() => {
    if (Sub !== null) {
      console.log("setactive");
      setActive(false)
    }
  }, [Sub])

  return (
    <div style={{ margin: "auto", maxWidth: "700px" }}>
      {active ? (

        <div>
          <div className={classes.alertbox}> <Alert severity="info">Congrats, you have successfully installed our app. Please click on Subscribe Plan button to subscribe to our plans.</Alert></div>
          {/* <Alert severity="warning">Congrats, you have successfully install our app, please click subscribe plan button to subscribe a plan to use this app.</Alert> */}
          <Button style={{ backgroundColor: "#84C5A3", marginTop: "13px" }} onClick={handleSubscribe}>Subscribe Plan</Button>

        </div>
      ) : (
        <div>

          <React.Fragment style={{ marginLeft: "10%" }}>{planCheck()}</React.Fragment>

          <Button style={{ backgroundColor: "#84C5A3", marginTop: "13px" }} onClick={handleSubscribe}>Upgrade Plan</Button>

        </div>
      )}

    </div>);
}

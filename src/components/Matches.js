import React,  { Fragment, useState } from 'react'
import { Card, CardContent, Typography, CardActions, Button, Grid, Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions } from '@material-ui/core';
import  { getMatchData } from "../api/Api"

const Matches=({match})=> {

    const [detail,setDetail] = useState({});
    const [open,setOpen] = useState(false);

    const handleClick = (id) =>{
        getMatchData(id).then(
            (data)=> { setDetail(data);
                handleOpen();
            })
        .catch((error)=>console.log(error))
    }

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const getDialog=()=> (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="alert-dialog-title">{"Match Detail..."}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Typography>{detail.stat}</Typography>
                    <Typography>
                        Match <span style={{ fontStyle:"italic", fontWeight: "bold" }}>
                            {detail.matchStarted ? "Started" : "Stll not started"}{""}
                        </span>
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )

    const getMatch=()=>(
            <Card style={{marginTop :15}}>
                <CardContent>
                    <Grid container justify="center" alignItems="center" spacing={4}>
                        <Grid item>
                            <Typography variant="h5">
                            {match["team-1"]}
                            </Typography>
                        </Grid>
                        <Grid item>
                        <img style={{width:85}} src="img/vs.png" alt="" />
                        </Grid>
                        <Grid item>
                        <Typography  variant="h5">
                            {match["team-2"]}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Grid container justify="center" spacing={3}>
                    <Button onClick={() => {
                        handleClick(match.unique_id)
                    }} variant="contained" color="primary">Show Details</Button>
                    <Button style={{marginLeft : 5}} variant="contained" color="primary"> Start Time {new Date(match.dateTimeGMT).toLocaleString()}</Button>
                    </Grid>
                </CardActions>
            </Card>
    )

    return <Fragment>
        {getMatch()}
        {getDialog()}
    </Fragment>
}

export default Matches
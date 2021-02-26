import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DisplayPost from "../helper/DisplayPosts";
import { UserContext } from "../provider/UserProvider";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import "../css/Subreddit.css"

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
      borderRadius: "5em"
    },
  }));

const Subreddit = () => {
    const [getDetails, setGetDetails] = useState([]);
    const { id } = useParams();
    const { userID } = useContext(UserContext);
    const [subscribed, setSubscribed] = useState(false);
    const classes = useStyles();
    
    useEffect(() => {
        const isUserSubscribed = async () => {
            try {
                let res = await axios.get(`http://localhost:3001/subscriptions/usersubbed/${userID}/${id}`);
                debugger
                if(res.data.payload.length > 0) {
                    setSubscribed(true)
                    //payload is returning with an empty array also userID not showing up, edit id for sub
                }
            } catch (error) {
                console.log(error)
            }
        };

        const fetchDetails = async () => {
            try {
                let res = await axios.get(`http://localhost:3001/subreddits/${id}`);
                setGetDetails(res.data.payload);
            } catch (error) {
                console.log(error)
            }
        }; 
        fetchDetails();
        // isUserSubscribed();
    }, [id])

    return (
        <div className="subContainer">
            <div className="subInfo">
                <div className="subHeader">
                    <h1 className="subTitle">{getDetails.subname}</h1>
                    <p className="subRoute">/r/{getDetails.subname}</p>
                </div>
                { subscribed ? 
                <Button className={classes.root} variant="contained" color='secondary' type="submit" size={'small'}>Leave</Button>
                :<Button className={classes.root} variant="contained" color='secondary' type="submit" size={'small'}>Join</Button>
                }
            </div>
            <div className="subFeed">
                <DisplayPost choosen={getDetails.id}/>
            </div>
            
        </div>
    )
}

export default Subreddit
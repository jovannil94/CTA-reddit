import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "../css/Navbar.css";
// import logo from "../images/Reddit-Logo-Horizontal.png";
import axios from "axios";

const NavBar = () => {
    const [subreddits, setSubreddits] = useState([]);
    const history = useHistory();
    const subredditRedirect = (selected) => history.push(`/subreddit/${selected}`);
    const homeRedirect = () => history.push(`/`);
    
    const fetchSubreddits = async () => {
        try {
            let res = await axios.get(`http://localhost:3001/subreddits/`)
            setSubreddits(res.data.payload)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        if(e.currentTarget.value === "Home") {
            homeRedirect();
        } else {
            let sub = e.currentTarget.value.slice(2);
            subredditRedirect(sub)
        }
    }

    useEffect(() => {
        fetchSubreddits()
    }, []);

    return(
        <nav className="Navbar">
            {/* <img src={logo} className="Logo" alt="" />
                <SubredditIndex subreddits={subreddits}/> */}
            <select onChange={handleChange}>
                <option value="Home">Home</option>
                {subreddits.map((subreddit) => 
                    <option key={subreddit.id} value={ subreddit.id, subreddit.name }>/r{subreddit.subname}</option>
                )}
            </select>
            <NavLink className="Links" exact to={"/"}>Home</NavLink>
            <NavLink className="Links" to={"/login"}>Log In</NavLink>
        </nav>
    )
}

export default NavBar;
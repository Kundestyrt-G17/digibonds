import React from 'react';
import './index.css';
import {Button} from "@material-ui/core";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';


const WelcomePage = () =>
<div className="welcome-page">
    <h1 className="welcome-page_title">NORWEGIAN BONDHOLDERS' MEETING</h1>
    <div className="welcome-page_body">
        <p className="welcome-page_paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        rekgnrkelngkrelngrelng
        gernglkenrglkrnge
        gnelkrgnklernglernglkrenlgrlkengrelkngkregklrngleknglkr.
        ergnlrkegnlkrgnerngklkegnreg.
        kngrkelgnkrlglkrengkrlegnkrelngkre.rgløemgølremgløremglømreglømrgegre. jlenfjw enflwejfbew jkbejkfbwjk bfjkewbfjke wbfjkewbf</p>

        <Button startIcon={<PictureAsPdfIcon />} className="welcome-page_summons" href=".pdf">Download summons</Button>
        <div className="welcome-page_buttons">
                <Button variant="contained" color="primary" >Vote now</Button>
                <Button variant="outlined" color="primary">Already voted</Button>
        </div>
    </div>
</div>;


export default WelcomePage;

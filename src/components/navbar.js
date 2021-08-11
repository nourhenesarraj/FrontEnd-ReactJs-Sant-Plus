import React from "react";
import {  Nav , Container} from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './../healthcare.ico';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import { Link } from "react-router-dom";
import './test.css'
const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2.2),
    width : "245px",
    fontFamily:'Franklin Gothic Medium',
    
  },
}));


const NavbarPage = () => {
 
const classes = useStyles();
const [anchorEl, setAnchorEl] = React.useState(null);

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};

const open = Boolean(anchorEl);
const id = open ? 'simple-popover' : undefined;

const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null
  return (
    <>
    <Navbar bg="white"   scrolling fixed="top">
      <Container>
      <Navbar.Brand href="/accueil">
        <img src={logo} alt="logo" style={{ 'width': '50px'}}/> 
        Santé Plus</Navbar.Brand>
      <Nav className="me-auto">
     
      <Nav.Link href="/accueil" className="navlink" >Accueil</Nav.Link>
      <Nav.Link href="/diagnostic" className="navlink">Diagnostic</Nav.Link>
      <Nav.Link href="/aide" className="navlink">Aide</Nav.Link>
     {/*  Si admin est connecté  */}
        {token  && (
        <div  style={{marginLeft : '470px'}}>
        <Nav.Link><AccountCircleIcon color="primary"  fontSize="large" onClick={handleClick} />
        <span className="user">{user.toLocaleUpperCase()}</span>  </Nav.Link>
        <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
       
        <Typography className={classes.typography} style={{color : '#1976d2' , marginBottom : '-30px'}}>
         <EditLocationIcon size="20px" /> 
         <Link  to="/profil" >
           Gérer votre compte 
           </Link>
         </Typography>
        <hr/>
        <Typography className={classes.typography} style={{color : '#dc004e' , marginTop : '-30px'}}> 
        <ExitToAppIcon />
        <Link  to="/login">
         <button onClick={() => localStorage.clear()} style={{color : '#dc004e' , marginTop : '-30px' , border : 'none' , backgroundColor : 'white'}}> Se déconnecter</button>
          </Link>
        </Typography>
      </Popover>
    
        </div>
    
         ) }
      </Nav>
      
      </Container>
    </Navbar>
  
    
   
  </>
    );
  }


export default NavbarPage;
      


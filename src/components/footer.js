import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import Logo from '../deltawebit.ico'

const Footer = () => {
  return (
    <MDBFooter color="white" className="font-small pt-4 mt-4" >
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="12">
            <center>
            <h4 style={{color : 'black' , fontSize : '20px' ,  fontFamily: 'Patrick Hand SC'}}>
              Made with <span style={{color:"red", width:'20px' }}>&hearts;</span> By <img src={Logo} alt="logo"  style={{ 'width': '75px' , 'height' : '70px'}}/>
            </h4>
            </center>
          </MDBCol>
          
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright 
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default Footer;
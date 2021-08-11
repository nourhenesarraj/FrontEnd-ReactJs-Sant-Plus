// import Test from './components/test';
import React from "react";
import './App.css';
import NavbarPage from './components/navbar'
import logo from './background.jpg';
import Test from './components/test'
import  Footer from './components/footer'
import  Accueil from './components/accueil'
import ConsulteMaladie from './components/consulteMaladie'
import ConsulteMaladies from './components/consultelistemaladies'
import  Aide from './components/aide'
import  Login from './components/login'
import  ProfilAdmin from './components/profilAdmin'
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
 import 'bootstrap-css-only/css/bootstrap.min.css';
 import 'mdbreact/dist/css/mdb.css';
 import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
 
  return (
    <div className="backcolor">
  
    <Router>
    
    <NavbarPage />
     <Route path="/diagnostic" exact component={Test}></Route>
     <Route path="/accueil" exact component={Accueil}></Route>
     <Route path="/consulteMaladie/:id" exact component={ConsulteMaladie}></Route>
     <Route path="/affichemaladies/:id/:nom" exact component={ConsulteMaladies}></Route>
     <Route path="/aide" exact component={Aide}></Route>
     <Route path="/login" exact component={Login}></Route>
     <Route path="/profil" exact component={ProfilAdmin}></Route>
     </Router>
 
  
  <Footer />
    </div>
  );
}

export default App;

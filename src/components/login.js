
import   {useState  } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Swal from 'sweetalert2';
import {  Card } from "react-bootstrap"
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';
import './login.css'
import { useHistory , Redirect} from "react-router-dom"

const Login = () => {

  // const history = useHistory();
  const [loggedIn , setloggedIn] = useState(false);
const [user , setuser] = useState({
    nom_utilisateur :'',
    mdp: '',
    nom : '',
    prenom : '',
    email : ''
});
const [error, setError] = useState("")
const [test , settest] =useState(false);

const Oninputchange = (e) => {
    const {name,value} = e.target;
    setuser({...user, [name] : value});
    //console.log("my user",user.nom_utilisateur);
}
// Alert du succès
const opensweetalert = () =>
{
  Swal.fire({
    icon: 'success',
    title: 'Compte crée avec succès',
    showConfirmButton: true,
    
  })
}


const [show , setshow] =useState(false);
// Display form signup
const changeForm = (e) =>{
    console.log("clikc " ,e);
      setshow(true);
      document.getElementById("signin").style.display = 'none';
      
}
// Display form signin
const changeFormSignIn = e => {
  setshow(false);
  document.getElementById("signin").style.display = 'block';
}
/*envoi form s'inscrire */
 const handleSubmit = (evt) => {
    evt.preventDefault();
  //  console.log('vide nom',user.mdp.length);
    if (document.getElementById("nom").value.length === 0 || document.getElementById("prenom").value.length === 0 ||
    document.getElementById("email").value.length === 0 || document.getElementById("nom_utilisateur").value.length === 0
    ) {
      document.getElementById('Card1').style.height = '600px';
      return  setError("Champs ne doit pas être vide.");
      
    }
    if((user.mdp.length < 6 ) || (user.mdp.length > 18 )){
      document.getElementById('Card1').style.height = '600px';
      return  setError("Le mot de passe doit être compris entre 6 et 18 caractères.");
    }
    
    const fd = new FormData();
    fd.append('nom_utilisateur', user.nom_utilisateur);
    fd.append('mdp', user.mdp);
    fd.append('nom', user.nom);
    fd.append('prenom', user.prenom);
    fd.append('email', user.email);
    axios.post(`http://127.0.0.1:8000/api/register`, fd , {
        headers: {'Content-Type': 'application/json'}}
    ).then(res=>
    {
    //Success alert
    if(res.data === 1){
        settest(true);
       //console.log("my msg error",msgerreur);
    }
    else{
      opensweetalert();
      changeFormSignIn(evt);
      
     // console.log("result",res.data);
  }
    }).catch((err) => console.log("erreur axios",err));

 }
//  envoi form login
 const handleSubmitForm1 = (e)  => {
  const fdt = new FormData();
  fdt.append('nom_utilisateur', user.nom_utilisateur);
  fdt.append('mdp', user.mdp);
   axios.post(`http://127.0.0.1:8000/api/connexion`, fdt , {
    headers: {'Content-Type': 'application/json'}}
).then(res=>
{
  localStorage.setItem('token' , res.data.token);
  localStorage.setItem('user' , res.data.nom_utilisateur);
  setloggedIn(true);
  //  history.push("/accueil");

}).catch((err) => console.log("erreur axios",err));
 }

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
  const classes = useStyles();
  const useStyles1 = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '20.5ch',
      marginLeft:'-3px'
    },
  }));
  const classes1 = useStyles1();
  const [open, setOpen] = useState(true);
  const useStyles2 = makeStyles((theme) => ({
    root: {
      width: '80%',
      '& > * + *': {
        marginTop: theme.spacing(0.5),
      },
      marginBottom: theme.spacing(0.1),
    },
  }));
  const classes2 = useStyles2();

    return(
        <>
        {/* Redirection vers page d'accueil en cas de succès de loginform  */}
      {loggedIn && ( 
         <Redirect to="/accueil" />
      )}

      <div id="container" className="d-flex " >
        {/* Sign in form  */}
      <div id="signin"> 
      <Card id="Card">
        <Card.Body >
        <AccountCircleIcon color="primary"  fontSize="large" style={{marginLeft : '120px'}}/>
        <br/><Typography variant="h6" style={{marginLeft : "112px"}} gutterBottom color="primary">
      Log In
      </Typography>
        <hr/>
        <form id="form" onSubmit={e => handleSubmitForm1(e)} >
  <TextField type="text" id="standard-basic"  label="Nom_utilisateur" name="nom_utilisateur" autoComplete="off" onChange={e => Oninputchange(e)} required />
   <br/>
     <br/> 
     
     <TextField type="password" id="standard-basic" name="mdp" id="mdp" label="Mot de passe" autoComplete="off" onChange={e => Oninputchange(e)} required/>
         
      <br/> 
      <Button size="small" style={{marginLeft:"30px" , marginTop : "30px"}} onClick={e => handleSubmitForm1(e)}>Se connecter</Button>
     
        </form>
        <hr/>
        <span id="spancss">Vous n'avez pas de compte ?</span> <span id="spanbtn" onClick={e => changeForm(e)}> S’inscrire</span>
        </Card.Body>
      </Card>
      </div>
      {/* Sign up form  */}
      {show && (
           
            <Card id="Card1">
              <Card.Body >
            
              <AccountCircleIcon color="primary"  fontSize="large" style={{marginLeft : '120px'}}/>
              <br/><Typography variant="h6" style={{marginLeft : "75px"}} gutterBottom color="primary">
             Créer Compte
            </Typography>
              <hr/>
              {error && 
               <div className={classes2.root}>
                  <Collapse in={open}>
              <Alert variant="outlined" severity="error" action={
            <IconButton
              aria-label="close"
              color="red"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }>{error}</Alert>
          </Collapse>
          </div>
          }
         <form id="form" className="k-form">
         
             <TextField   id="standard-basic" name="nom" id="nom" label="Nom" autoComplete="off" onChange={e => Oninputchange(e)} required={true} />
      <br/>      <TextField id="standard-basic" id="prenom"  name="prenom" autoComplete="off" label="Prenom" onChange={e => Oninputchange(e)} required={true} />
      <br/>       <TextField id="standard-basic" id="email"  name="email" autoComplete="off" label="email" onChange={e => Oninputchange(e)} required={true} />
        <br/>

  <TextField type="text" id="standard-basic" id="nom_utilisateur"   autoComplete="off" label="Nom_utilisateur" name="nom_utilisateur" onChange={e => Oninputchange(e)} required={true} />
    <br/>
    {test && (
     <span style={{color : 'red'}}>Le nom d'utilisateur existe déja! Veuillez choisir un autre.</span>
     )} 
     
    <TextField type="password" id="standard-basic" name="mdp" id="mdp" autoComplete="off" label="Mot de passe" onChange={e => Oninputchange(e)} required/>
              
      <br/> 
      <Button size="small" style={{marginLeft:"50px" , marginTop : "20px"}} onClick={e => handleSubmit(e)}>S'inscrire</Button>
        </form>
        <hr/>
        <span id="spancss">Vous avez déjà un compte ? </span> <span id="spanbtn" onClick={e => changeFormSignIn(e)}>Se connecter</span>
        </Card.Body>
      </Card>
     
        )}
         </div>
         
        </>
        );
}
export default Login;
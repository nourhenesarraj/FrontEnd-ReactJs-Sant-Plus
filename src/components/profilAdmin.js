import { useEffect , useState} from "react";
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import './test'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {  Link  } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';

const ProfilAdmin = () => {

    const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null
    const[profil , setprofil] = useState({
        nom_utilisateur : '' ,
        mdp : '',
        nom : '' ,
        prenom : '',
        email :'' 
    });
    const useStyles = makeStyles({
        root: {
          minWidth: 600,
          height:500
          
        },
       
        title: {
          fontSize: 14,
        },
        pos: {
          marginBottom: 12,
         
        },
      });
      const useStyles3 = makeStyles((theme) => ({
        root: {
          '& > * + *': {
            marginTop: theme.spacing(2),
          },
          marginTop: 80,
          marginLeft:110
        },
      }));
      const classes3 = useStyles3();
      const useStyles2 = makeStyles((theme) => ({
        button: {
          margin: theme.spacing(1),
          marginLeft:'5px',
          width:'300px',
          padding : '7px'
        },
      }));
      const classes2 = useStyles2();
      
      function getuser(){
        axios.get(`http://127.0.0.1:8000/api/getuser/${user}`).then(res => {
            console.log("data" , res.data);
            setprofil({
                nom_utilisateur : res.data[0].nom_utilisateur ,
                mdp :  res.data[0].mdp,
                nom : res.data[0].nom ,
                prenom : res.data[0].prenom,
                email :res.data[0].email 
            });
           
    
        }).catch((err) => {
            console.log("erreur" , err);
        })
        }
        const opensweetalert = () =>
        {
          Swal.fire({
            icon: 'success',
            title: 'Compte mis à jour avec succès',
            showConfirmButton: true,
            
          })
        }
    useEffect(() => {
    getuser();
    
    }, []);

    const Ontxtchange = e => {
        console.log(e.target.value);
        const {name,value} = e.target;
        setprofil({ ...profil,[name] : value});
       
      }
const handleclick = (evt) => {
    evt.preventDefault();
   axios.put(`http://127.0.0.1:8000/api/updateuser` , profil).then(res => {
    opensweetalert();
    //console.log("updated" ,res);
   }).catch((err) => {
       console.log("erreur" ,err);
   })
}
const doCancel = (e) => {
    e.preventDefault();
   getuser();
  }
return(
    <div>

          <div className={classes3.root}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link to="/accueil"  style={{color:"GrayText"}}>
          Accueil
        </Link>
        <Typography><Link to="/diagnostic" activeClassName="current" color="inherit">Diagnostic</Link> </Typography>
      </Breadcrumbs>
      </div>

      {/* Card Profil */}
      <div className="profil">
    <Card className={useStyles.root}>
        <CardContent>
        <Typography className={useStyles.title} color="textSecondary" gutterBottom>
      <AssignmentIndIcon style={{fontSize: '50px' , color : 'black'}} />  <span>Profil</span> 
        </Typography>
        <Typography variant="h6" gutterBottom>
       
        </Typography>
        <Typography className={useStyles.pos} color="textSecondary">
       <br/>
        </Typography>
        <Typography variant="body2" component="p">
    <form onSubmit={handleclick}>
    <Typography variant="subtitle2" gutterBottom>
    <TextField   id="standard-basic" className="txtfield" value={profil.nom} onChange={e => Ontxtchange(e)} 
      name="nom" id="nom"  autoComplete="off" label="Nom"
      />
       </Typography>
       <br/>
       <Typography variant="subtitle2" gutterBottom>
       <TextField   id="standard-basic" className="txtfield" value={profil.prenom} onChange={e => Ontxtchange(e)} 
      name="prenom" id="prenom"  autoComplete="off" label="Prenom"
      /> 
       </Typography>
       <br/>
       <Typography variant="subtitle2" gutterBottom>
        <TextField   id="standard-basic" className="txtfield" value={profil.nom_utilisateur} onChange={e => Ontxtchange(e)} 
      name="nom_utilisateur" id="nom_utilisateur"  autoComplete="off" label="Nom d'utilisateur "
      />
        </Typography>
      <br/>
      <Typography variant="subtitle2" gutterBottom>
  <TextField   id="standard-basic" className="txtfield" value={profil.email} onChange={e => Ontxtchange(e)} 
      name="email" id="email"  autoComplete="off" label="email"
      />
        </Typography>

        <br/>
        <Typography variant="subtitle2" gutterBottom>
        <TextField type="password" id="standard-basic" style={{width : '300px'}} name="mdp" id="mdp" label="Mot de passe" autoComplete="off" onChange={e => Ontxtchange(e)} required />
        </Typography>
        <br/>
        <Button
        variant="contained"
        id="voir"
        color="secondary"
        className={classes2.button}
        onClick={e => handleclick(e)} 
        >Modifier</Button>
        <br/>
        <Button 
         variant="contained"
         id="cancel"
         className={classes2.button}
        onClick={doCancel}>Reset</Button> 
        
    </form>
    </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
    </div>
</div>
);


}
export default ProfilAdmin ;
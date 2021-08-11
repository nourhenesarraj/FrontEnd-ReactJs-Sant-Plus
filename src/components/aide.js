import React , {useEffect , useState  } from 'react';
import Swal from 'sweetalert2';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import './test.css';
import CloseIcon from '@material-ui/icons/Close';
import LinkIcon from '@material-ui/icons/Link';
import imagelink from '../link.jpg';
import axios from 'axios';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LanguageIcon from '@material-ui/icons/Language';
import Button from '@material-ui/core/Button';

const useStyles1 = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
const Aide = () => {

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    const classes = useStyles1();
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
      const [link , setlink] = useState({
        nom:'',
    });
 
      const [value , setvalue] =  useState("");
     const [listeliens , setlisteliens] = useState([]);
     const [details, setdetails] = useState({
      description:'',
      email : '',
      localisation : '',
      siteweb : ''
     });
  
      var values = [];

     const Oninputchange = e => {
         var v = e.target.value ;
         const {name,value} = e.target;
          setlink({[name] : value});
         values = [...values , v];
         setvalue(values);
      
        
     }
const handleClick = (evt) => {
    evt.preventDefault();
    const fdt = new FormData();
    fdt.append('link', link.nom);
    axios.post(`http://127.0.0.1:8000/api/store`, fdt)
    .then(res => {
      console.log('rslt ajout suucès',res.data);
    }).catch((err) => {
      console.log('erreur',err);
    })
    window.location.reload(true);
    
}
useEffect(() => {
  function affichelinks() {
    axios.get(`http://127.0.0.1:8000/api/afficherLiens`)
  .then(res => {
    setlisteliens(res.data);
   
    console.log('rslt affiche suucès',res.data);
  }).catch((err) => {
    console.log('erreur',err);
  })
  }
  function afficheDescription() {
    axios.get(`http://127.0.0.1:8000/api/afficheDesc`)
  .then(res => {
    setdetails({
      description:res.data.site[0].description,
      email : res.data.site[0].email,
      localisation : res.data.site[0].localisation,
      siteweb : res.data.site[0].siteweb
    });

  }).catch((err) => {
    console.log('erreur',err);
  })
  }
 affichelinks();
 afficheDescription();
}, []);

const opensweetalert = () =>
      {
        Swal.fire({
          title : 'Success',
          text: "Les informations sont mises à jour avec succès",
          type: 'success',
          
        })
      }
const opensweetalert1 = () =>
      {
        Swal.fire({
          title : 'Error',
          text: "Echec de mise à jour!",
          type: 'error',
          
        })
      }
/*Modifier form de présentation du site par l'admin */
const Ontxtchange = e => {
  const {name,value} = e.target;
  setdetails({ ...details,[name] : value});
 
}
const updateform = () => {
  axios.put(`http://127.0.0.1:8000/api/update` , details)
  .then(res => {
    opensweetalert();
    console.log('update succès',res);
  }).catch((err) => {
    opensweetalert1();
    console.log('erreur',err);
  })
}

const deleteLink = (id) => {
  axios.post(`http://127.0.0.1:8000/api/delete/${id}`)
  .then(res => {
    window.location.reload(true);
    console.log('suppression',res);
  }).catch((err) => {
    console.log('erreur',err);
  })
}
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
    return (
        <>
 <div className={classes3.root}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link to="/accueil"  style={{color:"GrayText"}}>
          Accueil
        </Link>
        <Typography><Link to="/aide" activeClassName="current" color="inherit">Aide</Link> </Typography>
      </Breadcrumbs>
      </div>

        <div className="description">
        <Card className={useStyles.root}>
        <CardContent>
        <Typography className={useStyles.title} color="textSecondary" gutterBottom>
        <img src={imagelink} alt="diag" width="70px" height="70px" /> <span>Présentation du site</span> 
        </Typography>
        <Typography className={useStyles.pos} color="textSecondary">
        </Typography>
        <Typography variant="body2" component="p">
      
        <>
       <div>
      {  token ? ( 
      <form>
       <Typography variant="h6" gutterBottom >
       <PlayArrowIcon style={{ 'width' : '15px'}}/>
      <span style={{color : '#ff8085'}}>
        Description
        </span> 
       </Typography>
         <TextareaAutosize aria-label="empty textarea"  
           id="description" name="description" 
           onChange={e => Ontxtchange(e)}
           placeholder="Description..." 
           defaultValue={details.description} 
          className="txtarea"
           />
          <Typography variant="h6" gutterBottom >
         <LanguageIcon/>
         <span style={{color : '#ff8085'}}>
         Site Web
         </span>
         </Typography>
         <Typography variant="subtitle2" gutterBottom>
      <span className="delta">
      <TextField   id="standard-basic" className="txtfield" value={details.siteweb} onChange={e => Ontxtchange(e)} 
      name="siteweb" id="siteweb"  autocomplete="off" 
      />
        </span>
    
         </Typography>
           
        <Typography variant="h6" gutterBottom >
         <MailOutlineIcon /> 
         <span style={{color : '#ff8085'}}>
         Email
         </span>
         </Typography>
         <Typography variant="subtitle2" gutterBottom>
         <TextField   id="standard-basic" className="txtfield"  value={details.email} onChange={e => Ontxtchange(e)}  name="email" id="email"  autocomplete="off" />
         </Typography>
         <Typography variant="h6" gutterBottom >
           <LocationOnIcon />
         <span style={{color : '#ff8085'}}>
         Localisation
         </span>
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          <TextField   id="standard-basic" className="txtfield" value={details.localisation}  onChange={e => Ontxtchange(e)} name="localisation" id="localisation"  
          autocomplete="off" />
        </Typography>
          <br/>
          <CardActions>
          <Button
        variant="contained"
        id="voir"
        color="secondary"
        className={classes2.button}
        onClick={e => updateform(e)} 
        >Modifier</Button>
       </CardActions>
      
        </form>
      
         ) :  
         <>
          <TextareaAutosize aria-label="empty textarea" placeholder="Description..." defaultValue={details.description} className="txtarea" readOnly />
         <Typography variant="h6" gutterBottom >
         <LanguageIcon/>
         <span style={{color : '#ff8085'}}>
         Site Web
         </span>
         </Typography>
         <Typography variant="subtitle2" gutterBottom>
      <a href={details.siteweb} target="_blank">
      <span className="delta">
      {details.siteweb}
        </span>
      </a> 
         </Typography>
           
        <Typography variant="h6" gutterBottom >
         <MailOutlineIcon /> 
         <span style={{color : '#ff8085'}}>
         Email
         </span>
         </Typography>
         <Typography variant="subtitle2" gutterBottom>
         <a href={"mailto:"+details.email}  target="_blank"> 
         <span className="delta">
         {details.email}
         </span></a>
         </Typography>
         <Typography variant="h6" gutterBottom >
           <LocationOnIcon />
         <span style={{color : '#ff8085'}}>
         Localisation
         </span>
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          {details.localisation}
           </Typography>
           </>
       }
    </div>
    </>
        {/* );
       }  
       )}  */}
      
       
        <br/>
        </Typography>
      </CardContent>
      <CardActions>
       
      </CardActions>
    </Card>
    </div> 

        {/* Links card  */}
        <div className="linkscss">
        <Card className={useStyles.root}>
        <CardContent>
        <Typography className={useStyles.title} color="textSecondary" gutterBottom>
        <img src={imagelink} alt="diag" width="70px" height="70px" /> <span> Liens et sources utiles</span> 
        </Typography>
        <Typography variant="h6" gutterBottom>
       
        </Typography>
        <Typography className={useStyles.pos} color="textSecondary">
       <br/>
        </Typography>
        <Typography variant="body2" component="p">
        {token && (
          <>
        <TextField   id="standard-basic" className="txtfield" name="nom" id="nom" label="Liens utiles" autocomplete="off" onChange={e => Oninputchange(e)} />
             <span style={{marginLeft: '5px'}}>
        <Fab color="secondary" aria-label="add" size="small">
        <AddIcon  onClick={e => handleClick(e)} />
        </Fab></span>
        <br/>
        </>
        )}
        <br/>
      <div className={classes.root}>
        { listeliens.map((link) => {
                       
             return(
                <>
                  <span style={{ color : '#72aee6'}}>
                    <LinkIcon />
                  </span>  
                  <a href={link.lien} target="_blank">
                    <input type="text" value={link.lien} readOnly className="links" />
                  </a>
                {token && (
                    <span> <CloseIcon  fontSize="small" className="closeicon"  onClick={e => deleteLink(link.id)} /></span>
                )}
                  <br/>
               </>
                  
                  );
                  })    
         } 
      </div>
        </Typography>
      </CardContent>
      <CardActions>
       
      </CardActions>
    </Card>
    </div>
        </>
    );

}




export default Aide;
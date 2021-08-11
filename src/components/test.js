import React , {useEffect , useState , useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import axios from 'axios';
import './test.css';
// import Card from './card';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import diagnostic from '../check.jpg';
import Swal from 'sweetalert2';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
//import Link from '@material-ui/core/Link';
import { Link } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const Test = () => {
 
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

  const useStyles1 = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }));
  const classes = useStyles1();
  const [expanded, setExpanded] = React.useState(false);
  const useStyles2 = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));
  const classes2 = useStyles2();
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
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
      const [listeSymptome, setlisteSymptome] = useState([]);
      const [resultatRecherche, setresultatRecherche] = useState([]);
      const[listeRecherche, setlisteRecherche]=useState([]);
      const [display, setdisplay] = useState(false);
      var categorie =[];
      const opensweetalert = () =>
      {
        Swal.fire({
          title: 'Warning!',
          text: "Merci de choisir les symptômes!",
          type: 'warning',
          
        })
      }
     var tabl = [];
      useEffect(() => {
       
       
        function fetchSymptoms(){

        axios.get('http://127.0.0.1:8000/api/liste').then((response) => {
        console.log("sucees axios!!",response.data);
        setlisteSymptome(response.data);
        })
      }
      fetchSymptoms();
      
      }, [])

    //   const options = listeSymptome.map((option) => {
    //     const firstLetter = option.Nom_symp[0].toUpperCase();
    //     return {
    //         firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
    //         ...option,
    //     };
    // });
    const initialFieldValues = {
    }
    var value;
    var tab;
    const [Values, setValues] = useState(initialFieldValues);
    const onTagsChange = (event, values) => {
      console.log("change value",values);
    if(Values && Values.length !== 0){
      setValues({
          ...Values,
          Preferences: values
      });
    }else{
      setValues(initialFieldValues);
      setdisplay(false);
    }
    }

    function handleFormSubmit(e) {
     
      setlisteRecherche([]);
      setresultatRecherche([]);
      if(Values && Values.length !== 0){
     for( value in Values){
      tab =Values[value];
    }
  
    tab.map(t => {
      tabl = [...tabl , t.Id_symp];
      
    })
      axios.post(`http://127.0.0.1:8000/api/symptome`, tabl)
      .then(res => {
        console.log("ressss",res);
        console.log("data",res.data);
        if(res.data && res.data.length !== 0){
        setresultatRecherche(res.data);
        setdisplay(true);
        }else{
          setdisplay(false);
          document.getElementById("alert").style.display = "block";
            setOpen(true);
          
        }
      })
      .catch((err) => console.log("erreur axios",err));
    }else{
     setdisplay(false);
     setlisteRecherche([]);
     setresultatRecherche([]);
      opensweetalert();
    }
     
    }
    const handleClick = () => {
      setOpen(true);
    };
    const [open, setOpen] = React.useState(true);
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
  };
    return (
      <div className="bodycss">
          <div className={classes3.root}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link to="/accueil"  style={{color:"GrayText"}}>
          Accueil
        </Link>
        <Typography><Link to="/diagnostic" activeClassName="current" color="inherit">Diagnostic</Link> </Typography>
      </Breadcrumbs>
      </div>
      
    <div className="gridcss">
           
      <Card className={useStyles.root}>
      <CardContent>
        <Typography className={useStyles.title} color="textSecondary" gutterBottom>
        <img src={diagnostic} alt="diag" width="70px" height="70px" /> <span>Diagnostic</span>  
        </Typography>
        <Typography variant="h6" gutterBottom>
        Choisissez vos symptômes et Détectez votre maladie.
        </Typography>
        <Typography className={useStyles.pos} color="textSecondary">
       <br/>
        </Typography>
        <Typography variant="body2" component="p">

        <Autocomplete
       multiple
       id="multiple-limit-tags"
       limitTags={2}
        options={listeSymptome}
        onChange={onTagsChange}
        getOptionLabel={(option) => option.Nom_symp}
         renderInput={(params) => (
           <TextField
             {...params}
            label="Symptômes"
            variant="outlined"
             placeholder="..."
         />
         )}
             /> 
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" style={{marginLeft:"400px"}} onClick={e => handleFormSubmit(e)}>Rechercher</Button>
      </CardActions>
    </Card>
   
    </div>
    { display && (
       
    <div >
      <Typography variant="h6" gutterBottom >
     <span className="liste">Liste des maladies possibles</span> 
        </Typography>
     
      {
         resultatRecherche.map(rslta => {
        if(!categorie.includes(rslta.Nom_categorie) ){
         categorie.unshift(rslta.Nom_categorie );
        }
        if(!listeRecherche.includes(rslta)){
        listeRecherche.push(rslta);
        }
       // console.log("categorie liste:",rslta)
      })
         
      }
      <div className="container-fluid">
                <div className="row">
      {listeRecherche.map(c =>{
              return(
                <div className="resultCard">
                  <div className="col-md-3">
                    <div className="card text-center shadow"  style={{'width' : '320px' , 'marginLeft' : '60px'}}>
                      <div className="overflow">
           <Card className={useStyles.root}>
        <CardContent>
        <Typography variant="overline" display="block" gutterBottom>
        {c.Nom_maladie}
        </Typography>
       
        <Typography variant="body2" component="p" >
         <div className={classes.root}>
      <Accordion  onChange={e => handleChange(e)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography variant="caption" display="block" gutterBottom>Détails</Typography>
          <Typography className={classes.secondaryHeading}></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" gutterBottom>
         { c.Description_maladie}
        <br/>
         <Button
        variant="contained"
        id="voir"
        color="secondary"
        className={classes2.button}
        startIcon={<VisibilityIcon />}
      ><Link to={"consulteMaladie/"+ c.Id_maladie} style={{ color : 'white'}}>Voir Plus</Link></Button>
          </Typography>
          
        </AccordionDetails>
      </Accordion>
    
    </div> 
        </Typography>
      </CardContent>
      <CardActions>
  
      </CardActions>
    </Card>
    </div>
    </div>
    </div>
    </div> 
     )
        })
        }  
       
 </div>
  </div>
  </div>
  
)}
<div id="alert" style={{'display' : 'none'}}>
<Snackbar open={open}  onClose={handleClose}>
  <Alert onClose={handleClose} severity="info">
  Les symptômes saisies ne conviennent à aucune maladie.
  Merci de consulter votre médecin le plus tôt possible!
  </Alert>
</Snackbar>
</div>

   </div>   
    );
}

export default Test;


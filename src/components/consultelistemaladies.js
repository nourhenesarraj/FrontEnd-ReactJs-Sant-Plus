
import React , {useEffect , useState} from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import  {Link } from "react-router-dom";
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VisibilityIcon from '@material-ui/icons/Visibility';

const ConsulteMaladies = (id , nom) => {
   
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
          marginLeft:110,
          marginBottom : 30
        },
      }));
      const classes3 = useStyles3();
      const [expanded, setExpanded] = React.useState(false);
      const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
      const[maladies , setmaladies]=useState([]);
      useEffect(() => {
         
        function fetchListeMaladies(){
            axios.get(`http://127.0.0.1:8000/api/listemaladies/${id.match.params.id}`)
            .then((response) => {
              //console.log("symptomes liste!!",response.data);
              setmaladies(response.data);
              })
        }
        fetchListeMaladies();
      }, [])
return(
    <>
          <div className={classes3.root}>
             <Breadcrumbs separator="›" aria-label="breadcrumb">
               <Link to="/accueil"  style={{color:"GrayText"}}>
                 Accueil
               </Link>
               <Link style={{color:"GrayText"}}  to="/">
               Catégorie    {id.match.params.nom}
               </Link>
               <Typography><Link to={"/affichemaladies/"+ id.match.params.id + "/"+ id.match.params.nom} color="inherit" activeClassName="current">
                   Liste des Maladies 
                   </Link> 
                   </Typography>
             </Breadcrumbs>
             </div>
             <div className="container-fluid">
                <div className="row">
      {maladies.map(c =>{
              return(
                <div className="resultCard">
                  <div className="col-md-3">
                    <div className="card text-center shadow"  style={{'width' : '320px' , 'marginLeft' : '60px'}}>
                      <div className="overflow">
           <Card className={useStyles1.root}>
        <CardContent>
        <Typography variant="h6"  display="block" gutterBottom>
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
      ><Link to={"/consulteMaladie/"+ c.Id_maladie} style={{ color : 'white'}}>Voir Plus</Link></Button>
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
</>

);

}
export default ConsulteMaladies;
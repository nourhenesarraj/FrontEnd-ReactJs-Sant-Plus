
import React , {useEffect , useState} from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';


const ConsulteMaladie = (id) => {
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
      const[maladie , setmaladie]=useState([]);
      const[symptomes , setsymptomes]=useState([]);
      const useStyles = makeStyles({
        root: {
          minWidth: 275,
          width:1000,
          marginLeft: 101,
          marginTop:30,
        },
       
        title: {
          fontSize: 14,
        },
        pos: {
          marginBottom: 12,
        },
      });
      const classes = useStyles();
      useEffect(() => {
        function fetchmaladie(){
            axios.get(`http://127.0.0.1:8000/api/afficher/${id.match.params.id}`)
            .then((response) => {
              console.log("success axios!!",response.data);
             setmaladie(response.data);
              })
            }
        function fetchSymptome(){
            axios.get(`http://127.0.0.1:8000/api/affichersymptome/${id.match.params.id}`)
            .then((response) => {
              //console.log("symptômes liste!!",response.data);
             setsymptomes(response.data);
              })
        }

        fetchmaladie();
        fetchSymptome();
      },[])

    return(
        <>
     
             <div className={classes3.root}>
             <Breadcrumbs separator="›" aria-label="breadcrumb">
               <Link to="/accueil"  style={{color:"GrayText"}}>
                 Accueil
               </Link>
               <Link style={{color:"GrayText"}}  to="/diagnostic">
               Diagnostic
               </Link>
               <Typography><Link to={"/consulteMaladie/"+id.match.params.id} color="inherit" activeClassName="current">
                    Maladie 
                   </Link> 
                   </Typography>
             </Breadcrumbs>
             </div>
             <div>
                 {maladie.map(m => {
                     return (
                        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                {m.Nom_categorie}
                </Typography>
                <Typography variant="h3" gutterBottom>
                {m.Nom_maladie}
                </Typography>
                <Typography  variant="subtitle2" gutterBottom >
               <PlayArrowIcon style={{ 'width' : '15px'}}/> <span style={{color : '#ff8085'}}>
               Description
               </span>
                </Typography>
                <Typography variant="body2" gutterBottom>
                {m.Description_maladie}
                <br/>
                <br/>
                <Typography  variant="subtitle2" gutterBottom>
               <AssignmentIndIcon /><span style={{color : '#ff8085'}}>Symptômes </span>
                </Typography>
                {symptomes.map(s => {
                     return (
                         <>
                      <span style={{ color : '#72aee6'}}><NavigateNextIcon  /></span> 
                      {s.Nom_symp}
                      <br/>
                      </>
                     );
                })}
                </Typography>
            </CardContent>
            <CardActions>
        
      </CardActions>
    </Card>
                     );
                 })
                 }
             </div>
             </>

    );
}
export default ConsulteMaladie;
import React , {useEffect , useState , useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import axios from 'axios';
import './test.css';
import Typography from '@material-ui/core/Typography';
import { VscSearch } from "react-icons/vsc";

const Accueil = () => {

    const useStyles = makeStyles((theme) => ({
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
      const classes = useStyles();
    
      const [categorie , setcategorie]=useState([]);
      const [Nomcategorie , setNomcategorie]=useState([]);
      var tab = [];
      useEffect(() => {

        function fetchcategorie(){
            axios.get(`http://127.0.0.1:8000/api/listecategorie`)
            .then((response) => {
            
                response.data.map(resp => {
                 // console.log("sucees axios!!",resp.Nom_categorie)
                tab  = [ ...tab , resp.Nom_categorie];
                });
              //  console.log("le tab des noms categories",tab);
                setNomcategorie(tab);
                setcategorie(response.data);
             
            
              })

        }
        fetchcategorie();
      },[])
  const [display, setDisplay] = useState(false);
  const searchWrapper = document.querySelector('.wrapper');
  const [Options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);
  
  const addEventListener = (keyup) => {
  
    let results = [];
    if (keyup.length) {
      results = Nomcategorie.filter((item) => {
     return item.toLowerCase().includes(keyup.toLowerCase());
      });
      setDisplay(false)
    } else {
     setDisplay(false)

    }

    renderResults(results);
  }
  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = event => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

      function add(option) {
        setSearch(option)
        document.getElementById("search").value = option;
        setDisplay(false)
       
      }
      function renderResults(results) {
        if (!results.length) {
          return searchWrapper.classList.remove('show');
        }
        var content = [];
        content.push(results)
        setOptions(content)
        searchWrapper.classList.add('show');
      }
     
return(
    <>
<div className="back" >
    <div ref={wrapperRef} class="container">
        <div class="wrapper">
          <input type="text" id="search"
            class="input-search" name="search"
            onKeyPress={event => {
              if (event.key === 'Enter') {
                add(event.target.value)
              }
            }}
            value={search} id="search"
            placeholder="Rechercher par catégorie..."
            autocomplete="off"
            onChange={(event) => {
              addEventListener(event.target.value);
              setDisplay(!display);
              setSearch(event.target.value);
            }}
          />
          <button class="btn_search"><VscSearch></VscSearch></button>
          {
            display && (
              <div class="results" style={{ "overflow": 'scroll', "height": "110px" }}>
                <ul>
                  {Options.map(opt => {
                    return opt.map(o => {
                      return <li key ={o} onClick={(event) => { add(o) }}>{o}</li>
                    })
                  })
                  }

                </ul>
              </div>)}

        </div>

      </div>

</div>
<div className="container-fluid">
  <div className="row">
  <Typography variant="h3" gutterBottom style={{'margin-left' : '470px', 'marginBottom' : '20px' }}>
        Liste des Catégories
      </Typography>
  {categorie.map(c =>{
    if(search === ""){
              return(
    <div className="Card">
        <div className="col-md-2">
            <div className="card text-center shadow">
                <div className="overflow">
                <Button   variant="outlined" color="secondary" style={{ 'padding' : '30px' , 'border-radius': '14px' , 'width' : '200px'}}>
                 <Link to={"/affichemaladies/"+ c.Id_categorie +"/"+ c.Nom_categorie} style={{ color :'#ce3375'}}> 
                 {c.Nom_categorie}</Link> 
                    </Button>
    </div>
    </div>
    </div>
    </div> 
      ) }
      else if(c.Nom_categorie.toLowerCase().includes(search.toLowerCase())){
        return(
          <div className="Card">
              <div className="col-md-2">
                  <div className="card text-center shadow">
                      <div className="overflow">
                      <Button   variant="outlined" color="secondary" style={{ 'padding' : '30px' , 'border-radius': '14px' , 'width' : '200px'}}>
                       <Link to={"/affichemaladies/"+ c.Id_categorie +"/"+ c.Nom_categorie} style={{ color :'#ce3375'}}> 
                       {c.Nom_categorie}</Link> 
                          </Button>
          </div>
          </div>
          </div>
          </div> 
            ) 
      }
  })
}
 </div>
  </div>
</>
)
}
export default Accueil;
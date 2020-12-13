import React, { useEffect,useState,Fragment } from 'react'
import './App.css';
import Navbar from "./components/Navbar"
import { getMatches } from "./api/Api"
import Matches from "./components/Matches"
import { Grid,Typography } from '@material-ui/core';

function App() {

  const [matches,setMatches] = useState([]);

  useEffect(() => {
    getMatches()
    .then((data)=> setMatches(data.matches) )
    .catch((error)=> alert("No data"))
  }, []);

  return (
    <div className="App">
      <Navbar/>
      <Typography variant="h3" style={{marginTop:20}}>Live T20 Score</Typography>
      <Grid container>
        <Grid sm="2"></Grid>
        <Grid sm="8">
        {
        matches.map((match) =>(

          <Fragment key={match.unique_id}>
            {match.type === "Twenty20" ? (
              <Matches key={match.unique_id} match={match}/>
              ) : (
                ""
            )}
          </Fragment>
          ))}
        </Grid>
      </Grid>

    </div>
  );
}

export default App;

/** @format */

import { Route, Routes } from "react-router";
import Auth from "./Component/Auth";
import Hallinfo from "./Component/Hallinfo";
import MoviContext from "./Component/MoviContext";
import { useState } from "react";
import BookHall from "./Component/BookHall";
import Welcome from "./Component/Welcome";
function App() {
  const [movie, setMovie] = useState([]);
  const [ClickInd, setCLickInd] = useState(null)
  const [HallInd, setHallInd] = useState(null)
  const [AllData , setAllData] = useState([])
  
  // console.log(ClickInd)
  return (<>


    <MoviContext.Provider value={ {movie,setMovie , ClickInd, setCLickInd,AllData , setAllData , HallInd, setHallInd} }>
      
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/hall" element={<Hallinfo />} />
        <Route path="/book" element={<BookHall/>}/>
      </Routes>
    </MoviContext.Provider>



  </>);
}

export default App;

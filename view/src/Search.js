import React, { useState, useRef ,useContext } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Card from "@mui/material/Card";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from "axios";
import { AppSettingsContext } from "./appsettings";

import "./App.css";
function Search() {
  const {token} =useContext(AppSettingsContext);
  const [options, setOptions] = useState([]);
  const [activeEntry, setActiveEntry] = useState({});
  const [isValueSet, setValue] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
  const previousController = useRef();
  const getData = async (searchTerm) => {
    if (previousController.current) {
      previousController.current.abort();
    }
    const controller = new AbortController();
    previousController.current = controller;
    try{
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
      };
    const response = await axios.get(
      "/api/" + searchTerm,{headers:headers}
    );
    console.log(response.data);
    if(response.data[0].Name === searchTerm)
    {
      console.log("----------------");
      console.log(response.data[0]);
      setActiveEntry(response.data[0]);
      setValue(true);
    }
    setOptions(response.data);
  }
  catch(e)
  {
    handleOpen();
  }
    // fetch("http://localhost:3001/stock/" + searchTerm, {
    //   signal,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json"
    //   }
    // })
    // .then(function (response) {
    //   console.log(response.json());
    //   return response.json();
    // })
    // .then(function (myJson) {
    //   console.log(
    //     "search term: " + searchTerm + ", results: ",
    //     myJson.products
    //   );
    //   const updatedOptions = myJson.products.map((p) => {
    //     return { title: p.title };
    //   });
    //   setOptions(updatedOptions);
    // });
    
  };

  const onInputChange = (event, value, reason) => {
    if (value) {
      getData(value);
    } else {
      setOptions([]);
    }
  };

  return (
    <div className="App">
      <Autocomplete
        className="searchfeild"
        id="free-solo-demo"
        freeSolo
        onInputChange={onInputChange}
        options={options.map((option) => option.Name)}
        renderInput={(params) => <TextField {...params} label="Search" />}
      />
      {isValueSet ? (
        <Card className="stockCard">
          <div className="title">{activeEntry.Name}</div>
         <div className="table">
         <div className="element"> Current Market Price: "{activeEntry.currentMarketPrice}"</div>
         <div className="element">Debt: "{activeEntry.debt}</div>
         <div className="element">Debt to Equity: "{activeEntry.debtToEquity}"</div>
          <div className="element">Dividend Yield: "{activeEntry.dividendYield}"</div>
          <div className="element">EPS: "{activeEntry.EPS}"</div>
          <div className="element">Market Cap: "{activeEntry.marketCap}"</div>
          <div className="element">ROCE %: "{activeEntry.rocePercentage}"</div>
          <div className="element">ROE Previous Annum: "{activeEntry.roePreviousAnnum}"</div>
          <div className="element">Reserves: "{activeEntry.reserves}"</div>
          <div className="element">Stock: "{activeEntry.stock}"</div>
         </div>
        </Card>
      ) : null}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Some Error Occured
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           Please reload the page
          </Typography>
        </Box>
        </Modal>
    </div>
  );
}

export default Search;

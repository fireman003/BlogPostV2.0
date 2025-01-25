import React, { useState } from 'react';


const styles = {
    HeaderLink: {
      padding: "10px",
      color: "primary",
      textDecoration: "none",
      "&:hover": {
        color: "lightblue",
      }
    }
  }
  
export default function LoggedMobileHeader() {
    const [search, setSearch] = useState("");
    const HandleOnClick = (event) => {
      setSearch(" ");
    }
    const HandleOnChange = (event) => { 
      setSearch(event.target.value)
      if(event.target.value === ""){
        setSearch(" ")
      }
    }
    const HadnleOnBlur = (event) => {
      if(event.target.value === "" || event.target.value === " "){
        setSearch(""); 
      }
    } 
    return (
        <>
        
        </>
    )
}
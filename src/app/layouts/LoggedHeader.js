import {useState} from "react";
import {Link, TextField, Container, AppBar, Toolbar} from "@mui/material";

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

export default function LoggedHeader() {
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
      <header>
        <AppBar color="white">
          <Toolbar>
            <Container>
              <Link href="/" sx={[styles.HeaderLink]}>Home</Link>
              <Link href="/discover" sx={[styles.HeaderLink]}>Discover</Link>
              <Link href="/about" sx={[styles.HeaderLink]}>About</Link>
            </Container>
            <Container sx={{display: "flex", justifyContent: "center"}}>
              <TextField id="search" fullWidth variant="outlined"  sx={{}} InputProps={{shrink: 0, sx: {borderRadius: 10}}} onBlur={HadnleOnBlur} onClick={HandleOnClick} label={search=== "" ? "Search": ""} onChange={HandleOnChange}/>
            </Container>
            <Container sx={{display: "flex", justifyContent: "end"}}>
              <Link href="/profile" sx={[styles.HeaderLink]}>Profile</Link>
              <Link href="/createpost" sx={[styles.HeaderLink]}>create post</Link>
              <Link href="/logout" sx={[styles.HeaderLink]}>Logout</Link>
            </Container>  
          </Toolbar>
        </AppBar>
      </header>
    )
  }
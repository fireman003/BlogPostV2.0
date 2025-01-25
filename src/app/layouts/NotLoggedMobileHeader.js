import { TextField, Container, AppBar, Toolbar, Drawer, Box, Button, Link} from "@mui/material";
import { useState } from "react";

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

export default function NotLoggedMobileHeader() {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
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
        <AppBar color="white">
          <Toolbar>
            <Container sx={{width: "100%"}}>
                <TextField id="search" fullWidth variant="outlined"  sx={{}} InputProps={{shrink: 0, sx: {borderRadius: 10}}} onBlur={HadnleOnBlur} onClick={HandleOnClick} label={search=== "" ? "Search": ""} onChange={HandleOnChange}/>
            </Container>
            <Container sx={{width: "25%", display: "flex", justifyContent: "flex-end"}}>
                <Button sx={{fontSize: "1.5em"}} onClick={() => setDrawerIsOpen(true)} > &#9776; </Button>
            </Container>
          </Toolbar>
        </AppBar>

        <Drawer anchor="right" open={drawerIsOpen} onClose={() => setDrawerIsOpen(false)}>
            <Box width={"300px"} sx={{display: "flex", flexDirection: "column", padding: "25px"}}>
                <Link href="/" sx={[styles.HeaderLink]}>Home</Link>
                <Link href="/discover" sx={[styles.HeaderLink]}>Discover</Link>
                <Link href="/about" sx={[styles.HeaderLink]}>About</Link>
                <Link href="/login" sx={[styles.HeaderLink]}>Login</Link>
                <Link href="/register" sx={[styles.HeaderLink]}>Register</Link>
            </Box>
        </Drawer>
    </>
 )   
}
'use client'
import "./globals.css";
import LoggedHeader from "./layouts/LoggedHeader";
import NotLoggedHeader from "./layouts/NotLoggedHeader";
import LoggedMobileHeader from "./layouts/LoggedMobileHeader";
import NotLoggedMobileHeader from "./layouts/NotLoggedMobileHeader";
import { Box } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./index";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true);
  const [Width, setWidth] = useState(1920);
  const [uuid, setUuid] = useState('')

  useEffect(() => {
    const onResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUuid(user.uid);
      } else {
        setIsLoggedIn(false);
      }
    });

    //cleanup
    return () => {
      unsubscribe();
    };
  }, []);
    
  return (
    <html lang="en">
      <body>
        <Box sx={{padding: "25px"}}>
          {Width < 900 ? isLoggedIn ? <LoggedMobileHeader /> : <NotLoggedMobileHeader /> : isLoggedIn ? <LoggedHeader /> : <NotLoggedHeader />}
        </Box>
        <Box sx={{padding: "25px", display: "flex", justifyContent: "center"}}>
          {children}
        </Box>
      </body>
    </html>
  );
}

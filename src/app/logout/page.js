"use client"
import { redirect } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../index";
import { useEffect } from "react";

export default function LogoutPage() {

    function logout() {
        signOut(auth).then(() => {
            console.log('User signed out');
            redirect('/');
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        console.log('logging out');
        logout();
    }, []);

    return (<></>);
}
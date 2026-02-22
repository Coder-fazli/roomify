import puter from "@heyputer/puter.js";


export async function signIn(){
    return await puter.auth.signIn();
}

export function signOut(){
    return puter.auth.signOut();
}

export async function getCurrentUser(){
 try {
    return await puter.auth.getUser();
 } catch (error) {
    return null;
 }
}
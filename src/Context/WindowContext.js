import { createContext, useEffect, useState } from "react";

export const WindowSize = createContext(null);
export default function WindowContext({children}) {
    const [windowSize , setWindowSize]= useState(window.innerWidth);
    useEffect(()=>{
        function setWIndowWidth(){
            setWindowSize(window.innerWidth);
        }
        window.addEventListener('resize',setWIndowWidth);

        //cleanUP Functio/n
        return () => {
            window.removeEventListener('resize' , setWIndowWidth)
        }
    },[])

    return <WindowSize.Provider value={{windowSize , setWindowSize}}>{children}</WindowSize.Provider>
}
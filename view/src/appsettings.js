import React,{createContext,useState,} from "react";

export const AppSettingsContext = createContext({
    token:'',
    assignToken:()=>{

    }
});
const AppSetting =({children}) =>{
const [token , setToken] = useState('');
const assignToken =(token)=>setToken(token);
const payload = {token,assignToken};
    return(<AppSettingsContext.Provider value={payload}>{children}</AppSettingsContext.Provider>);
};
export default AppSetting;
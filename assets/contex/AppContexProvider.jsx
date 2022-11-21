import { createContext } from "react";
import { useState } from "react";

const VentasContex = createContext();

const AppContexProvider = ({ children }) => {
    const [vendedores, SetVendedores] = useState([]);
    const [placeHolder, setPlaceholder] = useState(false);
    return (
        <VentasContex.Provider
            value={{
                vendedores, SetVendedores,
                placeHolder, setPlaceholder
            }}
        >
            {children}
        </VentasContex.Provider>
    )
}
export {
    AppContexProvider
}
export default VentasContex;
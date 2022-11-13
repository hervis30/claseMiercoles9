import { createContext } from "react";
import { useState } from "react";

const VentasContex = createContext();

const AppContexProvider = ({ children }) => {
    const [vendedores, SetVendedores] = useState([]);
    const [totalComision, setTotalComision] = useState(12456);
    return (
        <VentasContex.Provider
            value={{
                vendedores, SetVendedores,
                totalComision, setTotalComision
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
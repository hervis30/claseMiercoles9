import { useContext } from "react";
import VentasContex from "../contex/AppContexProvider";


const useVentas = () => {

    return useContext(VentasContex);
}

export default useVentas;


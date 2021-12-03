import { ProductsContext } from "../../contexts/ProductsContext";
import { useContext } from 'react';
import Clear from "../buttonClear/Clear";
import "../buttonClear/Clear.css";
import '../../App.css';

const Title = () => {

    const { totalItems } = useContext(ProductsContext);
    return (
        <div className="div-f">
            <h1 className="title-header">Almacén</h1>
            {
                (totalItems > 0) ? (
                    <Clear className="button-clear" />
                ) : (
                    <></>
                )

            }
        </div>
    )
}

export default Title;
import React from "react";

const KitchenData = ({recipe:{name,stock,production}}) => {
    
    return(
        <>
            <tr>
                <td>{name}</td>
                <td>{stock}</td>
                <td>{production}</td>
            </tr>
        </>
    )
}

export default KitchenData;
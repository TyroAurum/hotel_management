import React from "react";

const BillRecipe = ({recipe:{fid,fname,qty,price}}) => {
    
    return(
        <>
            <tr>
                <td>{fid}</td>
                <td>{fname}</td>
                <td>{qty}</td>
                <td>{price}</td>
            </tr>
        </>
    )
}

export default BillRecipe;
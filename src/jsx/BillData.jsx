import React from "react";

const BillData = ({record:{date,items,price}}) => {
    
    return(
        <>
            <tr>
                <td>{date}</td>
                <td>{items}</td>
                <td>{price}</td>
            </tr>
        </>
    )
}

export default BillData;
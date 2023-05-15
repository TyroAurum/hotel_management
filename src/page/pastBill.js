import React, { useState } from "react";
import { Table } from "reactstrap";
import HotelName from "../jsx/Hotelname";
import './pastBill.css';
import BillData from "../jsx/BillData";
import axios from "axios";

function PastBill() {
    const BaseURL = "http://localhost:5000"
    const [record,setRecord] = useState([]);
    axios.get(`${BaseURL}/getbilledlist`).then((response)=>{
        console.log(response.data);
        setRecord(response.data)
    })

    return (
        <>
        <div>
            <HotelName />
            <div>
                <Table className="pastbill-table" >
                    <thead>
                        <th>Timestamp</th>
                        <th>Items</th>
                        <th>Price</th>
                    </thead>
                    <tbody>
                        {record.map((value)=>(<BillData record={value}/>))}
                    </tbody>
                </Table>
            </div>
        </div>
        </>
    )
}

export default PastBill;
import React, { useState } from "react";
import { Form, Input, Button } from "reactstrap";
import './inventAdd.css'
import HotelName from "../jsx/Hotelname";
import axios from "axios";

function InventoryAdd() {
    const BaseURL = "http://localhost:5000"
    const [recipe,setRecipe] = useState({id:"",name:"",price:""});


    const handleChange = (e)=>{
        const{name,value} = e.target;
        setRecipe({...recipe,[name]:value});
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post(`${BaseURL}/addinventory`,recipe)
        window.location.reload();
    }

    return (
        <>
        <div className="invent-addsec-outer">
            <HotelName />
            <div className="invent-addsec">
                <Form onSubmit={handleSubmit}>
                    <h1>Add Invetory</h1>
                    <Input type="text" placeholder="ID" name="id" value={recipe.id} onChange={handleChange}/>
                    <Input type="text" placeholder="Recipe" name="name" value={recipe.name} onChange={handleChange}/>
                    <Input type="number" placeholder="Price" name="price" value={recipe.price} onChange={handleChange}/>
                    <Button type="submit" >ADD</Button>
                </Form>
            </div>
        </div>
        </>
    )
}

export default InventoryAdd;
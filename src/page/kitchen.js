import React from "react";
import { Table,Input, Form, Button } from "reactstrap";
import { useState } from "react";
import './home.css'
import HotelName from "../jsx/Hotelname";
import axios from "axios";
import KitchenData from "../jsx/kitchendata";

function Kitchen() {
    const BaseURL = "http://localhost:5000"
    const [recipe,setRecipe] = useState({id:"",value:0,name:""})
    const [item,setItem] = useState([]);


    axios.get(`${BaseURL}/getproduction`).then((response)=>{
        setItem(response.data);
    })

    const getName = (id) => {
        return new Promise((resolve, reject) => {
          axios.get(`${BaseURL}/getinventory/${id}`)
            .then((response) => {
            recipe.name = response.data.name;
            resolve(response.data.name);
            })
            .catch((error) => {
              reject(error);
            });
        });
      };

    const handleChange = (e)=>{
        const{name,value} = e.target;
        setRecipe({...recipe,[name]:value});
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const name = await getName(recipe.id);
        setRecipe({...recipe,name})
        await axios.post(`${BaseURL}/addproduction`,recipe);
        window.location.reload();
        
    }   

    return (
        <>
        <div className="out-sec">
            <HotelName />
            <div className="in-sec-data">
                <Form onSubmit={handleSubmit}>
                <div className="in-sec-input-div">
                    <Input className='bill-input' type="text" placeholder="ID" name="id" value={recipe.id??""} onChange={handleChange}/>
                    {/* <Input className='bill-input' type="number" placeholder="In Stock" name="stock" value={recipe.stock} onChange={handleChange}/> */}
                    <Input className='bill-input' type="number" placeholder="Quantity in Production" name="value" value={recipe.value??""} onChange={handleChange} />
                </div>
                <Button id="in-sec-sub" type="submit">COOK</Button>
                </Form>
            </div>
            <div className="in-sec2">
                <div className="in-sec2-tab1">
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Recipe</th>
                                <th>IN Stock</th>
                                <th>IN Production</th>
                            </tr>
                        </thead>
                        <tbody>
                            {item.map((val)=>(<KitchenData recipe={val} />))}
                        </tbody>
                    </Table>
                </div>
            </div>
            </div>
        </>
    )
}

export default Kitchen;
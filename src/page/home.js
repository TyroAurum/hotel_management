import React, { useEffect } from "react";
import './home.css'
import { Input, Table, Form, Button } from "reactstrap";
import HotelName from "../jsx/Hotelname.jsx";
import { useState } from "react";
import BillRecipe from "../jsx/billRecipe";
import KitchenData from "../jsx/kitchendata";
import Axios from "axios";

function Billing() {
    const BaseURL = "http://localhost:5000"
    const initialValue = {fid:"", fname:"", qty:"",price:""}
    const [formValues,setFormValues] = useState(initialValue);
    const [billData,setBillData] = useState([]);
    const [stock,setStock] = useState([]);
    
    
    useEffect(()=>{},[billData])
    useEffect(()=>{localStorage.setItem('Tprice',0);},[]);


    Axios.get(`${BaseURL}/getproduction`)

    const handleChange = (e)=>{
        const{name,value} = e.target;
        setFormValues({...formValues,[name]:value});
    }


      
    const getPrice = (id) => {
        return new Promise((resolve, reject) => {
          Axios.get(`${BaseURL}/getinventory/${id}`)
            .then((response) => {
              resolve(response.data.price);
            })
            .catch((error) => {
              reject(error);
            });
        });
      };

      const getName = (id) => {
        return new Promise((resolve, reject) => {
          Axios.get(`${BaseURL}/getinventory/${id}`)
            .then((response) => {
              resolve(response.data.name);
            })
            .catch((error) => {
              reject(error);
            });
        });
      };

      
    
      
    


    const handleSubmit = async (e)=>{
        e.preventDefault()    //TO prevent the refreshing of page after click
        var pprice = await getPrice(formValues.fid)
        formValues.price = pprice
        var oldprice = isNaN(localStorage.getItem('Tprice'))?0:localStorage.getItem('Tprice');
        var newprice = parseInt(oldprice) + parseInt(pprice);
        localStorage.setItem('Tprice',newprice)
        formValues.fname = await getName(formValues.fid)
        setBillData(billData=>[...billData,formValues])  //setStateVariable(oldvalue=>[...oldvalue,newvalue to be added])
        setFormValues(initialValue)

    }

    const stocklist = () =>{
        Axios.get(`${BaseURL}/getproduction`).then((response)=>{
            setStock(response.data);
        })
    }
    stocklist();


    const Billit = () =>{
        Axios.post(`${BaseURL}/billedlist`,{
            params: {
                items: billData,
                price: localStorage.getItem('Tprice')
            }
        })
        setBillData([]);
    }


    return(
        <div className="out-sec">
            <HotelName />
            <div className="in-sec-data">
                <Form>
                <div className="in-sec-input-div">
                    <Input auto className='bill-input' type="text" placeholder="ID" name="fid" value={formValues.fid} onChange={handleChange}/>
                    {/* <Input className='bill-input' type="text" placeholder="Recipe name" name="fname" value={formValues.fname} onChange={handleChange}/> */}
                    <Input className='bill-input' type="number" placeholder="Quantity" name="qty" value={formValues.qty} onChange={handleChange} />
                </div>
                <Input id="in-sec-sub" type="submit" onClick={handleSubmit}/>
                </Form>
            </div>
            <div className="in-sec2">
                <div className="in-sec2-tab1">
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Recipe</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                          {billData.map((value)=>(<BillRecipe recipe={value}/>))}
                        </tbody>
                    </Table>
                </div>
                <div className="in-sec2-tab2">
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Stock</th>
                                <th>Production</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stock.map((value)=>(<KitchenData recipe={value} />))}
                        </tbody>
                    </Table>
                </div>
            </div>
                <Button id="homepage-main-submit" type="button" onClick={Billit}>Bill</Button>
        </div>
    )
}

export default Billing;
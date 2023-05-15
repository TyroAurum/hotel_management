import React from "react";
import { Button, Nav, NavLink, NavbarText } from "reactstrap";
import './menu.css'

function Menu() {
    return (
        <>
        <div className="menu-maindiv">
                <div className="menu-sec">
                <h1>MENU</h1>
                <Nav vertical>
                    <NavLink href="/addInventory"><NavbarText ><Button>Add Inventory</Button></NavbarText></NavLink>
                    <NavLink href="/pastBills"><NavbarText ><Button>Past Bills</Button></NavbarText></NavLink>
                    <NavLink href="/kitchen"><NavbarText ><Button>Kitchen</Button></NavbarText></NavLink>
                    <NavLink href="/" ><NavbarText ><Button>Home</Button></NavbarText></NavLink>
                </Nav>
            </div>
        </div>
        </>
    )
}

export default Menu;
import React from "react";
import { Button, Nav, NavLink, Navbar} from "reactstrap";
import './Hotelname.css'

const HotelName = ()=>{
    return(
        <>
        <div>
            <div className="hotel-main-div">
                <Navbar>
                    <NavLink><span id="pandian">Pandian Mess</span></NavLink>
                    <div className="hotel-sub-div">
                    <Nav id="hotel-banner-nav">
                        <NavLink className="hotel-banner-link" href="/menu"><Button>Menu</Button></NavLink>
                        <NavLink className="hotel-banner-link" href="/"><Button>Billing</Button></NavLink>
                    </Nav>
                    </div>
                </Navbar>
            </div>
        </div>
        </>
    )
}

export default HotelName;
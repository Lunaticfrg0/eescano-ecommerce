import Button from "../button/button.component";
import {useNavigate} from "react-router-dom"
import { CartContext } from "../../contexts/cart.context";
import CartItem from "../cart-item/cart-item.component";
import { useContext } from "react";

import "./cart-dropdown.styles.scss"

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext)
    const navigate = useNavigate()

    const gotToCheckoutHandler = () => {
        navigate('/checkout')
    }
    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map((item ) => (
                    <CartItem key={item.id} cartItem={item}></CartItem>
                ))}
            </div>
            <Button onClick={gotToCheckoutHandler}>Go to Checkout</Button>
        </div>
    )
    
}

export default CartDropdown;
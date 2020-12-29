import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { addToCart } from '../actions/CartAction';
import { Link } from 'react-router-dom';
import MessageBox from "../components/MessageBox";
import "../styles/Cart.css"


const Cart = (props) => {

    const productID = props.match.params.id;
    const qty = props.location.search ? 
        Number(props.location.search.split('=')[1])
        : 1;

    
    const cart = useSelector((state) => state.cart);
    const { cartItems, error } = cart;

    const dispatch = useDispatch();

    useEffect(() => {
        if(productID){
            dispatch(addToCart(productID,qty));
        }
    }, [dispatch, productID, qty])


    const removeFromCart = (id) =>{
        //fewwf
    }

    const checkOut =() =>{
        props.history.push("/signin?redirect=shipping")
    }

    return (
        <div className="row-top">
            <div className="col-4">
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <MessageBox>
                        Cart is empty. <Link to="/">Go Shopping</Link>
                    </MessageBox>
                ) : (
                    <ul>
                        {
                            cartItems.map((item)=>(
                                <li key={item.product}>
                                    <div className="row1">
                                        <div className="small">
                                            <img src={item.image}
                                            alt= ""
                                            ></img>
                                        </div>

                                        <div className="min-30">
                                            <Link to={`/prodcut/${item.product}`}>{item.name}</Link>
                                        </div>
                                        <div className="qty-select">
                                            <select value={item.qty} 
                                            onChange={(e) => 
                                            dispatch(addToCart(item.product,Number(e.target.value)))
                                            }>
                                            {
                                                [...Array(item.stock).keys()].map((x)=>(
                                                    <option value={x+1}>{x+1}</option>
                                                ))
                                            }
                                            </select>
                                        </div>
                                        <p>${item.price}</p>
                                        <div className="remove-btn">
                                            <button type="button" onClick={() => removeFromCart(item.product)}>Remove</button>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                )}
            </div>

            <div className="col-5">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                                Subtotal ({cartItems.reduce((a,c) => a + c.qty,0)} items) : $
                                {cartItems.reduce((a,c)=> a + c.price * c.qty, 0)}
                            </h2>
                        </li>
                        <li>
                            <button type="button" onClick={checkOut}
                            className="checkout-btn"
                            disabled={cartItems.length === 0}
                            >
                                Proceed to Checkout
                            </button>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default Cart

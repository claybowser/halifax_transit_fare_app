import { createContext, useState } from "react";
import { productsArray, getProductData } from "./productStore.jsx";

export const CartContext = createContext({
    items: [],
    getProductQuantity: () => {}, //says function should be here
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {},
});

export function CartProvider({children}) {
    
    const [cartProducts, setCartProducts] = useState([]);

    //{{ id: 1, quantity: 2}}

    function getProductQuantity(id) {
        const quantity = cartProducts.find(product => product.id === id)?.quantity //if undefined dont ask for quantity if it exists then get quantity
        if (quantity === undefined) {
            return 0;
        }

        return quantity;
    }

    function addOneToCart(id) {
        const quantity = getProductQuantity(id);

        if (quantity === 0) { //product is not in cart
            setCartProducts(
                [
                    ...cartProducts,//take objects in cart and put infront of array
                    {
                        id: id,
                        quantity: 1
                    }
                ]
            )
        } else { //product is in cart
            setCartProducts(
                cartProducts.map(
                    product =>
                    product.id === id
                    ? { ...product, quantity: product.quantity + 1} //if statement is true
                    : product
                )
            )
        }
    }

    function removeOneFromCart(id) {
        const quantity = getProductQuantity(id);

        if (quantity == 1) {
            deleteFromCart(id);
        } else {
            setCartProducts(
                cartProducts.map(
                    product =>
                    product.id === id
                    ? { ...product, quantity: product.quantity - 1} //if statement is true
                    : product
                )
            )
        }
    }

    function deleteFromCart(id) {
        setCartProducts(
            cartProducts => //get current state
            cartProducts.filter(currentProduct => {
                return currentProduct.id != id;
            })//if object meets condition add object to array
        )
    }

    function getTotalCost() {
        let totalCost = 0;
        cartProducts.map((cartItem) => {
            const productData = getProductData(cartItem.id);
            totalCost += (productData.price * cartItem.quantity)
        });
        return totalCost;
    }

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,

    }
    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;
//code funcitons down here

//context (cart, addToCart, removeCArt)
//provider -> gives ur react app access to all the things in your contaxt
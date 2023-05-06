import { useUIContext } from "../context/ui";

const useCart = (product) => {
  const { cart, setCart } = useUIContext();

  const addToCart = () => {
    cart.findIndex((cartItem) => cartItem.id === product.id) >= 0
      ? setCart(cart.filter((cartItem) => cartItem.id !== product.id))
      : setCart([...cart, product]);
  };

  const addToCartText =
    cart.findIndex((cartItem) => cartItem.id === product.id) >= 0
      ? "Remove from cart"
      : "Add to cart";

  return { addToCart, addToCartText };
};

export default useCart;

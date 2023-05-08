import { useUIContext } from "../context/ui";

const useWishlist = (product) => {
  const { wishlist, setWishlist } = useUIContext();

  const handleLikeClick = () => {
    wishlist.findIndex((item) => item.id === product.id) >= 0
      ? setWishlist(wishlist.filter((item) => item.id !== product.id))
      : setWishlist([...wishlist, product]);
  };

  const wishlistActionText =
    wishlist.findIndex((item) => item.id === product.id) >= 0
      ? "Remove from wishlist"
      : "Add to wishlist";

  return { handleLikeClick, wishlistActionText };
};

export default useWishlist;

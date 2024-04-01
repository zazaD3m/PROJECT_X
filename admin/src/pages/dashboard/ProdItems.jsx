import { useSelector } from "react-redux";
import {
  useAddProductToWishlistMutation,
  useRemoveProductFromWishlistMutation,
} from "../../features/user/userApiSlice";
import { selectProductById } from "../../features/products/productsApiSlice";
import { selectWishlist } from "../../features/user/userSlice";

const ProdItems = ({ id }) => {
  const wishlist = useSelector(selectWishlist);
  const p = useSelector((state) => selectProductById(state, id));
  const [addProductToWishlist] = useAddProductToWishlistMutation();
  const [removeProductFromWishlist] = useRemoveProductFromWishlistMutation();

  const handleClick = () => {
    const product = {
      price: p.price,
      sale: p.sale,
      slug: p.slug,
      title: p.title,
      size: p.size,
      images: { 1: p.images[1] },
      _id: p._id,
    };

    if (wishlist.every((w) => w._id !== p._id)) {
      addProductToWishlist(product);
    } else {
      removeProductFromWishlist(product);
    }
  };
  return <li onClick={() => handleClick()}>{p.title}</li>;
};
export default ProdItems;

import { useSelector } from "react-redux";
import { selectWishlist } from "../../features/user/userSlice";

const Wishlists = () => {
  const wishlist = useSelector(selectWishlist);

  return wishlist.map((w) => (
    <li
      key={w._id}
      onClick={() => {
        console.log(w);
      }}
    >
      {w.title}
    </li>
  ));
};
export default Wishlists;

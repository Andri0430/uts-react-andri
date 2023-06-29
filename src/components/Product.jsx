import Button from "./Button";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function Product({
  id,
  name,
  image,
  price,
  products,
  setEditProduct,
  editProduct,
  setEditRadio,
  editRadio,
  setCart,
  cart,
}) {
  return (
    <div className="product">
      <img src={image} alt={name} />
      <div>{name}</div>
      <div>Rp.{price.toLocaleString()}</div>
      <div className="cont-btn">
        <Button
          onClick={() => {
            setEditProduct({ id, name, image, price });
            setEditRadio(!editRadio);
            console.log(editProduct);
          }}
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            if (cart.find((cart) => cart.id == id)) {
              setCart(
                cart.map((p) =>
                  p.id === id
                    ? {
                        ...p,
                        count: p.count + 1,
                      }
                    : p
                )
              );
            } else {
              products.map(
                (product) =>
                  product.id === id &&
                  setCart([...cart, { ...product, count: 1 }])
              );
            }
          }}
        >
          Beli
        </Button>
      </div>
    </div>
  );
}

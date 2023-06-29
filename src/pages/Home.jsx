import { useState } from "react";
import Product from "../components/Product";
import Button from "../components/Button";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "../components/Button.css";

export default function Home() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "iPhone 14 Pro",
      image:
        "https://www.apple.com/v/home/bb/images/heroes/iphone-14-pro/hero_iphone14pro_spring__9xo85pm6sbmm_small.jpg",
      price: 30000000,
    },
    {
      id: 2,
      name: "MacBook Air 15",
      image:
        "https://www.apple.com/v/home/bb/images/heroes/macbook-air-15/hero_macbook_air_15__x63n8tqcpo2u_small.jpg",
      price: 40000000,
    },
    {
      id: 3,
      name: "Apple Vision Pro",
      image:
        "https://www.apple.com/v/home/bb/images/promos/apple-vision-pro/promo_apple_vision_pro__f4v4zp0sum2y_small.jpg",
      price: 50000000,
    },
    {
      id: 4,
      name: "Apple Watch",
      image:
        "https://www.apple.com/v/home/bb/images/promos/apple-watch-series-8/promo_apple_watch_series_8_spring__d9hfvufh7hyu_small.jpg",
      price: 2000000,
    },
    {
      id: 5,
      name: "iPad Pro",
      image:
        "https://www.apple.com/v/home/bb/images/promos/ipad-pro/promo_ipadpro__ch217v9v7no2_small.jpg",
      price: 10000000,
    },
    {
      id: 6,
      name: "iPhone 14 Pro",
      image:
        "https://www.apple.com/v/home/bb/images/heroes/iphone-14-pro/hero_iphone14pro_spring__9xo85pm6sbmm_small.jpg",
      price: 30000000,
    },
    {
      id: 7,
      name: "Apple Watch",
      image:
        "https://www.apple.com/v/home/bb/images/promos/apple-watch-series-8/promo_apple_watch_series_8_spring__d9hfvufh7hyu_small.jpg",
      price: 2000000,
    },
    {
      id: 8,
      name: "iPad Pro",
      image:
        "https://www.apple.com/v/home/bb/images/promos/ipad-pro/promo_ipadpro__ch217v9v7no2_small.jpg",
      price: 10000000,
    },
    {
      id: 9,
      name: "iPhone 14 Pro",
      image:
        "https://www.apple.com/v/home/bb/images/heroes/iphone-14-pro/hero_iphone14pro_spring__9xo85pm6sbmm_small.jpg",
      price: 30000000,
    },
  ]);

  const [newProduct, setNewProduct] = useState({});
  const [keywords, setKeywords] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [editRadio, setEditRadio] = useState(false);
  const [editProduct, setEditProduct] = useState();
  const [page, setPage] = useState(1);
  const [cartDialog, setCartDialog] = useState(false);
  const [cart, setCart] = useState([]);

  const sortFilteredProduct = products
    .toSorted((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy] < b[sortBy] ? -1 : 1;
      } else {
        return a[sortBy] > b[sortBy] ? -1 : 1;
      }
    })
    .filter(
      (product) =>
        product.name.toLowerCase().includes(keywords) &&
        product.price >= minPrice &&
        product.price <= maxPrice
    );

  return (
    <main>
      <div className="container-filter">
        <form>
          <label>
            Search :
            <input
              type="text"
              onChange={(e) => setKeywords(e.target.value.toLowerCase())}
            />
          </label>
          <label>
            Min Price :
            <input
              type="number"
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </label>
          <label>
            Max Price :
            <input
              type="number"
              onChange={(e) => setMaxPrice(e.target.value || Infinity)}
            />
          </label>
          <select onChange={(e) => setSortBy(e.target.value)}>
            <option value="id">Normal</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
          <select onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="dsc">Descending</option>
          </select>
          <Button
            onClick={(e) => {
              e.preventDefault();
              setCartDialog(!cartDialog);
            }}
          >
            <AiOutlineShoppingCart size={20} />
            {cart.length}
          </Button>
        </form>
      </div>
      <div className="container">
        <div className="wrapper">
          <form onSubmit={() => setProducts([...products, newProduct])}>
            <label>
              ID :
              <input
                type="text"
                onChange={(e) => {
                  setNewProduct({ ...newProduct, id: e.target.value });
                }}
              />
            </label>
            <label>
              Name :
              <input
                type="text"
                onChange={(e) => {
                  setNewProduct({ ...newProduct, name: e.target.value });
                }}
              />
            </label>
            <label>
              Image :
              <input
                type="text"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
              />
            </label>
            <label>
              Price :
              <input
                type="number"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
            </label>
            <div>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setProducts([newProduct, ...products]);
                }}
              >
                Depan
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setProducts([...products, newProduct]);
                }}
              >
                Belakang
              </Button>
            </div>
          </form>
          <div>
            <Button onClick={() => setProducts(products.slice(1))}>
              Hapus Depan
            </Button>
            <Button onClick={() => setProducts(products.slice(0, -1))}>
              Hapus Belakang
            </Button>
          </div>
        </div>
        <div className="wrap-product">
          <div className="cont-product">
            {sortFilteredProduct.length > 0
              ? sortFilteredProduct
                  .filter((_product, i) => i >= 3 * page - 3 && i < 3 * page)
                  .map((product) => (
                    <Product
                      {...product}
                      key={product.id}
                      editProduct={editProduct}
                      setEditProduct={setEditProduct}
                      editRadio={editRadio}
                      setEditRadio={setEditRadio}
                      cartDialog={cartDialog}
                      setCartDialog={setCartDialog}
                      cart={cart}
                      setCart={setCart}
                      products={products}
                    />
                  ))
              : "Product Tidak Di Temukan!!!"}
          </div>
          <div className="container-page">
            <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
              Sebelumnya
            </Button>
            <div>{page}</div>
            <Button
              onClick={() => setPage(page + 1)}
              disabled={page === Math.ceil(sortFilteredProduct.length / 3)}
            >
              Selanjutnya
            </Button>
          </div>
        </div>
      </div>
      {editRadio && (
        <div className="edit-radio">
          <h2>Edit Product</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setProducts(
                products.map((product) =>
                  product.id === editProduct.id ? editProduct : product
                )
              );
            }}
          >
            <label>
              Name :{" "}
              <input
                type="text"
                value={editProduct.name}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    name: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Image :{" "}
              <input
                type="text"
                value={editProduct.image}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, image: e.target.value })
                }
              />
            </label>
            <label>
              Price :{" "}
              <input
                type="number"
                value={parseInt(editProduct.price)}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, price: e.target.value })
                }
              />
            </label>
          </form>
          <div>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setProducts(
                  products.map((product) =>
                    product.id == editProduct.id ? editProduct : product
                  )
                );
                setEditRadio(!editRadio);
              }}
            >
              Simpan
            </Button>
            <Button onClick={() => setEditRadio(!editRadio)}>Batal</Button>
          </div>
        </div>
      )}
      {cartDialog && (
        <div className="edit-radio">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Jumlah</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.length > 0
                ? cart.map((c) => (
                    <tr key={c.id}>
                      <th>{c.id}</th>
                      <th>{c.name}</th>
                      <th>{c.price}</th>
                      <th>{c.count}</th>
                      <th style={{ display: "flex", gap: "8px" }}>
                        <Button
                          onClick={() => {
                            if (c.count > 1) {
                              setCart(
                                cart.map((p) =>
                                  p.id == c.id
                                    ? { ...p, count: p.count - 1 }
                                    : p
                                )
                              );
                            } else {
                              setCart(cart.filter((cart) => cart.id !== c.id));
                            }
                          }}
                        >
                          Kurangi
                        </Button>
                        <Button
                          onClick={() =>
                            setCart(
                              cart.map((cart) =>
                                cart.id === c.id
                                  ? { ...cart, count: cart.count + 1 }
                                  : cart
                              )
                            )
                          }
                        >
                          Tambah
                        </Button>
                      </th>
                    </tr>
                  ))
                : "Keranjang Kosong"}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

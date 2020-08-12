import React, { useEffect, useState } from "react";
import { fetchProducts } from "../service/productService";
import { sendDeviceToken } from "../service/notificationService";

const ProductCategory = () => {
  const [data, setData] = useState(null);
  const [sent, setSent] = useState(false);
  useEffect(() => {
    (async function () {
      const result = await fetchProducts()
      setData(() => {
        console.log('call set data');
        return result
      });
      console.log('data set');
    })();

    (async function () {
      await sendDeviceToken();
      console.log('device sent');
      setSent(true);
    })();
  }, []);
  return (
    <div>
      {sent && <div>device sent</div>}
      {data &&
        data.map(({ id, name }) => (
          <div key={id}>
            <h2>{name}</h2>
          </div>
        ))}
    </div>
  );
};

export default ProductCategory;

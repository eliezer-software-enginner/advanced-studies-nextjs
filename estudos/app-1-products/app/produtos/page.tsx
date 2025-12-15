import ProductTable from '../components/ProductTable';
import { ProductService } from '../services/ProductService/ProductService';
import styles from './page.module.css';

export default async function Products() {
  const service = new ProductService();
  const products = await service.listProducts();
  //const products = productsMock;
  //const serializableProducts = JSON.parse(JSON.stringify(products));

  return (
    <div className={styles.container}>
      <h1>Lista de produtos</h1>
      {/* <ProductTable products={serializableProducts} /> */}
      <ProductTable products={products} />
    </div>
  );
}

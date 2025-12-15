import axios from 'axios';
import { Product } from './ProductModel';

class ProductService {
  url = 'https://dummyjson.com/products';

  async listProducts() {
    try {
      const list = (await axios.get(this.url)).data.products as Product[];
      return list;
    } catch (e: any) {
      return [];
    }
  }

  async findProductById(id: string) {
    try {
      this.validadeId(id);
      const list = (await axios.get(`${this.url}/${id}`)).data as Product;
      return list;
    } catch (e: any) {
      throw e;
    }
  }

  private validadeId(id: string) {
    if (id.trim() == '') {
      throw new Error('Id is empty');
    }

    if (Number.isNaN(id.trim())) {
      throw new Error('Id is not a number, current value is: ' + id);
    }
  }
}

export { ProductService };

import { ProductService } from '../ProductService';

describe('testes em Product Service', () => {
  let service: ProductService;

  beforeEach(() => {
    service = new ProductService();
  });

  test('deve trazer produtos', async () => {
    const list = await service.listProducts();
    expect(list.length).toBeGreaterThan(0);
  });

  test('deve trazer produto pelo id', async () => {
    const product = await service.findProductById('1');
    expect(product).toBeDefined();
  });

  test('deve lançar erro ao buscar por id incorreto', async () => {
    const ids = ['', 'abc'];

    const errosEsperados = 2;
    let cont = 0;

    for (let id of ids) {
      try {
        const product = await service.findProductById(id);
      } catch (e: any) {
        cont++;
      }
    }

    expect(cont).toEqual(errosEsperados);
  });
});

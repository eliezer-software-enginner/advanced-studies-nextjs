import { Card, CardDescription, CardTitle } from '@/components/ui/card';

export default async function Dashboard() {
  const [sensiveis, metricas, estaveis] = await Promise.all([
    //  🔹 Dados sensíveis (no-store)
    fetch('https://dummyjson.com/carts/1', {
      cache: 'no-store',
    }).then((res) => res.json()),

    //🔹 Dados de métricas (revalidate)
    fetch('https://dummyjson.com/products?limit=5', {
      next: {
        revalidate: 10,
      },
    }).then((res) => res.json()),

    //🔹 Dados estáveis (cache padrão)
    fetch('https://dummyjson.com/users', {
      cache: 'force-cache',
    }).then((res) => res.json()),
  ]);

  return (
    <>
      <Header />

      <h1>Bem vindo ao dashboard</h1>

      <Card>
        <CardTitle>Itens no carrinho (usuário 1)</CardTitle>
        <CardDescription>
          {sensiveis.products.length} produtos: Expandir lista
        </CardDescription>
      </Card>

      <Card>
        <h2>Métricas</h2>
        <CardDescription>
          Total de produtos: {metricas.products.length}
        </CardDescription>
      </Card>

      <Card>
        <h2>Dados Estáveis</h2>

        <CardDescription>
          Total de usuários: {estaveis.users.length}
        </CardDescription>
      </Card>
    </>
  );
}

export function Header() {
  return (
    <div>
      <h1>Dashboard Operacional</h1>
    </div>
  );
}

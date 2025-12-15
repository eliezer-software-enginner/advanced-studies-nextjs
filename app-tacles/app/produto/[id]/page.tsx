// app/produto/[id]/page.tsx

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item';

import { ProductService } from '@/app/services/ProductService/ProductService';
import Image from 'next/image';
import styles from './page.module.css';

type props = {
  params: { id: string };
};

export default async function Product({ params }: props) {
  const resolvedParams = await params;

  const service = new ProductService();
  const produto = await service.findProductById(resolvedParams.id);

  return (
    // 2. Aplicando a classe para centralizar o card na tela
    <div className={styles.container}>
      {/* 3. Definindo uma largura máxima para o card */}
      <Card className={styles.productCard}>
        {/* Usamos CardHeader para o Título e a Descrição */}
        <CardHeader>
          <CardTitle className={styles.cardTitle}>{produto.title}</CardTitle>
          <CardDescription className={styles.cardDescription}>
            {produto.description}
          </CardDescription>
        </CardHeader>

        {/* 4. Criando um novo contêiner para a imagem e os detalhes */}
        <div className={styles.contentWrapper}>
          <div className={styles.imageSection}>
            <Image
              alt={`foto do produto ${produto.title}`}
              src={produto.thumbnail}
              // Ajustando width e height para preencher o contêiner e usando "fill"
              sizes='(max-width: 768px) 100vw, 300px'
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>

          {/* 5. Movendo os detalhes para CardContent, que agora será a seção de detalhes */}
          <CardContent className={styles.detailsSection}>
            <h3 className={styles.price}>${produto.price}</h3>
            <h4 className={styles.rating}>
              ⭐ Avaliação: {produto.rating} / 5.0
            </h4>

            {/* Agrupando as informações de lista */}
            <div className={styles.infoList}>
              <Item>
                <ItemContent>
                  <ItemTitle>Marca</ItemTitle>
                  <ItemDescription>{produto.brand}</ItemDescription>
                </ItemContent>
              </Item>
              <Item>
                <ItemContent>
                  <ItemTitle>Categoria</ItemTitle>
                  <ItemDescription>{produto.category}</ItemDescription>
                </ItemContent>
              </Item>
              <Item>
                <ItemContent>
                  <ItemTitle>SKU</ItemTitle>
                  <ItemDescription>{produto.sku}</ItemDescription>
                </ItemContent>
              </Item>
              <Item>
                <ItemContent>
                  <ItemTitle>Estoque</ItemTitle>
                  <ItemDescription>
                    {produto.availabilityStatus}
                  </ItemDescription>
                </ItemContent>
              </Item>
              <Item>
                <ItemContent>
                  <ItemTitle>Entrega</ItemTitle>
                  <ItemDescription>
                    {produto.shippingInformation}
                  </ItemDescription>
                </ItemContent>
              </Item>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

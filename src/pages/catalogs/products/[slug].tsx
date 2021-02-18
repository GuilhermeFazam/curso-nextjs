import { useRouter } from 'next/router';
import { Title } from '@/styles/pages/Home';
import { client } from '@/lib/priscmic';
import PriscmicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';
import { GetStaticPaths, GetStaticProps } from 'next';

interface ProductProps {
    product: Document;
}

export default function Products({ product }: ProductProps) {
    const router = useRouter();

    if (router.isFallback) {
        return <p>Carregando...</p>;
    }
    const productTitle = PriscmicDOM.RichText.asText(product.data.title);
    return (
        <main>
            <section>
                <Title>{productTitle}</Title>

                <div
                    dangerouslySetInnerHTML={{
                        __html: PriscmicDOM.RichText.asHtml(
                            product.data.descripition
                        ),
                    }}
                />
                <img
                    src={product.data.thumbnail.url}
                    alt={productTitle}
                    width="200"
                />
                <p>Preço: R${product.data.price}</p>
            </section>
        </main>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps<ProductProps> = async (context) => {
    const { slug } = context.params;

    const product = await client().getByUID('product', String(slug), {});

    return {
        props: {
            product,
        },
        revalidate: 5,
    };
};

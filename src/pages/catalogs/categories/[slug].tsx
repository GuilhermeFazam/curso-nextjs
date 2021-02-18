import { GetStaticPaths, GetStaticProps } from 'next';
import { Title } from '@/styles/pages/Home';
import { client } from '@/lib/priscmic';
import Priscmic from 'prismic-javascript';
import PriscmicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface CategoryProps {
    category: Document;
    products: Document[];
}

export default function Category({ category, products }: CategoryProps) {
    const router = useRouter();

    if (router.isFallback) {
        return <p>Carregando...</p>;
    }

    return (
        <main>
            <section>
                <Title>
                    {PriscmicDOM.RichText.asText(category.data.title)}
                </Title>
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            <Link href={`/products/${product.uid}`}>
                                <a>
                                    {PriscmicDOM.RichText.asText(
                                        product.data.title
                                    )}
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const categories = await client().query([
        Priscmic.Predicates.at('document.type', 'category'),
    ]);

    const paths = categories.results.map((category) => {
        return {
            params: { slug: category.uid },
        };
    });

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<CategoryProps> = async (
    context
) => {
    const { slug } = context.params;

    const category = await client().getByUID('category', String(slug), {});

    const products = await client().query([
        Priscmic.Predicates.at('document.type', 'product'),
        Priscmic.Predicates.at('my.product.category', category.id),
    ]);

    return {
        props: {
            category,
            products: products.results,
        },
        revalidate: 60,
    };
};

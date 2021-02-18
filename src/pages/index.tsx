import { GetServerSideProps } from 'next';
import { Title } from '@/styles/pages/Home';
import Link from 'next/link';
import SEO from '@/components/SEO';
import { client } from '@/lib/priscmic';
import Priscmic from 'prismic-javascript';
import PriscmicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';

interface HomeProps {
    recommendedProducts: Document[];
}

export default function Home({ recommendedProducts }: HomeProps) {
    return (
        <div>
            <SEO
                title="Curso NextJS"
                description="Teste de descripition"
                image="boost.png"
                shouldIndexPage
            />
            <main>
                <section>
                    <Title>Products</Title>
                    <ul>
                        {recommendedProducts.map((recommendedProduct) => (
                            <li key={recommendedProduct.id}>
                                <Link
                                    href={`/catalogs/products/${recommendedProduct.uid}`}
                                >
                                    <a>
                                        {PriscmicDOM.RichText.asText(
                                            recommendedProduct.data.title
                                        )}
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
    const recommendedProducts = await client().query([
        Priscmic.Predicates.at('document.type', 'product'),
    ]);

    return {
        props: {
            recommendedProducts: recommendedProducts.results,
        },
    };
};

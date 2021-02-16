import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Title } from '../styles/pages/Home';

interface IProduct {
    id: string;
    title: string;
}

interface HomeProps {
    recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {
    return (
        <div>
            <Head>
                <title>Curso NextJS</title>
            </Head>
            <main>
                <section>
                    <Title>Products</Title>
                    <ul>
                        {recommendedProducts.map((recommendedProduct) => (
                            <li key={recommendedProduct.id}>
                                {recommendedProduct.title}
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
    const response = await fetch('http://localhost:3333/recommended');
    const recommendedProducts = await response.json();

    return {
        props: {
            recommendedProducts,
        },
    };
};

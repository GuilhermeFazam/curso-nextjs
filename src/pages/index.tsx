import { GetServerSideProps } from 'next';
import { Title } from '@/styles/pages/Home';
import SEO from '@/components/SEO';

interface IProduct {
    id: string;
    title: string;
}

interface HomeProps {
    recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {
    async function handleSum() {
        console.log(process.env.NEXT_PUBLIC_API_URL);
        const math = (await import('../lib/math')).default;
        console.error(math.sum(3, 5));
    }

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
                                {recommendedProduct.title}
                            </li>
                        ))}
                    </ul>
                    <button type="submit" onClick={handleSum}>
                        Somar
                    </button>
                </section>
            </main>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recommended`
    );
    const recommendedProducts = await response.json();

    return {
        props: {
            recommendedProducts,
        },
    };
};

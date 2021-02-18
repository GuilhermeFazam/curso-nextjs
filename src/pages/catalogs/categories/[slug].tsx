import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Title } from '@/styles/pages/Home';

interface IProduct {
    id: string;
    title: string;
}

interface CategoryProps {
    products: IProduct[];
}

export default function Category({ products }: CategoryProps) {
    const router = useRouter();

    return (
        <main>
            <section>
                <Title>{router.query.slug}</Title>
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>{product.title}</li>
                    ))}
                </ul>
            </section>
        </main>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`
    );
    const categories = await response.json();
    const paths = categories.map((category) => {
        return {
            params: { slug: category.id },
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
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products?category_id=${slug}`
    );
    const products = await response.json();

    return {
        props: {
            products,
        },
        revalidate: 60,
    };
};

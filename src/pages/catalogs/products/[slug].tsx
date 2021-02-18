import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Title } from '@/styles/pages/Home';

const AddToCartModal = dynamic(() => import('@/components/AddToCartModal'), {
    loading: () => <p>Carregando...</p>,
    ssr: false,
});

export default function Products() {
    const router = useRouter();

    const [isModal, setIsModal] = useState(false);

    function handleAddToCart() {
        setIsModal(true);
    }
    return (
        <main>
            <section>
                <Title>{router.query.slug}</Title>

                <button type="submit" onClick={handleAddToCart}>
                    Add to Cart
                </button>

                {isModal && <AddToCartModal />}
            </section>
        </main>
    );
}

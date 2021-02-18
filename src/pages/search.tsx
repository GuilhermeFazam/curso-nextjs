import SEO from '@/components/SEO';
import { Title } from '@/styles/pages/Home';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { client } from '@/lib/priscmic';
import Priscmic from 'prismic-javascript';
import PriscmicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

interface SearchProps {
    searchResults: Document[];
}

export default function Search({ searchResults }: SearchProps) {
    const router = useRouter();
    const [searchinput, setSearchIput] = useState('');

    function handleSearch(e: FormEvent) {
        e.preventDefault();

        router.push(`/search?q=${encodeURIComponent(searchinput)}`);
        setSearchIput('');
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
                    <Title>Busca</Title>
                </section>

                <form onSubmit={handleSearch}>
                    <label htmlFor="busca">Digite a busca:</label>
                    <input
                        type="text"
                        value={searchinput}
                        name="busca"
                        id="busca"
                        onChange={(e) => setSearchIput(e.target.value)}
                    />
                    <button type="submit">Buscar</button>
                </form>
                <ul>
                    {searchResults.map((product) => (
                        <li key={product.id}>
                            <Link href={`/catalogs/products/${product.uid}`}>
                                <a>
                                    {PriscmicDOM.RichText.asText(
                                        product.data.title
                                    )}
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<SearchProps> = async (
    context
) => {
    const { q } = context.query;

    if (!q) {
        return {
            props: {
                searchResults: [],
            },
        };
    }

    const searchResults = await client().query([
        Priscmic.Predicates.at('document.type', 'product'),
        Priscmic.Predicates.fulltext('my.product.title', String(q)),
    ]);

    return {
        props: { searchResults: searchResults.results },
    };
};

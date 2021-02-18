import Priscmic from 'prismic-javascript';

export const apiEndpoint = 'https://guilhermecursonextjs.cdn.prismic.io/api/v2';

export const client = (req = null) => {
    const options = req ? { req } : null;
    return Priscmic.client(apiEndpoint, options);
};

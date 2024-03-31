export const domain = {
	development: 'https://cyclotic-fc537.web.app/',
	staging: 'https://cyclotic-fc537.web.app/',
	production: 'https://cyclo.dev/'
}[import.meta.env.MODE];

export const storage = {
    public: {
        base_url: 'https://firebasestorage.googleapis.com/v0/b/cyclotic-fc537.appspot.com/o',
    },
};

export default {
    storage,
    domain,
};
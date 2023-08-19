import { writable } from 'svelte/store';

const selectedProduct = writable(null);

export default selectedProduct;
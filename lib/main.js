'use babel';

import brotliProvider from './brotli-provider';

export default {
    getProvider() {
        return [brotliProvider];
    }
};

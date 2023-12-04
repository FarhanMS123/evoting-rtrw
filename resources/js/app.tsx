import './bootstrap.js';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from "react-dom/client";
import { ChakraProvider, extendBaseTheme, extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

const theme = extendTheme(withDefaultColorScheme({
    colorScheme: "red",
}), {
    styles: {
        global: {
            body: {
                bg: "gray.200",
            }
        },
    },
});

createInertiaApp({
    resolve: name => {
        /// @ts-ignore
        const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true })
        return pages[`./Pages/${name}.tsx`]
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <ChakraProvider theme={theme}>
                <App {...props} />
            </ChakraProvider>
        )
    },
});

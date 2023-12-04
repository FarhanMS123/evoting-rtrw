import '~/bootstrap.js';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from "react-dom/client";
import { ChakraProvider, extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import { type ReactNode } from 'react';

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

function Providers({ children }: {
    children: ReactNode;
}) {
  return <>
    <ChakraProvider
      theme={theme}
      toastOptions={{
        defaultOptions: {
          position: "top-right"
        }
      }}
    >
      { children }
    </ChakraProvider>
  </>;
}

function Wrapper({ children }: {
  children: ReactNode;
}) {
  return <>
    { children }
  </>;
}

createInertiaApp({
  resolve: name => {
    /// @ts-ignore
    const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true })
    return pages[`./Pages/${name}.tsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <Providers>
        <Wrapper>
          <App {...props} />
        </Wrapper>
      </Providers>
    )
  },
});

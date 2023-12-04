// import '~/bootstrap.js';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from "react-dom/client";
import { ChakraProvider, extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import { type ReactNode } from 'react';

type CreateInertiaAppOptions = Parameters<typeof createInertiaApp>[0];
type SetupOpts = Parameters<CreateInertiaAppOptions["setup"]>[0];

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
  el: HTMLElement;
} & Omit<SetupOpts, "el">) {
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
  el: HTMLElement;
} & Omit<SetupOpts, "el">) {
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
      <Providers {...{ el, App, props }}>
        <Wrapper {...{ el, App, props }}>
          <App {...props} />
        </Wrapper>
      </Providers>
    )
  },
});

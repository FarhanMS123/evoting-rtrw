// import '~/bootstrap.js';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from "react-dom/client";
import { ChakraProvider, type ContainerProps, extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import { type ReactNode } from 'react';
import Layout from './Components/Layout';

export type CreateInertiaAppOptions = Parameters<typeof createInertiaApp>[0];
export type SetupOpts = Parameters<CreateInertiaAppOptions["setup"]>[0];
export type CompProps = SetupOpts["props"]["initialComponent"] & {
  layout_props?: ContainerProps & {
    isDisabled?: boolean;
  };
};
export type PropsOpt = {
  initialComponent: CompProps;
} & Omit<SetupOpts["props"], "initialComponent">;
export type NewSetupOpts = {
  el: HTMLElement;
  props: PropsOpt;
} & Omit<SetupOpts, "el" | "props">;

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
} & NewSetupOpts) {
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
} & NewSetupOpts) {
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
  setup: ({ el, App, props }: NewSetupOpts) => {
    createRoot(el).render(
      <Providers {...{ el, App, props }}>
        <Wrapper {...{ el, App, props }}>
          <App {...props} />
        </Wrapper>
      </Providers>
    )
  },
});

// Esse arquivo não cria uma página. Tudo o que a gente colocar aqui, vai ser carregado em todas as páginas. Em volta de todas as páginas.

function EstiloGlobal() {
    return (
      <style global jsx>{`

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
        }

        body {
          font-family: 'Open Sans', sans-serif;
        }
        /* App fit Height */ 
        html, body, #__next {
          min-height: 100vh;
          display: flex;
          flex: 1;
        }
        #__next {
          flex: 1;
        }
        #__next > * {
          flex: 1;
        }
        /* ./App fit Height */ 

      `}</style>
    );
}

export default function Customizacao ({ Component, pageProps}){
    return (
        <>
        <EstiloGlobal />
        <Component {...pageProps} />        
        </>
    );    
    
}

// No React, quando se instala alguma lib ou se quer algo genérico, é comum colocar/configurar dentro desse arquivo. No nosso caso, a conf vai ser de CSS.
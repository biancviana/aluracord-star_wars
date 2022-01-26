// Primeiro código React rodando.

import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json'

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


//Outro componente React
function Titulo(props){
    console.log(props);
    const Tag = props.tag;
    return (
        <>
            <Tag>{props.children}</Tag>
        
            <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.primary['010']};
                font-size: 24px;
				font-weight: 600;
            }
            `} </style>
        </>

    );
}

// Componente React
/* function HomePage() {
    // JSX
    return (
        <div>
            <EstiloGlobal />
            <Titulo tag="h2">Bemaaa-vindo(a) ao lado negro da força!</Titulo>
            <h2>Discord - Alura Wars</h2>
        </div> 

    )
    
}
export default HomePage
*/

export default function PaginaInicial() {
    const username = 'biancviana';
  
    return (
      <>
        <EstiloGlobal />
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.primary[400],
            backgroundImage: 'url(https://images7.alphacoders.com/338/thumb-1920-338844.jpg)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.neutrals['000'],
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Titulo tag="h2">Faça parte do lado luminoso da força!</Titulo>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.primary['010'] }}>
                {appConfig.name}
              <h4>"Que a força esteja com você"</h4>
              </Text>
  
              <TextField
                fullWidth
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[999],
                    mainColor: appConfig.theme.colors.primary['111'],
                    mainColorHighlight: appConfig.theme.colors.primary['500'],
                    backgroundColor: appConfig.theme.colors.neutrals[200],
                  },
                }}
              />
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary['111'],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary['010'],
                }}
              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.neutrals[200],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals['050'],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}
                src={`https://github.com/${username}.png`}
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[500],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username}
              </Text>
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
  }
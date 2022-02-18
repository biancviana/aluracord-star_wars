// Primeiro código React rodando.
// Lembrete para mim mesma: dar um "npm run dev" pra subir o projeto.

import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router'
import appConfig from '../config.json'

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

// Primeiro Componente React
/* function HomePage() {
    // JSX
    return (
        <div>
            <EstiloGlobal />
            <Titulo tag="h2">Bem-vindo(a) ao lado negro da força!</Titulo>
            <h2>Discord - Alura Wars</h2>
        </div> 

    )
    
}
export default HomePage
*/

export default function PaginaInicial() {
    //const username = 'biancviana';
    const [username, setUsername] = React.useState('');
    const roteamento = useRouter(); //gancho do React para usar o roteamento
  
    return (
      <>
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
              //sempre que tiver uma submissão, eu faço algo (no caso, troco de página)
              onSubmit={function (infosdoEvento){
                
                //"previna o carregamento, o default". Assim, temos controle de como que faz para ir para uma próxima página.
                infosdoEvento.preventDefault(); 
                console.log('Alguém submeteu o form');

                //Roteamento de páginas, o Next tem o recurso certo para fazer troca de páginas.
                //roteamento.push('/chat');
                  // window.location.href = "/chat" -jeito tradicional, com reload/refresh

                //Aqui, quando clicarmos para mudar de página, o valor username=${username} vai estar na URL, com o devido usuário                
                roteamento.push(`/chat?username=${username}`); // ou roteamento.push('/chat?username=' + username');
                
              }}
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


            {/* <input type="text" 
                    value={username} 
                    onChange={function (event){
                      console.log("Usuário digitou!", event.target.value)
                      //Onde está o valor?
                      const valor = event.target.value;
                      //Trocar o valor da variável, através do React   
                      setUsername(valor); // é esse setUsername que avisa ao React que precisa mudar cada um dos valores e qual pedaço da página tem que avisar.

                  }}                    
            /> */}
              
              <TextField
                placeholder="Digite seu usuário de padawan do GitHub"
                value={username}
                onChange={function (event){
                  console.log("Usuário digitou!", event.target.value)
                  //Onde está o valor?
                  const valor = event.target.value;
                  //Trocar o valor da variável, através do React   
                  setUsername(valor); // é esse setUsername que avisa ao React que precisa mudar cada um dos valores e qual pedaço da página tem que avisar.
                }}

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
                disabled={username < 1}
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
                //src={`https://github.com/${username}.png`}
                src={username == '' ? `https://octodex.github.com/images/octobiwan.jpg` : `https://github.com/${username}.png`}
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[500],
                  padding: '5px 12px',
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
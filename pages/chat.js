// Aqui o Next já reconhece como uma nova página e que tem que renderizar ela. É o Next que gerencia as páginas pra gente.

import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';

export default function ChatPage() {
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]); 

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            id: listaDeMensagens.length + 1,
            de: 'biancviana',
            texto: novaMensagem,
        };
        
        // espalhar -> eu pego todos os itens que já estão dentro da lista e espalho todos dentro da lista nova (setListaDeMensagens)
        setListaDeMensagens([
            mensagem,
            ...listaDeMensagens,
        ]);
        setMensagem('');
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[400],
                backgroundImage: `url(https://images7.alphacoders.com/338/thumb-1920-338844.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.primary['blue jedi'],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.primary['blue padawan'],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    <MessageList mensagens={listaDeMensagens} />
                    {/* {listaDeMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })} */}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => { // (arrow function) || onChange={function(){}}
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault(); 
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.primary['blue jedi'],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[100],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat da Ordem Jedi
                </Text>
                <Button
                    //variant='tertiary'
                    //colorVariant='neutral'
                    label='Sair'
                    href="/"

                    styleSheet={{
                        backgroundColor: appConfig.theme.colors.primary[600],
                        hover: {
                          backgroundColor: appConfig.theme.colors.primary['111']
                        }
                      }}
                    
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log(props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflowY: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["100"],
                marginBottom: '14px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.primary['blue jedi'],
                            }
                        }}
                    >
                        
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    //display: 'flex',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                    //alignItems: "left",
                                    
                                }}
                                src={`https://github.com/biancviana.png`}
                            />
                                   
                            <Text tag="strong">{mensagem.de}            
                            </Text>

                            <Text
                                styleSheet={{
                                    fontSize: '11px',
                                    marginLeft: '10px',
                                    color: appConfig.theme.colors.neutrals[100],
                                }}
                                tag="span"
                                >
                                {new Date().toLocaleDateString()}
                            </Text>
                        </Box>
                        {mensagem.texto}
                    </Text>
                );
            })}
        </Box>
    )
}
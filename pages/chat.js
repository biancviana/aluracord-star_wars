// Aqui o Next já reconhece como uma nova página e que tem que renderizar ela. É o Next que gerencia as páginas pra gente.

import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';


//se não tiver instalado, dar npm install @supabase/supabase-js no terminal
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyZmp6enZybGNxbnlneHV1b2hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQ0MzQyNTcsImV4cCI6MTk2MDAxMDI1N30.sh5CXFcHb9WCi3UsIJ0UDmfFkxMu2VCtGJnaPX_bKHc';
const SUPABASE_URL = 'https://urfjzzvrlcqnygxuuoha.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagensEmTempoReal(adicionaMensagem) {
    return supabaseClient
      .from('mensagens')
      .on('INSERT', respostaLive => {
        adicionaMensagem(respostaLive.new);
      })
      .subscribe();
}

export default function ChatPage() {

    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);
    
    
    //lidar com coisas que fogem do fluxo padrão, ou seja, execução. um efeito colateral, um extra. se o dado precisa vir de um servidor externo, precisa carregar mais, é fora desse fluxo.
    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false})
            .then(({ data }) => {
                //console.log('Dados da consulta:', data);
                setListaDeMensagens(data);
            });

        const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
            console.log('Nova mensagem:', novaMensagem);
            console.log('listaDeMensagens:', listaDeMensagens);

        setListaDeMensagens((valorAtualDaLista) => {
            console.log('valorAtualDaLista:', valorAtualDaLista);
            return [
                novaMensagem,
                ...valorAtualDaLista,
                ]
            });
        });

        return () => {
            subscription.unsubscribe();
        }

    }, []); //se a lista de mensagens mudar, observe essas mudanças e rode de novo. ou seja, a cada ENTER, é atualizado


    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            //id: listaDeMensagens.length + 1,
            de: usuarioLogado,
            texto: novaMensagem,
        };

        supabaseClient
            .from('mensagens')
            .insert([
                mensagem
            ])
            .then(({ data }) => {
                console.log('Criando mensagem: ', data);
                // espalhar -> eu pego todos os itens que já estão dentro da lista e espalho todos dentro da lista nova (setListaDeMensagens)
            });

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
                        {/* CallBack */}
                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                //console.log('Salva esse sticker no banco', sticker);
                                handleNovaMensagem(':sticker: ' + sticker);
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
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                                   
                            <Text tag="strong">
                                {mensagem.de}            
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
                        { /* [Declarativo] */ }
                        {/* Condicional: {mensagem.texto.startsWith('sticker:').toString()} */}
                        {mensagem.texto.startsWith(':sticker:')
                        ? (
                            <Image 
                            src={mensagem.texto.replace(':sticker:', '')}
                            styleSheet={{
                            maxHeight: '150px'
                            }}
                        
                        />
                        )
                        : (
                            mensagem.texto
                        )}

                    </Text>
                );
            })}
        </Box>
    )
}
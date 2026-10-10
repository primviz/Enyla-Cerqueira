# Dra. Enyla Cerqueira • Site V1.2

Site estático em HTML5, CSS e JavaScript puro. Sem compilação, frameworks ou banco de dados. Projeto entregue sem publicação.

## Abrir e hospedar

Abra `index.html` para visualizar localmente. Para testar como servidor: `python3 -m http.server 8080`, dentro desta pasta, e acesse http://localhost:8080.

No Cloudflare Pages, conecte o repositório GitHub, escolha nenhuma estrutura (framework), deixe o comando de build vazio e use a raiz do projeto como diretório de saída (`/` ou `.` conforme o painel). Também pode enviar os arquivos via upload direto. Mantenha index.html na raiz e a pasta assets ao lado.

## Arquivos

- index.html: conteúdo, metadados, Schema.org e Google tag.
- assets/css/style.css: identidade visual, animações e responsividade.
- assets/js/script.js: menu, galeria, lightbox, validação, pré-cadastro e evento GA4.
- assets/images: fotos reais enviadas e versões otimizadas da marca oficial.
- favicon.ico, manifest.webmanifest, robots.txt: recursos básicos do site.
- configurar-dominio.mjs: finaliza SEO quando a URL de publicação estiver definida.

## Pré-cadastro e contato

Campos: Nome, Telefone com DDD, Cidade, Estado e Interesse (Harmonização, Tratamento ou Outro). Todos obrigatórios. Cidade e Estado formam a informação solicitada “Cidade e estado”.

Todos os CTAs comerciais levam ao formulário. Após validação, a mensagem é montada com os campos em linhas e títulos em **negrito** e encaminhada ao WhatsApp **+55 11 91848-6677**. O visitante precisa concluir o envio no WhatsApp. Dados não são armazenados no site. A informação pode ser adaptada em assets/js/script.js. Links de Instagram, e-mail, Maps e Waze possuem funções próprias.

## Google Analytics

ID instalado: **G-CY05NCCE73**.

Evento: **lead_whatsapp**, somente após o envio validado do pré-cadastro. Parâmetros: event_category=contato, event_label=Pré-cadastro WhatsApp e interesse. Dados pessoais não são enviados como parâmetros ao GA4. O evento mede o encaminhamento ao WhatsApp, não o envio da mensagem nem a venda. Não há checkout nesta página.

Validação local do código e simulação do fluxo realizadas. **GA4 Realtime não verificado:** o projeto não foi publicado nem houve acesso à propriedade Analytics. Após publicar, abra Relatórios > Tempo real e envie um pré-cadastro de teste para confirmar lead_whatsapp. Navegar até o formulário não deve gerar esse evento. Bloqueadores de anúncios podem impedir o envio ao GA4.

## Endereço

O briefing fornece somente Rua Haddock Lobo, Cerqueira César, São Paulo. O mapa e os links Maps/Waze apontam à pesquisa dessa região, sem coordenadas ou número inventados. Confirmar o endereço completo com a equipe antes de usar a navegação. Atualize essa seção quando o número/link preciso estiver disponível.

## Domínio e SEO final

Nenhum domínio foi registrado ou presumido. Após definir a URL final, execute com Node.js:

`node configurar-dominio.mjs URL_HTTPS_DEFINITIVA`

Isso acrescenta canonical, og:url, URL absoluta da imagem Open Graph e gera sitemap.xml e sua referência em robots.txt. Estes itens dependem do domínio real; não entregamos uma URL fictícia. O helper só edita arquivos locais, sem registrar domínio, configurar DNS ou publicar o site. Node é necessário apenas para esse passo opcional de preparação, não para o site funcionar.

## Conteúdo e verificação

Identidade oficial preservada em preto, dourado e off-white. Foram utilizadas a foto da profissional e as 16 fotos clínicas enviadas, sem criação de imagens ou depoimentos. Os resultados são exibidos integralmente, em galeria com rolagem, controles e lightbox. Dois depoimentos em vídeo foram adicionados na V1.1, com controles nativos, reprodução inline no celular e sem autoplay. Arquivos H.264/AAC otimizados em 720 × 1280, mantendo duração e áudio. preload="none" evita carregar o vídeo inteiro antes da reprodução. Capas extraídas dos próprios vídeos. Ao reproduzir um depoimento, o outro é pausado. Não foram inventados nomes nem transcritos relatos.

Textos dos procedimentos e previsão de resultados seguem a informação complementar fornecida pelo responsável. O site informa variação individual e avaliação personalizada. Crédito de autoria “Feito pro Primviz →” com link para https://primviz.com.br.

Verificados sintaxe JavaScript, referências locais, integridade das imagens, campos, opções, links e fluxo de conversão por simulação. **Não houve verificação visual em navegador neste ambiente.** Conferir em dispositivos reais antes de publicar. Layout contém regras para 320px, celular, tablet e desktop e respeita prefers-reduced-motion.

## Ajustes V1.2

Logo com fundo transparente, preservando o dourado oficial. Setas decorativas dos CTAs removidas. Setas funcionais da galeria e crédito Primviz mantidos. Textos sem travessões. Animações contínuas discretas (aros, luz ambiente, ponto dourado e linha da foto), com prefers-reduced-motion.

Referências tipográficas: ITC New Baskerville e Coco Gothic. Os arquivos comerciais não foram fornecidos. O CSS prioriza esses nomes quando instalados; títulos usam Baskerville/Georgia como fallback, com espaçamentos ajustados. Textos usam URW Gothic incorporada como alternativa geométrica próxima. Licença em assets/fonts/LICENSE-URW.txt. Para garantir as fontes exatas em todos os dispositivos, fornecer seus arquivos web licenciados e configurar @font-face.

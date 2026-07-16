# Como colocar seu Gerador de Legendas na Play Store

Siga na ordem. Cada etapa é simples, mas não pula nenhuma.

## Etapa 1 — Criar sua chave da Anthropic (5 min)
1. Acesse https://console.anthropic.com
2. Crie uma conta (se ainda não tiver)
3. Vá em **API Keys** e clique em **Create Key**
4. Copie a chave (começa com `sk-ant-...`) e guarde num lugar seguro — você vai precisar dela na Etapa 3
5. Vá em **Billing** e adicione um cartão com um limite pequeno (ex: US$10) pra começar

## Etapa 2 — Colocar o código no GitHub (10 min)
1. Crie uma conta grátis em https://github.com
2. Clique em **New repository**, dê um nome (ex: `gerador-legendas`), deixe público ou privado, e crie
3. Baixe a pasta `gerador-legendas-app` que te entreguei
4. No GitHub, use o botão **Add file → Upload files** e arraste todos os arquivos da pasta (mantendo a estrutura de pastas `api/` e `public/`)
5. Clique em **Commit changes**

## Etapa 3 — Publicar no Vercel (10 min)
1. Acesse https://vercel.com e crie conta (pode entrar direto com GitHub)
2. Clique em **Add New → Project**
3. Escolha o repositório `gerador-legendas` que você acabou de criar
4. Antes de clicar em Deploy, vá em **Environment Variables** e adicione:
   - Nome: `ANTHROPIC_API_KEY`
   - Valor: a chave que você copiou na Etapa 1
5. Clique em **Deploy**
6. Em 1-2 minutos você recebe um link tipo `gerador-legendas.vercel.app` — esse já é seu site funcionando, teste gerando uma legenda antes de seguir

## Etapa 4 — Transformar em app instalável (PWA) (5 min)
1. Acesse https://www.pwabuilder.com
2. Cole a URL do seu site da Vercel (ex: `https://gerador-legendas.vercel.app`)
3. Clique em **Start**
4. A ferramenta vai analisar o site e mostrar um placar — não precisa ser perfeito
5. Clique em **Package for stores** e escolha **Android**
6. Baixe o arquivo `.aab` gerado

## Etapa 5 — Publicar na Play Store (20 min + espera de aprovação)
1. Acesse https://play.google.com/console
2. Pague a taxa única de US$25 (cartão de crédito)
3. Clique em **Criar app**, preencha nome, categoria, e descrição
4. Na seção **Versões do app**, envie o arquivo `.aab` que baixou do PWABuilder
5. Preencha a política de privacidade (pode gerar uma simples em https://www.freeprivacypolicy.com), screenshots do app, e ícone
6. Envie para revisão — o Google costuma levar de 1 a 3 dias pra aprovar

## Onde travar e o que fazer
- **Se o deploy no Vercel der erro de "build failed"**: normalmente é porque algum arquivo não subiu certo no GitHub. Confira se a pasta `api` e `public` estão exatamente como no zip original.
- **Se a legenda não gerar (erro no site)**: confira se a variável `ANTHROPIC_API_KEY` foi salva certinha no Vercel, sem espaços extras.
- **Se travar em qualquer etapa técnica**: pode copiar a mensagem de erro exata e me mandar que eu te ajudo a resolver.

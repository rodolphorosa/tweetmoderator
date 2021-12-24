# Moderador de Tweets

## Introdução

Esse sistema permite que um usuário selecione, a partir de uma lista de tweets que contenham determinada hashtag, quais serão exibidos em um telão.
Ao abrir a aplicação, o usuário poderá informar qual a hashtag e, para cada busca realizada, serão retornados os 10 tweets mais recentes.
A partir da lista, o usuário poderá aprovar quais deles serão exibidos. 
A partir daí, a cada 5 segundos, a aplicação irá automaticamente exibir os tweets no telão até que todos os tweets aprovados tenham sido exibidos.

Para o desenvolvimento desse sistema web foram utilizados React (frontend) e NodeJS (backend). 
Para pesquisar os tweets mais recentes, é utilizada a api do Twitter. 
Além disso, optou-se pelo deploy em Docker.

Para executar a aplicação é necessário possuir Docker instalado em sua máquina e um token de acesso à API do Twitter.
Caso não possua token de acesso, entrar em contato.

## Configuração

### Requisitos
Docker instalado na máquina.
Token de acesso à API do Twitter. Caso não possua, entrar em contato.

### Instruções

Faça o clone do repositório em um diretório qualquer.
```
git clone https://github.com/rodolphorosa/tweetmoderator.git
```

Entre na pasta tweetmoderador/backend, crie um arquivo backend.env e cole a linha abaixo, substituindo MEU_TOKEN pelo seu token de acesso à API do Twitter.
```
TOKEN = MEU_TOKEN
```

Na pasta raiz do projeto, tweetmoderator, execute o comando abaixo e aguarde até que a execução termine:
```
docker-compose up -d
```

É importante que as portas 3000 (frontend) e 3001 (backend) estejam disponíveis.

Em seu navegador, acesse http://localhost:3000.
# TODO List

Um aplicativo de lista de afazeres com React Native, com API feita em Node.js e autenticação via JSON Web Token (JWT).

Demo: [https://youtu.be/GnNE2SjpDwQ](https://youtu.be/GnNE2SjpDwQ)

## Instalação

Antes de qualquer configuração nesse projeto, você precisa configurar e rodar a API, para que sejam feitas as requisições necessárias. Todas as informações necessárias para tal estão no `README` do [repositório da API](https://github.com/lucasmedeiros/todo-list-backend).

Agora, você deve configurar o ambiente de desenvolvimento (Android em Windows e Linux, e iOS em MAC), caso tenha dúvidas de como fazer isso, você pode seguir [este tutorial](https://docs.rocketseat.dev/ambiente-react-native/introducao).

Quando estiver tudo configurado, você já pode clonar esse repositório com os comandos:

```zsh
git clone https://github.com/lucasmedeiros/todo-list-backend.git
cd todo-list-backend
```

Agora, a partir do diretório raiz da aplicação, você deve acessar o arquivo `src/services/api.js`, que tem exatamente esse conteúdo:

```js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.16:5000',
});

export default api;
```

No campo `baseURL`, você deve trocar pela URL e porta do servidor na sua máquina. Vale lembrar que, caso esteja utilizando simulador do iOS no MAC, você pode utilizar o endereço `localhost` normalmente. Porém, para emuladores e dispositivos USB Android, não vai funcionar normalmente. Para resolver esse problema, você colocar o IP de sua máquina local, como está ilustrado no exemplo, acessando a mesma rede wi-fi do seu computador, assim conseguirá rodar em modo de desenvolvimento perfeitamente.

Agora, você já deverá estar apto para rodar o projeto. Você deve executar comandos do gerenciador de dependências [yarn](https://yarnpkg.com/lang/en/) (caso não possua em sua máquina, deverá instalá-lo). Primeiramente, instale as dependências com:

```zsh
yarn install
```

Inicie a aplicação com:

```zsh
yarn start
```

E, em outra aba de terminal, rode o comando para executar no emulador ou no dispositivo USB conectado:

```zsh
react-native run-android # caso seja Dndroid
react-native run-ios # caso seja iOS
```

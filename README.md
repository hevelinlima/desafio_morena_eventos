# Morena Eventos

**Morena Eventos** é uma aplicação web que facilita a criação, gerenciamento e inscrição em eventos. Desenvolvida com Laravel no backend e Next.js no frontend, a aplicação visa proporcionar uma experiência intuitiva tanto para organizadores quanto para participantes.

## Funcionalidades

### Funcionalidades Comuns:
- **Autenticação de Usuários**: Tanto organizadores quanto participantes podem criar uma conta e fazer login na aplicação.
- **Interface Responsiva**: A aplicação é projetada para ser acessível em diferentes dispositivos, proporcionando uma boa experiência tanto em desktop quanto em mobile.
  
### Para Participantes:
- **Navegação de Eventos**: Usuários podem explorar uma lista de eventos disponíveis, com detalhes sobre cada um.
- **Inscrição em Eventos**: Participantes podem se inscrever em eventos de seu interesse, garantindo sua participação.

### Para Organizadores:
- **Cadastro de Eventos**: Organizadores podem criar eventos, definindo informações como nome, descrição, endereço e data.

## Tecnologias Utilizadas
- **Backend**: Laravel, com autenticação via JWT.
- **Frontend**: Next.js, utilizando React para construir interfaces interativas.
- **Banco de Dados**: MySQL ou outro compatível, com migrações e seeds para facilitar o gerenciamento de dados.

## Configuração do Ambiente
### Pré-requisitos

Antes de começar, certifique-se de ter os seguintes itens instalados em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [Composer](https://getcomposer.org/)
- [PHP](https://www.php.net/) (versão 8 ou superior)
- [Laravel](https://laravel.com/docs/8.x/installation) (instalado via Composer)
- [XAMPP](https://www.apachefriends.org/index.html) ou outro servidor local para rodar o PHP

### Passos de Configuração:

1. **Clone do Repositório**:
   ```bash
   git clone https://github.com/hevelinlima/desafio_morena_eventos.git
   cd backend
   ```
2. **Instale as dependências do Laravel**:
    ```bash
   composer install
   ```
3. **Crie um arquivo .env conforme o .env.example**, crie um banco de dados (desafio_db) e remova os comentários das seguintes linhas de código:
  ```bash
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=desafio_db
   DB_USERNAME=root
   DB_PASSWORD=
   ```
- Caso crie um banco de dados com outro nome, realize a alteração em DB_DATABASE.

4. **Gere a chave da aplicação**:
  ```bash
   php artisan key:generate
   ```
5. **Gere a chave JWT**:
  ```bash
   php artisan jwt:secret
   ```

6. **Execute as migrações**:
  ```bash
   php artisan migrate
   ```
7. **Para popular o banco de dados com dados de exemplo, execute**:
  ```bash
   php artisan db:seed
   ```

8. **Inicie o servidor Laravel**:
  ```bash
   php artisan serve
   ```
8. **Inicie o servidor Laravel**:
  ```bash
   php artisan serve
   ```
O backend estará disponível em http://localhost:8000.

9. **Navegue até a pasta do frontend**:
  ```bash
   cd ../frontend
   ```

10. **Instale as dependências do Next.js**:
  ```bash
    npm install
   ```
11. **Inicie a aplicação**:
  ```bash 
    npm run dev
   ```
O frontend estará disponível em http://localhost:3000.

#### Agora você pode acessar o frontend no navegador. O frontend se comunica com a API do Laravel para gerenciar eventos e inscrições.


---

Desenvolvido por hevelinlima

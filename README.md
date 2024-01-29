# Desafio Kinvo Back-end
  Este projeto é um sistema de controle financeiro desenvolvido em Node.js utilizando o framework Express e banco de dados MySQL. Ele permite que os usuários realizem o registro de movimentações financeiras, como receitas e despesas, e visualizem o saldo da conta.

  ## Funcionalidades
  Autenticação de Usuários
  Registro de novos usuários
  Login com autenticação segura utilizando bcrypt e JWT

  ## Tecnologias Utilizadas 
  - **Node.js**
  - **Express**
  - **MySQL**
  - **Bcrypt** (para criptografia de senhas)
  - **JWT** (para autenticação)
    
  ## Controle de Movimentações Financeiras
  - Inserção, atualização e exclusão de movimentações financeiras
  - Consulta de movimentações filtradas por data e paginadas
  - Visualização do saldo da conta
    
  ## Gerenciamento de Usuários
  - Atualização de informações do perfil do usuário
  - Exclusão de conta de usuário

  ## Rotas Usuários
  ### Login
  - Endpoint: `POST /login`
    Responsável por autenticar um usuário.
  ### Cadastro
  - Endpoint: `POST /register`
    Responsável por cadastrar um novo usuário.
  ### Atualização de Usuário
  - Endpoint: `PUT /users/:userId`
    Responsável por atualizar os dados de um usuário específico.
  ### Exclusão de Usuário
  - Endpoint: `DELETE /users/:userId`
    Responsável por excluir um usuário específico.
  ## Rotas Movimentações Financeiras
  ### Listar Todas as Movimentações
  - Endpoint: `GET /movement`
    Responsável por listar todas as movimentações financeiras (requer autenticação).
  ### Detalhes de Movimentação por Usuário
  - Endpoint: `GET /movement/:userId`
    Responsável por obter detalhes das movimentações financeiras de um usuário específico (requer autenticação).
  ### Saldo do Usuário
  - Endpoint: `GET /balance/:userId`
    Responsável por obter o saldo atual do usuário (requer autenticação).
  ### Criar Movimentação
 - Endpoint: `POST /movement`
   Responsável por criar uma nova movimentação financeira (requer autenticação).
  ### Atualizar Movimentação por Usuário
  - Endpoint: `PUT /movement/:userId`
    Responsável por atualizar uma movimentação financeira de um usuário específico (requer autenticação).
  ### Excluir Movimentação por Usuário
  - Endpoint: `DELETE /movement/:userId`
    Responsável por excluir uma movimentação financeira de um usuário específico (requer autenticação).

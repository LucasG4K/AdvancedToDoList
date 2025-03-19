# Advanced ToDo List

## Visão Geral
O **Advanced ToDo List** é uma aplicação web desenvolvida em **Meteor** (3.1.2) e **React** (19.0.0) para gerenciamento de tarefas. Ele inclui funcionalidades como autenticação de usuário, gestão de tarefas com permissões, edição de perfis, e um dashboard de estatísticas. O projeto utiliza **Material-UI** para a interface e **MongoDB** como banco de dados.

## Stacks Utilizadas
- **Frontend:** React, React Router, Material-UI
- **Backend:** Meteor, Node.js
- **Banco de Dados:** MongoDB
- **Autenticação:** Meteor Accounts

## Funcionalidades
1. **Autenticação**: A aplicação requer login e senha para acessar as tarefas.
2. **Rotas com React Router**: Tela de boas-vindas, lista de tarefas, e tela de edição.
3. **Lista de Tarefas com Material-UI**: Exibição de tarefas, remoção e edição.
4. **Gestão de Permissões**: Apenas o criador pode editar/excluir suas tarefas.
5. **Tarefas Privadas e Públicas**: Configuração de visibilidade via publicações do Meteor.
6. **Perfil de Usuário**: Nome, email, data de nascimento, sexo, empresa e foto.
7. **Drawer Navegacional**: Links para lista de tarefas e perfil.
8. **Dashboard de Tarefas**: Resumo de status de tarefas cadastradas, em andamento e concluídas.
9. **Filtro de Tarefas**: Permite buscar tarefas pelo nome.
10. **Paginação**: Exibição de 4 tarefas por página utilizando `skip` e `limit` no MongoDB.

## Como Rodar o Projeto

**Observação:** certifique-se de que tenha [**Node.js**](https://nodejs.org/en) (v22.13.1) instalado.

1. Instale o [**Meteor**](https://www.meteor.com/) (v3.1.2): 

   ```sh
   curl https://install.meteor.com/ | sh
   ```
2. Clone o repositório do projeto:
   ```sh
   git clone https://github.com/LucasG4K/AdvancedToDoList.git
   cd AdvancedToDoList
   ```
3. Instale as dependências:
   ```sh
   meteor npm install
   ```
4. Inicie a aplicação:
   ```sh
   meteor
   ```

## Dependências
```json
"dependencies": {
    "@babel/runtime": "^7.23.5",
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@mui/icons-material": "^6.4.5",
    "@mui/material": "^6.4.5",
    "bcrypt": "^5.1.1",
    "meteor-node-stubs": "^1.2.12",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.4.0"
}
```

## Estrutura de Arquivos
A estrutura do projeto foi organizada de forma modular para facilitar a manutenção e a escalabilidade. Veja como o projeto está dividido:

```
imports/
├── api/
│   ├── Tasks/
│   │   ├── TaskMethods.ts
│   │   ├── TaskModel.ts
│   │   ├── TaskPublication.ts
│   │   └── TaskCollection.ts
│   └── Users/
│       ├── UserMethods.ts
│       ├── UserModel.ts
│       └── UserPublication.ts
├── providers/
│   ├── taskProvider.tsx
│   └── userProvider.tsx
├── routes/
│   └── appRoutes.tsx
├── ui/
│   ├── components/
│   │   ├── loadingScreen.tsx
│   │   ├── miniProfile.tsx
│   │   ├── myAppBar.tsx
│   │   └── myDialog.tsx
│   ├── pages/
│   │   ├── auth/
│   │   │   └── Auth.tsx
│   │   ├── home/
│   │   │   ├── components/
│   │   │   │   └── cardOverview.tsx
│   │   │   ├── Home.tsx
│   │   │   └── homeStyles.tsx
│   │   ├── profile/
│   │   │   ├── components/
│   │   │   │   └── pictureBadge.tsx
│   │   │   ├── Profile.tsx
│   │   │   └── profileStyles.tsx
│   │   ├── tasks/
│   │   │   ├── Task.tsx
│   │   │   └── taskStyles.tsx
│   │   └── todoList/
│   │       └── components/
│   │           └── taskList.tsx
│   │       └── TodoList.tsx
├── themes/
│   └── defaultTheme.ts
└── App.tsx
```

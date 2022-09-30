# donus-code-challenge

# Documentação da API

## Tabela de Conteúdos

-   [Visão Geral](#1-visão-geral)
-   [Diagrama ER](#2-diagrama-er)
-   [Início Rápido](#3-início-rápido)
-   [Endpoints](#4-endpoints)

---

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

-   [NodeJS](https://nodejs.org/en/)
-   [Express](https://expressjs.com/pt-br/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [PostgreSQL](https://www.postgresql.org/)
-   [TypeORM](https://typeorm.io/)
-   [Yup](https://www.npmjs.com/package/yup)
-   [Docker](https://docs.docker.com/get-started/)
-   [Jest](https://jestjs.io/docs/getting-started)

---

## 2. Diagrama ER

[ Voltar para o topo ](#tabela-de-conteúdos)

Diagrama ER da API definindo as relações entre as tabelas do banco de dados.

<!-- ![DER](DER_SP7_01.drawio.png) -->

---

## 3. Início Rápido

[ Voltar para o topo ](#tabela-de-conteúdos)

### 3.1. Rodando aplicação com Docker

A aplicação está "dockerizada", a fim de facilitar a execução do projeto. Os passos para rodar a aplicação utilizando o Docker Compose estão listados abaixo.

Após clonar o projeto em sua máquina, suba os containers utilizando o comando:

```shell
docker-compose up
```

Em seguida, é necessário rodar as migrations para montar a estrutura no banco de dados Postgres utilizando o typeORM. A fim de evitar conflitos nas portas da aplicação, executaremos as migrations dentro do Docker com o comando:

```shell
docker exec -it api yarn typeorm migration:run -d src/data-source.ts
```

Com isso, a aplicação está pronta para ser utilizada.

### 3.2. Rodando testes

Para rodar os testes é necessário instalar as dependências utilizadas no projeto. É recomendado a utilização do yarn v.1.22.18+.

Após clonar o projeto em sua máquina, instale as dependências com o seguinte comando:

```shell
yarn
```

Execute os testes com o comando:

```shell
yarn test
```

Caso queira rodar um teste específico:

```shell
yarn test src/__tests__/integration/nome_da_pasta_teste
```

---

## 4. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

-   [Users](#1-users)
    -   [POST - /users](#11-criação-usuário)
    -   [GET - /users](#12-listando-usuários)
-   [Login](#2-login)
    -   [POST - /login](#21-login)
-   [Deposit](#3-deposit)
    -   [POST - /deposit](#31-transação-de-depósito)
-   [Transfer](#4-transfer)
    -   [POST - /transfer/:id](#41-transação-de-transferência)
-   [Transactions](#5-transactions)
    -   [POST - /transactions/user](#51-transações-do-usuário)

## Endpoints Resumo

### 1. /users

### Endpoints

| Método | Rota   | Descrição                | Autorização |
| ------ | ------ | ------------------------ | ----------- |
| POST   | /users | Criação de um usuário.   |             |
| GET    | /users | Lista todos os usuários. | X           |

### 1.1. **Criação Usuário**

### `/users`

### Exemplo de Request:

```
POST /users
Content-type: application/json
```

### Corpo da Requisição:

```json
{
	"name": "Alex",
	"cpf": 42500388878,
	"password": "Aloha123456"
}
```

### Exemplo de Resposta:

```
201 Created
```

```json
{
	"name": "Alex",
	"cpf": 42500388878,
	"id": "50a457b9-3b8e-45c2-bdf1-ee03744c47f1",
	"balance": 0
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------- |
| 409 conflict    | User already exists.                                                                        |
| 400 bad request | name is a required field                                                                    |
| 400 bad request | cpf is a required field                                                                     |
| 400 bad request | password is a required field                                                                |
| 400 bad request | Name must be a string of characters with at least one caracter. Should not contain numbers. |
| 400 bad request | cpf must be a `number` type, but the final value was: `NaN`                                 |
| 400 bad request | CPF must have exactly 11 digits.                                                            |
| 400 bad request | Password must have: Minimum eight characters, at least one letter and one number.           |

---

### 1.2. **Listando Usuários**

### `/users`

### Exemplo de Request:

```
GET /users
Authorization: Bearer token
Content-type: application/json
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
[
	{
		"id": "50a457b9-3b8e-45c2-bdf1-ee03744c47f1",
		"name": "Alex",
		"cpf": 42500388878,
		"balance": 0
	}
]
```

### Possíveis Erros:

| Código do Erro   | Descrição      |
| ---------------- | -------------- |
| 401 unauthorized | Invalid token. |

---

### 2. /login

### Endpoints

| Método | Rota   | Descrição         | Autorização |
| ------ | ------ | ----------------- | ----------- |
| POST   | /login | Login do usuário. |             |

### 2.1. **Login**

### `/login`

### Exemplo de Request:

```
POST /login
Content-type: application/json
```

### Corpo da Requisição:

```json
{
	"cpf": 42500388878,
	"password": "Aloha123456"
}
```

### Exemplo de Resposta:

```
200 OK
```

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjQ0ODgzMjgsImV4cCI6MTY2NDQ5NTUyOCwic3ViIjoiNTA2OWI2NTktNjI4Ny00YzNkLWI4OGItOTA2ZmRiYmJkNjhiIn0.OMEyFMQL2kgZF9n85L2Xg7BBbk3di7Zhjy1Bvd0NQVg"
}
```

### Possíveis Erros:

| Código do Erro | Descrição               |
| -------------- | ----------------------- |
| 403 forbidden  | Invalid cpf or password |

---

### 3. /deposit

### Endpoints

| Método | Rota     | Descrição                             | Autorização |
| ------ | -------- | ------------------------------------- | ----------- |
| POST   | /deposit | Criação de uma transação de depósito. | x           |

### 3.1. **Transação de depósito**

### `/deposit`

A rota deposit cria uma transação de tipo deposit. Essa rota é utillizada para realizar um depósito na conta do usuário logado.

### Exemplo de Request:

```
POST /deposit
Authorization: Bearer token
Content-type: application/json
```

### Corpo da Requisição:

```json
{
	"amount": 1000
}
```

### Exemplo de Resposta:

```
201 Created
```

```json
{
	"message": "Deposit done sucessfully."
}
```

### Usuário após deposit:

Realizando uma requisicão get/users, podemos ver o novo balanço do usuário após o depósito:

```json
[
	{
		"id": "50a457b9-3b8e-45c2-bdf1-ee03744c47f1",
		"name": "Alex",
		"cpf": 42500388878,
		"balance": 1000
	}
]
```

### Possíveis Erros:

| Código do Erro   | Descrição                                                           |
| ---------------- | ------------------------------------------------------------------- |
| 401 unauthorized | Invalid token.                                                      |
| 400 bad request  | Amount value must be greater than 0 and less than or equal to 2000. |
| 400 bad request  | amount must be a `number` type, but the final value was: `NaN`      |

---

### 4. /transfer

### Endpoints

| Método | Rota          | Descrição                                  | Autorização |
| ------ | ------------- | ------------------------------------------ | ----------- |
| POST   | /transfer/:id | Criação de uma transação de transferência. | x           |

### 4.1. **Transação de transferência**

### `/transfer/:id`

A rota transfer cria uma transação de tipo transfer. Essa rota é utillizada para realizar uma transferência do usuário logado para outro usuário (target user).

### Exemplo de Request:

```
POST /transfer/:id
Authorization: Bearer token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                                               |
| --------- | ------ | ----------------------------------------------------------------------- |
| id        | string | Identificador único do usuário que irá receber o valor da transferência |

### Corpo da Requisição:

```json
{
	"amount": 10
}
```

### Exemplo de Resposta:

```
201 Created
```

```json
{
	"message": "Transfer between accounts done sucessfully."
}
```

### Usuários após transfer:

Realizando uma requisicão get/users, podemos ver o novo balanço dos usuários após a transferência:

```json
[
	{
		"id": "50a457b9-3b8e-45c2-bdf1-ee03744c47f1",
		"name": "Alex",
		"cpf": 42500388878,
		"balance": 990
	},
	{
		"id": "0cf0dc0d-4b37-4274-8825-b6a6bec55be1",
		"name": "Beatriz",
		"cpf": 42500388890,
		"balance": 10
	}
]
```

### Possíveis Erros:

| Código do Erro   | Descrição                                                                                      |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| 401 unauthorized | Invalid token.                                                                                 |
| 400 bad request  | You dont have enough balance to make this transaction. Please, make a deposit to your account. |
| 400 bad request  | Amount value must be greater than 0.                                                           |
| 400 bad request  | Target user id does not correspond to UUID format.                                             |
| 400 bad request  | Target user doesnt exists.                                                                     |

---

### 5. /transactions

### Endpoints

| Método | Rota               | Descrição                                                 | Autorização |
| ------ | ------------------ | --------------------------------------------------------- | ----------- |
| GET    | /transactions/user | Lista todas as transações realizadas pelo usuário logado. | x           |

### 5.1. **Transações do usuário**

### `/transactions/user`

### Exemplo de Request:

```
GET /transactions/user
Authorization: Bearer token
Content-type: application/json
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Resposta:

```
200 OK
```

```json
{
	"id": "50a457b9-3b8e-45c2-bdf1-ee03744c47f1",
	"name": "Alex",
	"cpf": 42500388878,
	"balance": 990,
	"transactions": [
		{
			"id": "440fc20b-b441-4051-9864-c3a2e27e38e2",
			"amount": 1000,
			"targetUserId": null,
			"type": "Deposit"
		},
		{
			"id": "f06db8e3-cf76-45a5-b9fc-a9ff6e2ba5f4",
			"amount": 10,
			"targetUserId": "0cf0dc0d-4b37-4274-8825-b6a6bec55be1",
			"type": "Transfer"
		}
	]
}
```

### Possíveis Erros:

| Código do Erro   | Descrição      |
| ---------------- | -------------- |
| 401 unauthorized | Invalid token. |

---

Autoria: Gustavo Henrique Venerando

# donus-code-challenge

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

## Endpoints Resumo

### 1. /users

O objeto User é definido como:

| Campo    | Tipo   | Descrição                       |
| -------- | ------ | ------------------------------- |
| id       | string | Identificador único do usuário. |
| name     | string | Nome do usuário.                |
| cpf      | number | Cpf do usuário.                 |
| password | string | Senha do usuário.               |
| balance  | number | Saldo do usuário.               |

### Endpoints

| Método | Rota   | Descrição                | Autorização |
| ------ | ------ | ------------------------ | ----------- |
| GET    | /users | Lista todos os usuários. | X           |
| POST   | /users | Criação de um usuário.   |             |

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
	"id": "6438df00-3839-476f-b2a9-135aa9eb9b84",
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

### 1.2. **Listando Produtos**

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
		"id": "6438df00-3839-476f-b2a9-135aa9eb9b84",
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

# Documentação da API

## Tabela de Conteúdos

-   [Visão Geral](#1-visão-geral)
-   [Diagrama ER](#2-diagrama-er)
-   [Início Rápido](#3-início-rápido)
    -   [Instalando Dependências](#31-instalando-dependências)
    -   [Variáveis de Ambiente](#32-variáveis-de-ambiente)
    -   [Migrations](#33-migrations)
-   [Autenticação](#4-autenticação)
-   [Endpoints](#5-endpoints)

---

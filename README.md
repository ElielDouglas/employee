# employee
Projeto criado a partir do express.
Foi utilizado o padrão de projeto "Repository pattern", no qual isolamos a data layer(banco de dados) em repositorios unicos, por exemplo a tabela employee, deixando assim mais facil a manutenção caso necessário mudar a data layer, e isolando a responsabilidade do controller,
no qual fica apenas responsavel por chamar o metodo de dentro do repositorio em questão.
Tambem foi usado SINGLETON , padrão que garante a existência de apenas uma instância de uma classe, mantendo um ponto global de acesso ao seu objeto, tanto o controller,routes, repository.

Em relação ao banco, eu usei o POSTGRES, e confesso que no momento não entendi como gerar o arquivo "docker-compose" para baixar automaticamente na sua maquina.
Porem eu utilizei os comandos 

`docker run --name pgcognum -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres`

o comando acima iniciou um container docker e definiu as variaveis de ambiente necessárias para o postgres.

Apos isso, utilizei 

`docker exect -it pgcognum bash`

para acessar o container de forma interativa no bash dele

após isso usei 

`psql -U root`
`CREATE DATABASE employes`

para acessar o postgres e criar o banco necessario para aplicão rodar

após isso acessei o banco com 

`\c employes` 

e após isso rodei 

`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

`CREATE TABLE IF NOT EXISTS employes(
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    role VARCHAR NOT NULL
);`

Que servem para criar a tabela e utilizar o UUID generator do postgres, para termos um id unico e não sequencial, pensando nos padrões de segurança.

o arquivo de rotas, contem todos os endpoints documentados , e o controller contem o metodo responsavel de cada rota.






 

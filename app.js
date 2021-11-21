// Importando o modulo Express
const express = require("express");

// Instanciamiento do Express na variable app
const app = express();
const clientes = require("./clientes.json");

// Usar a anotaçao Json
app.use(express.json());

//-- ROTAS --
// Receber dados da Resource, clientes.json.
app.get("/clientes", function (req, res) {
  // Respota do Objeto en formato Json
  res.json(clientes);
});

//Receber dados da resource, desde um ID de clientes.json.
app.get("/clientes/:id", function (req, res) {
  const { id } = req.params;
  // Procurar o cliente (find) com o ID que esta no parametro
  const cliente = clientes.find((cli) => cli.id == id);

  if (!cliente) {
    //O ID nao existe, nao tem conteudo
    return res.status(204).json();
  }
  // Devolve o cliente com o ID seleccionado
  res.json(cliente);
});

// Enviar dados para serem processados por o cliente.json.
app.post("/clientes", function (req, res) {
  const { nome, endereco, cep, nascimento, telefone, email } = req.body;

  // Salvando os dados
  res.json({ nome, endereco, cep, nascimento, telefone, email });
});

// Atualizar dados da Resource cliente.json.
app.put("/clientes/:id", function (req, res) {
  const { id } = req.params;
  // Procurar o cliente (find) com o ID que esta no parametro
  const cliente = clientes.find((cli) => cli.id == id);

  if (!cliente) {
    //O ID nao existe, nao tem conteudo
    return res.status(204).json();
  }
  const { nome, endereco, cep, nascimento, telefone, email } = req.body;
  // Pegando os valores do Body
  cliente.nome = nome;
  cliente.endereco = endereco;
  cliente.cep = cep;
  cliente.nascimento = nascimento;
  cliente.telefone = telefone;
  cliente.email = email;

  //Devolve o cliente atualizado
  res.json(cliente);
});

// Deletar um cliente com o ID no arquivo clientes.json
app.delete("/clientes/:id", function (req, res) {
  const { id } = req.params;

  //Filtrar da lista de clientes o ID pasado pro parametro
  const clienteFiltrado = clientes.filter((cliente) => cliente.id != id);
  //Devovle uma nova lista de clientes, sem o Id que foi digitado an rota
  res.json(clienteFiltrado);
});

// Iniciando o Servidor na porta 3000.
app.listen(3000, function () {
  console.log("Server is running");
});

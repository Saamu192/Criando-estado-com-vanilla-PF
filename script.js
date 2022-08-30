//Criando função para armazenar estado
function state(initialValue) {
  // armazenando o valor passado por parametro da funcao primaria
  let value = initialValue;

  //retornando o valor armazenado
  function getValue() {
    return value;
  }
  //atualizando o valor armazenado para um novo
  function setValue(newValue) {
    value = newValue;
  }
  //return da função primária, ou seja, retornando as duas funções que criamos
  return [getValue, setValue];
}

//Const recebendo nossas funções de estado
const [database, setDatabase] = state([
  //array de objetos simples
  { id: 1, nome: "Televisão", preco: 2500 },
  { id: 2, nome: "Geladeira", preco: 4599 },
  { id: 3, nome: "Forno Elétrico", preco: 500 },
]);

//Const recebendo nossas funções de estado (Carrinho)
//Iniciando com um array vazio
const [cart, setCart] = state([]);

//Criando função que analisa o localStorage
function cartDataAnalysis() {
  //Acessando a chave "carrinho" no local storage
  const cartLocalJSON = localStorage.getItem("carrinho");

  //Verificando se cartLocalJSON não é null
  if (cartLocalJSON) {
    //Transformando JSON em dados JavaScript
    const cartLocal = JSON.parse(cartLocalJSON);
    //Atribuindo valor ao carrinho
    return setCart(cartLocal);
  }
}
//Chamando função em escopo global
cartDataAnalysis();

//Criando a função DOM dos produtos
//Recebendo database() como parâmetro padrão
function showProducts(products = database()) {
  //Selecionando tag HTML <ul> através do id
  const container = document.querySelector("#produtos");
  //usando método forEach para fazer a iteração do array
  products.forEach((product) => {
    //usando método DOM para inserir uma <li> para cada objeto
    container.insertAdjacentHTML(
      //"beforeend" para adicionar cada <li> no fim
      "beforeend",
      `<li>
        ${product.nome}, 
        R$ ${product.preco} 
        <button onClick={addToCart(${product.id})} id=${product.id}>Adicionar ao carrinho</button>
      </li>`
    );
  });
  return container;
}

//Função de adicionar ao carrinho
function addToCart(id, products = database()) {
  //procurando o produto dentro da database pelo id
  const productBuyed = products.find((element) => element.id === id);

  //atualizando o valor da const cart
  //usando a const setCart que possui a função setValue para atualizar o valor
  setCart([...cart(), productBuyed]);

  //transformando array do carrinho em JSON
  const productsJson = JSON.stringify(cart());

  //Alocando array em JSON no local storage

  localStorage.setItem("carrinho", productsJson);

  //chamando a função DOM responsável por mostrar os produtos no carrinho
  return showProductsInCart();
}

//Criando a função DOM dos produtos do carrinho
//Recebendo cart() como parâmetro padrão
function showProductsInCart(products = cart()) {
  //Selecionando tag HTML <ul> através do id
  const container = document.querySelector("#carrinho");

  //limpando o HTML para evitar acumulo de renderizações
  container.innerHTML = ``;

  //usando método forEach para fazer a iteração do array
  products.forEach((product) => {
    //usando método DOM para inserir uma <li> para cada objeto
    container.insertAdjacentHTML(
      //"beforeend" para adicionar cada <li> no fim
      "beforeend",
      `<li>
        ${product.nome}, 
        R$ ${product.preco} 
        <button onClick={removeToCart(${product.id})} id=${product.id}>Remover ao carrinho</button>
      </li>`
    );
  });
  return container;
}

//Criando função para remover o produto do carrinho
//Recebendo cart() como parâmetro padrão além do id
function removeToCart(id, products = cart()) {
  //Procurando o index do produto dentro da base de dados do carrinho
  const findProduct = products.findIndex((element) => element.id === id);

  //Criando uma cópia do array do carrinho
  const newCartProducts = [...products];

  //Usando o splice para remover o produto a partir do index
  newCartProducts.splice(findProduct, 1);

  //Atualizando o valor da const cart
  setCart(newCartProducts);

  //Transformando o array do carrinho em JSON
  const productsJson = JSON.stringify(cart());

  //Alocando array em JSON no local storage

  localStorage.setItem("carrinho", productsJson);

  //Chamando a função DOM do carrinho para atualizar a página
  return showProductsInCart();
}

//DOM dos produtos
showProducts();

//DOM do carrinho
showProductsInCart();

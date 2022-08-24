//Criando função para armazenar estado
function state(initialValue) {
  let value = initialValue;

  function getValue() {
    return value;
  }

  function setValue(newValue) {
    value = newValue;
  }

  return [getValue, setValue];
}
const [database, setDatabase] = state([
  { id: 1, nome: "Televisão", preco: 2500 },
  { id: 2, nome: "Geladeira", preco: 4599 },
  { id: 3, nome: "Forno Elétrico", preco: 500 },
]);

const [cart, setCart] = state([]);

function showProducts(products = database()) {
  const container = document.querySelector("#produtos");
  products.forEach((product) => {
    container.insertAdjacentHTML(
      "beforeend",
      `<li>
        ${product.nome}, 
        R$ ${product.preco}, 
        <button onClick={addToCart(${product.id})} id=${product.id}>Adicionar ao carrinho</button>
      </li>`
    );
  });
  return container;
}

showProducts();

function addToCart(id, products = database()) {
  const productBuyed = products.find((element) => element.id === id);
  setCart([...cart(), productBuyed]);

  return showProductsInCart();
}

function showProductsInCart(products = cart()) {
  const container = document.querySelector("#carrinho");
  container.innerHTML = ``;
  products.forEach((product) => {
    container.insertAdjacentHTML(
      "beforeend",
      `<li>
        ${product.nome}, 
        R$ ${product.preco}, 
        <button onClick={removeToCart(${product.id})} id=${product.id}>Adicionar ao carrinho</button>
      </li>`
    );
  });
  return container;
}

function removeToCart(id, products = cart()) {
  const findProduct = products.findIndex((element) => element.id === id);
  const newCartProducts = [...products];
  newCartProducts.splice(findProduct, 1);
  setCart(newCartProducts);
  return showProductsInCart();
}

showProductsInCart();

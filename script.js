const searchTextEl = document.getElementById("searchText");
const autoCompleteResultsEl = document.querySelector("#autoCompleteResults");
const autoCompleteResultsBodyEl = document.querySelector(
  "#autoCompleteResults tbody"
);

const debounce = (callback, delay) => {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
  };
};

const autoComplete = () => {
  const query = searchTextEl.value.trim();

  if (!query) {
    return;
  }

  console.log(query);

  getData(query).then((products) => {
    products.forEach((product) => {
      autoCompleteResultsEl.classList.add("show");
      autoCompleteResultsBodyEl.innerHTML += `<tr>
      <td>${product.title}</td>
      <td>$${product.price}</td>
      <td>${product.category}</td>
      <td><img src="${product.image}"></td>
      </tr>`;
    });
  });
};

const getData = (query) => {
  const searchURL = new URL("https://dummyjson.com/products/search");
  searchURL.searchParams.append("q", query);

  return fetch(searchURL)
    .then((response) => response.json())
    .then((result) => {
      const products = result.products;
      const mappedProducts = products.map((product) => ({
        title: product.title,
        price: product.price,
        category: product.category,
        image: product.images[0],
      }));

      return mappedProducts;
    });
};

searchTextEl.addEventListener("keyup", debounce(autoComplete, 1000));

autoCompleteResultsBodyEl.addEventListener("click", () => {
  autoCompleteResultsEl.classList.remove("show");
});

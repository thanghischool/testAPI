let url = "https://656d4008bcc5618d3c22eed6.mockapi.io/api/demo/product";
let product_admin = document.getElementById("product_admin");
let loginForm = document.getElementById("add_Product");

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    let data_product = "";
    data.forEach((item) => {
      data_product += `
      <tr id="${item.id}">
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td style="background-image: url('${item.image}'); background-size: cover; background-repeat: no-repeat; background-position: center center"></td>
        <td>${item.price}</td>
        <td>
          <i class="bi bi-pencil-square" ></i>
          <i class="bi bi-trash" onclick = deleteProduct(${item.id})></i>
        </td>
      </tr>
      `;
    });
    document.getElementById("product_admin").innerHTML = data_product;
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });

async function add_product(data) {
  try {
    const data_push = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await data_push.json();
    let newProduct = document.createElement("tr");
    newProduct.id = `${result.id}`;
    newProduct.innerHTML = `
      <td>${result.id}</td>
      <td>${result.name}</td>
      <td style="background-image: url('${result.image}'); background-size: cover; background-repeat: no-repeat; background-position: center center"></td>
      <td>${result.price}</td>
      <td>
        <i class="bi bi-pencil-square"></i>
        <i class="bi bi-trash"></i>
      </td>
    `;
    product_admin.appendChild(newProduct);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function deleteProduct(productId) {
  try {
    const response = await fetch(`${url}/${productId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log(`Product ${productId} deleted successfully.`);
      removeProductFromUI(productId);
    } else {
      console.error(`Error deleting product ${productId}.`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function removeProductFromUI(productId) {
  const productToRemove = document.getElementById(`${productId}`);
  if (productToRemove) {
    productToRemove.remove(); // Xóa sản phẩm khỏi giao diện
  }
}

loginForm.addEventListener("click", (e) => {
  e.preventDefault();
  let name = document.getElementById("name");
  let image = document.getElementById("img1");
  let price = document.getElementById("price");

  if (name.value == "" || image.value == "" || price.value == "") {
    alert("Ensure you input a value in both fields!");
  } else {
    const data = {
      name: name.value,
      image: image.value,
      price: price.value,
    };
    add_product(data);
  }
});

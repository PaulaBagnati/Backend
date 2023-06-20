class ProductManager {
  constructor() {
    this.products = []; //Empty array
  }

  //Add one product to the array
  addProduct({ title, description, price, thumbnail, code, stock }) {
    let codeExists = this.existingCode(code);

    if (codeExists) {
      console.log(
        "The code already exists in the array. PLease, try with another one"
      );
      return;
    } else {
      const id = this.products.length + 1; //Autogenerate ID

      this.products.push({
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      });
    }
  }

  //See all products
  getProducts() {
    return this.products;
  }

  //Verify if the code already exists in the products array
  existingCode(code) {
    const product = this.products.find((p) => p.code === code);

    if (product) {
      return 1;
    } else {
      return 0;
    }
  }

  //Get properties of a given Product Id
  getProductById(productId) {
    const product = this.products.find((p) => p.id === productId);

    if (!product) {
      console.log("Not Found");
      return;
    } else {
      return product;
    }
  }
}

const p = new ProductManager();

console.log(p.getProducts());

p.addProduct({
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
});

console.log(p.getProducts());

p.addProduct({
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
});

console.log(p.getProductById(2));

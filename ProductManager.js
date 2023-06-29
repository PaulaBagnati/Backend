// EJERCICIO DE LA CLASE 4
const fs = require("fs/promises");
const path = require("path");

class ProductManager {
  constructor(path) {
    this.filepath = path;
  }

  //See all products
  async getProducts() {
    const products = await this.leerDatosFile();

    if (products.length == 0) {
      console.log("No hay productos en archivo");
    } else {
      return products;
    }
  }

  //Add one product to the array
  async addProduct({ title, description, price, thumbnail, code, stock }) {
    if (
      title == "" ||
      description == "" ||
      price == "" ||
      thumbnail == "" ||
      code == "" ||
      stock == ""
    ) {
      console.log("Por favor, complete todos los datos requeridos");
    } else {
      const products = await this.leerDatosFile();

      if (products.length != 0) {
        let codeExists = await this.existingCode(code);

        if (codeExists) {
          console.log(
            "The code already exists in the array. Please, try with another one"
          );
          return;
        }
      }

      const id = products.length + 1; //Autogenerate ID

      products.push({
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      });

      await fs.writeFile(this.filepath, JSON.stringify(products, null, 2));
    }
  }

  //Verify if the code already exists in the products array
  async existingCode(code) {
    const products = await this.leerDatosFile();

    const product = products.find((p) => p.code === code);

    if (product) {
      return 1;
    } else {
      return 0;
    }
  }

  //Get properties of a given Product Id
  async getProductById(productId) {
    const products = await this.leerDatosFile();
    const product = await products.find((p) => p.id === productId);

    if (!product) {
      console.log("Not Found");
      return;
    } else {
      return product;
    }
  }

  //Update product data of a given Product Id
  async updateProduct(
    id,
    { title, description, price, thumbnail, code, stock }
  ) {
    const products = await this.leerDatosFile();
    const producto = await products.find((p) => p.id === id);

    if (!producto) {
      console.log("Product Not Found");
      return;
    } else {
      var pr = { id, title, description, price, thumbnail, code, stock };

      products.splice(id - 1, 1, pr);

      await fs.writeFile(this.filepath, JSON.stringify(products, null, 2), {
        flag: "w+",
      });
    }
  }

  //Delete product data of a given Product Id
  async deleteProduct(id) {
    const products = await this.leerDatosFile();
    const producto = await products.find((p) => p.id === id);

    if (!producto) {
      console.log("Product Not Found");
      return;
    } else {
      products.splice(id - 1, 1);

      await fs.writeFile(this.filepath, JSON.stringify(products, null, 2), {
        flag: "w+",
      });
    }
  }

  async leerDatosFile() {
    const data = await fs.readFile(this.filepath, "utf-8");

    if (data == "") {
      return [];
    } else {
      const j = JSON.parse(data);

      return j;
    }
  }
}

const p = new ProductManager(path.join(__dirname, "products.json"));

// console.log("Primera lectura de archivo");
console.log(p.getProducts());

//Ingreso de productos de prueba
const prod1 = new Promise((resolve, rejected) => {
  resolve(
    p.addProduct({
      title: "producto 1",
      description: "Este es un producto prueba",
      price: 200,
      thumbnail: "Sin imagen",
      code: "abc123",
      stock: 25,
    })
  );
});

// prod1.then(() => {
//   const prod = new Promise((resolve, rejected) => {
//     resolve(
//       p.addProduct({
//         title: "producto 2",
//         description: "Este es otro producto de prueba",
//         price: 200,
//         thumbnail: "Sin imagen",
//         code: "abc1235",
//         stock: 25,
//       })
//     );
//   });

//Lectura de un producto de acuerdo a su id
//   prod.then(() => {
//     console.log(p.getProductById(2));
//   });
// });

//Actualización de un producto de acuerdo a su id
// p.updateProduct(2, {
//   title: "producto 2",
//   description: "Este es el producto de prueba actualizado",
//   price: 200,
//   thumbnail: "Sin imagen",
//   code: "abc1235",
//   stock: 25,
// });

//Borrado de un producto de acuerdo a su id
//p.deleteProduct(2);

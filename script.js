document.addEventListener("DOMContentLoaded", () => {
    // Variables de referencia
    const tabs = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");
    const productForm = document.getElementById("productForm");
    const productList = document.getElementById("productList");
    const customerForm = document.getElementById("customerForm");
    const customerList = document.getElementById("customerList");
    const saleForm = document.getElementById("saleForm");
    const customerSelect = document.getElementById("customerSelect");
    const productSelect = document.getElementById("productSelect");
    const saleProductList = document.getElementById("saleProductList");
    const saleTotal = document.getElementById("saleTotal");

    let products = [];
    let customers = [];
    let saleProducts = [];

    // Función para cambiar de pestañas
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            tab.classList.add("active");
            document.getElementById(tab.dataset.tab).classList.add("active");
        });
    });

    // Agregar producto
    productForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("productName").value;
        const price = parseFloat(document.getElementById("productPrice").value);
        const stock = parseInt(document.getElementById("productStock").value);

        if (!name || isNaN(price) || isNaN(stock) || price <= 0 || stock <= 0) {
            return Swal.fire({
                icon: "error",
                title: "Error",
                text: "Por favor, completa todos los campos correctamente."
            });
        }

        const product = { name, price, stock };
        products.push(product);

        updateProductList();
        updateProductSelect();
        productForm.reset();

        Swal.fire({
            icon: "success",
            title: "Producto Agregado",
            text: `El producto "${name}" ha sido añadido con éxito.`,
            timer: 2000,
            showConfirmButton: false
        });
    });

    // Actualizar lista de productos
    function updateProductList() {
        productList.innerHTML = "";
        products.forEach((product, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${product.name} - S/ ${product.price.toFixed(2)} (Stock: ${product.stock})
                <button onclick="removeProduct(${index})">Eliminar</button>`;
            productList.appendChild(li);
        });
    }

    // Actualizar select de productos
    function updateProductSelect() {
        productSelect.innerHTML = '<option value="">Seleccionar Producto</option>';
        products.forEach((product, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = product.name;
            productSelect.appendChild(option);
        });
    }

    // Eliminar producto
    window.removeProduct = (index) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "El producto será eliminado permanentemente.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                products.splice(index, 1);
                updateProductList();
                updateProductSelect();

                Swal.fire({
                    icon: "success",
                    title: "Producto Eliminado",
                    text: "El producto ha sido eliminado correctamente.",
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        });
    };

    // Eliminar todos los productos
    document.getElementById("removeAllProducts").addEventListener("click", () => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Todos los productos serán eliminados permanentemente.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar todos",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                products = [];
                updateProductList();
                updateProductSelect();

                Swal.fire({
                    icon: "success",
                    title: "Productos Eliminados",
                    text: "Todos los productos han sido eliminados correctamente.",
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        });
    });

    // Agregar cliente
    customerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("customerName").value;
        const email = document.getElementById("customerEmail").value;

        if (!name || !email.includes("@")) {
            return Swal.fire({
                icon: "error",
                title: "Error",
                text: "Por favor, ingresa un nombre y un correo electrónico válidos."
            });
        }

        const customer = { name, email };
        customers.push(customer);

        updateCustomerList();
        updateCustomerSelect();
        customerForm.reset();

        Swal.fire({
            icon: "success",
            title: "Cliente Agregado",
            text: `El cliente "${name}" ha sido añadido con éxito.`,
            timer: 2000,
            showConfirmButton: false
        });
    });

    // Actualizar lista de clientes
    function updateCustomerList() {
        customerList.innerHTML = "";
        customers.forEach((customer, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${customer.name} (${customer.email})
                <button onclick="removeCustomer(${index})">Eliminar</button>`;
            customerList.appendChild(li);
        });
    }

    // Actualizar select de clientes
    function updateCustomerSelect() {
        customerSelect.innerHTML = '<option value="">Seleccionar Cliente</option>';
        customers.forEach((customer, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = customer.name;
            customerSelect.appendChild(option);
        });
    }

    // Eliminar cliente
    window.removeCustomer = (index) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "El cliente será eliminado permanentemente.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                customers.splice(index, 1);
                updateCustomerList();
                updateCustomerSelect();

                Swal.fire({
                    icon: "success",
                    title: "Cliente Eliminado",
                    text: "El cliente ha sido eliminado correctamente.",
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        });
    };

    // Eliminar todos los clientes
    document.getElementById("removeAllCustomers").addEventListener("click", () => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Todos los clientes serán eliminados permanentemente.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar todos",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                customers = [];
                updateCustomerList();
                updateCustomerSelect();

                Swal.fire({
                    icon: "success",
                    title: "Clientes Eliminados",
                    text: "Todos los clientes han sido eliminados correctamente.",
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        });
    });

    // Agregar producto a la venta
    document.getElementById("addProductToSale").addEventListener("click", () => {
        const productIndex = productSelect.value;
        const quantity = parseInt(document.getElementById("productQuantity").value);

        if (productIndex === "" || isNaN(quantity) || quantity <= 0) {
            return Swal.fire({
                icon: "error",
                title: "Error",
                text: "Selecciona un producto y cantidad válida."
            });
        }

        const product = products[productIndex];

        if (quantity > product.stock) {
            return Swal.fire({
                icon: "error",
                title: "Error",
                text: "Cantidad no disponible en stock."
            });
        }

        saleProducts.push({ ...product, quantity });
        product.stock -= quantity;

        updateSaleList();
        updateProductList();
        updateProductSelect();

        Swal.fire({
            icon: "info",
            title: "Producto Añadido",
            text: `El producto "${product.name}" ha sido añadido a la venta.`,
            timer: 1500,
            showConfirmButton: false
        });
    });

    // Actualizar lista de venta
    function updateSaleList() {
        saleProductList.innerHTML = "";
        let total = 0;

        saleProducts.forEach((saleProduct) => {
            const li = document.createElement("li");
            li.textContent = `${saleProduct.name} - Cantidad: ${saleProduct.quantity} - Subtotal: S/ ${(saleProduct.price * saleProduct.quantity).toFixed(2)}`;
            saleProductList.appendChild(li);
            total += saleProduct.price * saleProduct.quantity;
        });

        saleTotal.textContent = total.toFixed(2);
    }

    // Confirmar venta
    saleForm.addEventListener("submit", (e) => {
        e.preventDefault();

        if (customerSelect.value === "" || saleProducts.length === 0) {
            return Swal.fire({
                icon: "error",
                title: "Error",
                text: "Selecciona un cliente y agrega productos a la venta."
            });
        }

        Swal.fire({
            icon: "success",
            title: "Venta Registrada",
            text: "La venta ha sido registrada con éxito.",
            timer: 2000,
            showConfirmButton: false
        });

        saleProducts = [];
        updateSaleList();
        saleForm.reset();
    });
});

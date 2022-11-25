let productos = [{
        nombre: "Planta de Tomate Grande",
        id: 44,
        categoria: "plantas",
        precio: 500,
        stock: 10,
        imgUrl: "../img/tomate1.webp"
    },
    {
        nombre: "Planta de Tomate Chica",
        id: 45,
        categoria: "plantas",
        precio: 500,
        stock: 10,
        imgUrl: "../img/tomate2.jpeg"
    },
    {
        nombre: "Maceta Cuadrada",
        id: 46,
        categoria: "macetas",
        precio: 500,
        stock: 10,
        imgUrl: "../img/macetacuadrada.jpeg"
    },
    {
        nombre: "Maceta Rectangular",
        id: 47,
        categoria: "macetas",
        precio: 800,
        stock: 10,
        imgUrl: "../img/macetarectangular.jpeg"
    },
    {
        nombre: "Maceta Lata",
        id: 48,
        categoria: "macetas",
        precio: 400,
        stock: 10,
        imgUrl: "../img/macetalata.jpeg"
    }
]

let contenedorProductos = document.getElementById("contenedorProductos")
renderizarProductos()


let botonPlantas = document.getElementById('btnPlantas')
let botonMacetas = document.getElementById('btnMacetas')

botonPlantas.onclick = () => {
    let productosFiltrados = productos.filter(producto => producto.categoria === "plantas")
    renderizarProductos(productosFiltrados)
}

botonMacetas.onclick = () => {
    let productosFiltrados = productos.filter(producto => producto.categoria === "macetas")
    renderizarProductos(productosFiltrados)
}

function renderizarProductos(productosFiltrados) {
    let productosARenderizar = productos
    if (productosFiltrados) {
        productosARenderizar = productosFiltrados
    }
    contenedorProductos.innerHTML = ''
    for (const {
            imgUrl,
            nombre,
            precio,
            stock,
            id
        } of productosARenderizar) {
        let tarjetaProducto = document.createElement('article')
        tarjetaProducto.style.display = 'flex'
        tarjetaProducto.innerHTML = `
        <div class="card col-lg-6" style="width:500px" >
            <img class="card-img-top img-fluid" src="${imgUrl}" alt="Card image">
            <div class="card-body">
                <h4 class="card-title">${nombre}</h4>
                <p class="card-text">$${precio}</p>
                <p class="card-text">Quedan ${stock} unidades</p>
                <a href="#" class="btn btn-primary" id=${id}>Agregar al carrito</a>
            </div>
        </div>
        `
        contenedorProductos.append(tarjetaProducto)
    }

    let botones = document.getElementsByClassName('btn btn-primary')
    let carrito = document.getElementById('carrito')

    /*let carritoGuardado = []
    if(localStorage.getItem('carrito')){
        carritoGuardado = JSON.parse(localStorage.getItem('carrito'))
    }*/

    let carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || []

    for (const item of carritoGuardado) {
        let productoBuscado = productos.find(producto => producto.id == item.id)
        carrito.innerHTML += `
        <p>${productoBuscado.nombre}</p>
        <p>$${productoBuscado.precio}</p>
        `
    }


    for (const boton of botones) {
        boton.onclick = (e) => {
            let productoBuscado = productos.find(producto => producto.id == e.target.id)
            carrito.innerHTML += `
        <p>${productoBuscado.nombre}</p>
        <p>$${productoBuscado.precio}</p>
        `
            carritoGuardado.push({
                id: productoBuscado.id,
                nombre: productoBuscado.nombre,
                precio: productoBuscado.precio
            })
            console.log(carritoGuardado)
            Swal.fire({
                title: 'Producto agregado al carrito',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            localStorage.setItem('carrito', JSON.stringify(carritoGuardado))
        }
    }
}

const verCarrito = document.getElementById("verCarrito")
verCarrito.onclick = () => {
    carrito.classList.toggle("oculto")
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        title: 'Carrito',
        text: 'Este es el carrito'
      })
}
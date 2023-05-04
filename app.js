const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('.cursos-container');
const listaCursos = document.querySelector('.cards');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];
const carritoBtn = document.querySelector(".cart-btn")
const mobMenu = document.querySelector(".ham-btn")
const MobNav = document.querySelector(".mobile-navigation")
const carritoMob = document.querySelector(".carrito-mob-btn")
const footBtn = document.querySelector('#foot-btn')
const footer = document.querySelector('#footer')

cargarEventListener();
function cargarEventListener() {
	listaCursos.addEventListener('click', agregarCurso);

	vaciarCarrito.addEventListener('click', function vaciar(e) {
		e.preventDefault()
		limpiarCarrito()
	})

	carrito.addEventListener('click', eliminarCurso)

	carritoBtn.addEventListener('click', (e) => {
		if (e.target.matches(".fa-cart-plus")) {
			e.preventDefault();
			console.log('hola');
			carrito.classList.toggle("activo");
		}
	})

	footBtn.addEventListener('click', (e) => {
		if (e.target.matches("#foot-btn")) {
			footer.classList.toggle('active')
		}
	})

	mobMenu.addEventListener('click', (e) => {
		if(e.target.matches(".ham-btn")) {
			MobNav.classList.toggle('active')
		}
	})

	carritoMob.addEventListener('click', (e) => {
		if(e.target.matches(".carrito-mob-btn")) {
			carrito.classList.toggle("activo")
		}
	})

	document.addEventListener('DOMContentLoaded', () => {
		articulosCarrito = JSON.parse( localStorage.getItem('carrito')) || [];

		carritoAgregar();
	})
}

function agregarCurso(e) {
e.preventDefault()
	if (e.target.classList.contains('buy-btn') ) {
		// e.preventDefault()
		const cursoSeleccionado = e.target.parentElement.parentElement;
		leerDatosCursos(cursoSeleccionado);

	}
}

function leerDatosCursos(cursoSeleccionado) {
//console.log(cursoSeleccionado);

const infoCurso = {
	imagen: cursoSeleccionado.querySelector('.course-img').src,
	titulo: cursoSeleccionado.querySelector('.course-info').textContent,
	precio: cursoSeleccionado.querySelector('.price-info').textContent,
	id: cursoSeleccionado.querySelector('.buy-btn').getAttribute('data-id'),
	cantidad: 1
}

// Revisa si un elemento ya existe en el carrito 

const existe = articulosCarrito.some( curso => curso.id === infoCurso.id)
console.log(existe)

if(existe) {
	// Actualizamos la cantidad
	const cursos = articulosCarrito.map(curso => {
		if(curso.id === infoCurso.id) {
			curso.cantidad++;
			return curso; // retorna el objeto actualizado
		} else {
			return curso; // retorna los objetos que no son duplicados
		}
	})
}
else{ 
// Agregar elementos al carrito
articulosCarrito = [...articulosCarrito, infoCurso];
}



console.log(articulosCarrito);

carritoAgregar();
}


function carritoAgregar() {

limpiarCarrito();

// Muestra el carrito en el HTML

articulosCarrito.forEach( curso => {
	const { imagen, titulo, precio, cantidad, id} = curso;
	const row = document.createElement('tr')

	console.log(row)
	row.innerHTML = `
	<td>
		<img src="${imagen}" width="100" height="70px" class="img-curso">
	</td>
	<td>
		${titulo}
	</td>
	<td>
		${precio}
	</td>
	<td>
		${cantidad}
	</td>
	<td>
		<a href="#" class="borrar-curso" data-id="${id}" style="color:white"> x </a>
	</td>
	`
console.log(row)
	// Agregar artículos en el html

	contenedorCarrito.appendChild(row)
});

	// Agregar el carrito de compras al LS

	sincronizarStorage()
}

function sincronizarStorage() {
	localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}

function eliminarCurso(e){
	e.preventDefault()
if (e.target.classList.contains("borrar-curso")) {
	const cursoId = e.target.getAttribute('data-id')
          
          // Eliminar del arreglo del carrito
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
          carritoAgregar()
      }
}

function limpiarCarrito() {
	// Forma lenta
	// contenedorCarrito.innerHTML = ''
	while(contenedorCarrito.firstChild) {
		contenedorCarrito.removeChild(contenedorCarrito.firstChild)
	}
}





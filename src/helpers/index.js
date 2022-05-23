export const generarId = () => {
	// Con el método .substr() se pueden ir eliminando tantos caracteres como se quiera, en orden de izquierda a derecha.
	const random = Math.random().toString(23).substr(2);
	const fecha = Date.now().toString(36);

	return random + fecha;
};

export const formatearFecha = (fecha) => {
	const fechaNueva = new Date(fecha);

	const opciones = {
		// Con 'numeric' hacemos que el año se muestre en forma numerica.
		year: 'numeric',
		// Con 'long' permitimos que el nombre del mes se muestre por completo y no de manera abreviada.
		month: 'long',
		// Con '2-digit' permitimos que el día se muestre solo con dos números o dígitos.
		day: '2-digit',
	};

	return fechaNueva.toLocaleDateString('es-ES', opciones);
};

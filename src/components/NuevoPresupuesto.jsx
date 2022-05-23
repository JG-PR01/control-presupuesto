import { useState } from 'react';
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({
	presupuesto,
	setPresupuesto,
	setIsValidPresupuesto,
}) => {
	const [mensaje, setMensaje] = useState('');

	const handlePresupuesto = (evento) => {
		evento.preventDefault();

		if (!presupuesto || presupuesto < 0) {
			setMensaje('No un presupuesto válido');

			// Este return se coloca aquí para que en caso de que se cumpla esta condición tan solo retorne la alerta de error
			return;
		}
		// Se devuelve el mensaje de alerta a su estado original para que no se muestre en caso de que no haya errores
		setMensaje('');
		// En caso de que no haya errores este State cambia a "true" y se muestra otro componente y si hay un error se muestra la alerta en el formulario.
		setIsValidPresupuesto(true);
	};

	return (
		<div className="contenedor-presupuesto contenedor sombra">
			<form onSubmit={handlePresupuesto} className="formulario">
				<div className="campo">
					<label>Definir Presupuesto</label>
					<input
						className="nuevo-presupuesto"
						type="number"
						placeholder="Añade tu Presupuesto"
						value={presupuesto}
						onChange={(evento) => setPresupuesto(Number(evento.target.value))}
					/>
				</div>
				<input type="submit" value="añadir" />

				{/* Con el atributo - tipo - podemos definir cuál alerta se usará. Este atributo está definido en el componente - Mensaje -*/}
				{/* Esta línea que mostrará el mensaje de error se coloca en este lugar para que se muestre debajo del input */}
				{mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
			</form>
		</div>
	);
};

export default NuevoPresupuesto;

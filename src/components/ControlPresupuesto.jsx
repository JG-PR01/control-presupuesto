import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({
	presupuesto,
	setPresupuesto,
	gastos,
	setGastos,
	setIsValidPresupuesto,
}) => {
	const [porcentaje, setPorcentaje] = useState(0);

	const [disponible, setDisponible] = useState(0);
	const [gastado, setGastado] = useState(0);

	useEffect(() => {
		const totalGastado = gastos.reduce(
			(total, gasto) =>
				// El número que se encuentra después de la coma, hace referencia a el número en que se va a iniciar el "total acumulado".
				// Se accede al objeto de "gastos" través del iterador de gastos que en este caso se llamará "gasto"
				gasto.cantidad + total,
			0
		);
		// En esta variable se hace una simple resta de: presuppuesto - totalGastado (para saber cual es la cantidad disponible)
		const totalDisponible = presupuesto - totalGastado;

		// Calcular porcentaje
		// Con el método ".toFixed" hacemos que el resultado de una operación tenga un máximo de tantos decimales como queramos
		const nuevoPorcentaje = (
			((presupuesto - totalDisponible) / presupuesto) *
			100
		).toFixed(2);

		setTimeout(() => {
			setPorcentaje(nuevoPorcentaje);
		}, 1500);

		setGastado(totalGastado);
		setDisponible(totalDisponible);
	}, [gastos]);

	const formatearCantidad = (cantidad) => {
		return cantidad.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD',
		});
	};

	const handleResetApp = () => {
		const resultado = confirm('¿Desea reiniciar el presupuesto y los gastos?');

		if (resultado) {
			setGastos([]);
			setPresupuesto(0);
			setIsValidPresupuesto(false);
		}
	};

	return (
		<div className="contenedor-presupuesto contenedor sombra dos-columnas">
			<div>
				<CircularProgressbar
					styles={buildStyles({
						// Color de la barra
						pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
						trailColor: '#F5F5F5',
						textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
					})}
					value={porcentaje}
					text={`${porcentaje}% Gastado`}
				/>
			</div>

			<div className="contenido-presupuesto">
				<button className="reset-app" type="button" onClick={handleResetApp}>
					Resetear App
				</button>
				<p>
					<span>Presupuesto: </span>
					{formatearCantidad(presupuesto)}
				</p>

				<p className={`${disponible < 0 ? 'negativo' : ''}`}>
					<span>Disponible: </span>
					{formatearCantidad(disponible)}
				</p>

				<p>
					<span>Gastado: </span>
					{formatearCantidad(gastado)}
				</p>
			</div>
		</div>
	);
};

export default ControlPresupuesto;

const Mensaje = ({ children, tipo }) => {
	// Se tienen varias clases de alerta definidas en el CSS. Al inyectar una variable con el Template de Strings, podemos definir cual de las clases de alerta se usará.
	return <div className={`alerta ${tipo}`}>{children}</div>;
};

export default Mensaje;

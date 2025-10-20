import "../../styles/PrivacyPolicy.css";

export default function PrivacyPolicy() {
  return (
    <main className="container prose privacy mx-auto px-4 py-8" style={{marginTop:"40px"}}>
      <h1>Política de Privacidad</h1>
      <p><strong>Última actualización:</strong> 20/10/2025</p>

      <p>
        Esta Política de Privacidad describe cómo Acuíferos Chile (“la Aplicación”, “nosotros”)
        trata los datos personales de sus usuarios.
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <ul>
        <li><strong>Nombre del responsable:</strong> Acuíferos Chile</li>
        <li><strong>Sitio web:</strong> https://acuiferoschile.cl</li>
        <li><strong>Contacto:</strong> correosacuiferos@gmail.com</li>
      </ul>

      <h2>2. Datos que recopilamos</h2>
      <ul>
        <li><strong>Datos de registro local:</strong> nombre, apellido, correo electrónico y contraseña (hash).</li>
        <li><strong>Ingreso con Google:</strong> sub, correo verificado, nombre, apellidos y avatar.</li>
        <li><strong>Datos de uso:</strong> publicaciones, comentarios y reacciones.</li>
        <li><strong>Datos técnicos:</strong> cookies y/o localStorage (token JWT).</li>
      </ul>

      <h2>3. Finalidades y base jurídica</h2>
      <ul>
        <li><strong>Autenticación y cuenta:</strong> prestar el servicio solicitado (ejecución de contrato).</li>
        <li><strong>Operación de la plataforma:</strong> posts/comentarios/reacciones (ejecución de contrato).</li>
        <li><strong>Soporte:</strong> responder consultas (interés legítimo/ejecución de contrato).</li>
      </ul>

      <h2>4. Terceros receptores</h2>
      <p>
        Usamos Google Identity Services para autenticación con Google. También proveedores de hosting/BD para
        alojar la aplicación. No vendemos tus datos personales.
      </p>

      <h2>5. Conservación</h2>
      <p>
        Conservamos tus datos mientras tu cuenta esté activa o sea necesario para la prestación del servicio.
        Puedes solicitar la eliminación de tu cuenta salvo obligaciones legales.
      </p>

      <h2>6. Seguridad</h2>
      <p>Aplicamos medidas razonables (hash de contraseñas, HTTPS, control de accesos).</p>

      <h2>7. Tus derechos</h2>
      <p>
        Puedes ejercer derechos de acceso, rectificación, eliminación, oposición y portabilidad en
        <a href="mailto:correosacuiferos@gmail.com">correosacuiferos@gmail.com</a>.
      </p>

      <h2>8. Cookies y almacenamiento local</h2>
      <p>
        Utilizamos cookies/localStorage para mantener la sesión. Si las bloqueas, ciertas funciones
        podrían no operar correctamente.
      </p>

      <h2>9. Cambios</h2>
      <p>
        Publicaremos cualquier cambio en esta URL, indicando la fecha de última actualización.
      </p>
    </main>
  );
}

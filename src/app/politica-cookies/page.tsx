export default function PoliticaCookies() {
  const containerStyle = {
    maxWidth: 800,
    margin: "0 auto",
    padding: "80px 24px",
  };

  const headingStyle = {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "32px",
    marginTop: "0",
  };

  const sectionHeadingStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    marginTop: "32px",
    marginBottom: "16px",
  };

  const paragraphStyle = {
    fontSize: "16px",
    lineHeight: "1.6",
    marginBottom: "16px",
    color: "#333",
  };

  const listStyle = {
    marginLeft: "24px",
    marginBottom: "16px",
  };

  const listItemStyle = {
    fontSize: "16px",
    lineHeight: "1.6",
    marginBottom: "8px",
    color: "#333",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Política de cookies</h1>

      <p style={paragraphStyle}>
        Minute Call S.L. (en adelante, "Minute Call") informa, a través de la presente Política de Cookies, sobre el uso de dispositivos de almacenamiento y recuperación de datos en los equipos terminales de los usuarios.
      </p>

      <h2 style={sectionHeadingStyle}>1. ¿Qué son las cookies?</h2>
      <p style={paragraphStyle}>
        Las cookies son pequeños archivos que se instalan en el dispositivo del usuario a solicitud del sitio web y que se utilizan para realizar determinadas funciones dentro del servicio web al que se accede.
      </p>

      <p style={paragraphStyle}>
        Este sitio web utiliza cookies propias y de terceros para mantener la sesión del usuario que accede al servicio (cookies técnicas), recordar las preferencias del usuario (cookies de personalización), analizar el uso del sitio web (cookies de análisis) y permitir la interacción con redes sociales (cookies de redes sociales). Al interactuar con servicios web de terceros que prestan un servicio a Minute Call, también pueden utilizarse cookies de dichos servicios (cookies de terceros).
      </p>

      <h2 style={sectionHeadingStyle}>2. ¿Para qué utiliza Minute Call las cookies?</h2>
      <p style={paragraphStyle}>
        De conformidad con el artículo 22 de la Ley de Servicios de la Sociedad de la Información y de Comercio Electrónico y el Considerando 30 del Reglamento General de Protección de Datos (RGPD), este sitio web utiliza cookies o tecnologías similares para rastrear las interacciones de los usuarios con los servicios ofrecidos en la web.
      </p>

      <p style={paragraphStyle}>
        Las cookies permiten reconocer el navegador y el tipo de dispositivo del usuario, haciendo que el sitio web sea más eficiente y útil en futuras visitas.
      </p>

      <p style={paragraphStyle}>
        Las cookies técnicas se utilizan para mantener la sesión del usuario y garantizar el correcto funcionamiento de las áreas restringidas a las que acceden usuarios autenticados. Si se desactivan las cookies en el navegador, es posible que ciertos servicios no funcionen correctamente. Una vez finalizada la sesión, estas cookies se eliminan automáticamente.
      </p>

      <p style={paragraphStyle}>
        Las cookies de personalización se utilizan para recordar preferencias de navegación como el idioma o las opciones elegidas previamente. Si se desactivan las cookies o se accede desde otro dispositivo, sus preferencias no se guardarán y deberán seleccionarse de nuevo.
      </p>

      <p style={paragraphStyle}>
        Las cookies de análisis se utilizan para medir y analizar la actividad de los usuarios en el sitio web con el fin de mejorar la oferta de productos o servicios. Estas cookies no recopilan datos personales. Minute Call utiliza Google Analytics para esta finalidad. La desactivación de estas cookies no afectará al funcionamiento del sitio web, aunque impedirá el análisis estadístico.
      </p>

      <p style={paragraphStyle}>
        Las cookies de redes sociales son cookies de terceros que permiten a los usuarios interactuar con plataformas como Facebook, Twitter, LinkedIn u otras similares. Su uso se rige por las políticas de privacidad y cookies de cada red social.
      </p>

      <p style={paragraphStyle}>
        Minute Call no utiliza cookies propias que almacenen información personal identificable como nombre, apellidos, direcciones de correo electrónico o datos postales, ni se emplean cookies para obtener o acceder a información personal.
      </p>

      <p style={paragraphStyle}>
        Los usuarios que no deseen que se instalen cookies (lo que puede impedir el correcto funcionamiento de algunos servicios) o que prefieran ser informados antes de su instalación pueden configurar su navegador en consecuencia. Los usuarios también pueden eliminar en cualquier momento todas las cookies generadas en sus dispositivos.
      </p>

      <p style={paragraphStyle}>
        Estas son cookies esenciales que no requieren consentimiento:
      </p>

      <ul style={listStyle}>
        <li style={listItemStyle}>__hs_opt_out – recuerda que el visitante ha rechazado las cookies; caduca en 6 meses</li>
        <li style={listItemStyle}>__hs_do_not_track – evita que el código de seguimiento envíe información; caduca en 6 meses</li>
        <li style={listItemStyle}>__hs_initial_opt_in – evita que el banner se muestre siempre en modo estricto; caduca en 7 días</li>
        <li style={listItemStyle}>__hs_cookie_cat_pref – registra las categorías consentidas; caduca en 6 meses</li>
        <li style={listItemStyle}>__hs_gpc_banner_dismiss – guarda cuándo se cierra el banner de Control Global de Privacidad; caduca en 180 días</li>
        <li style={listItemStyle}>__hs_notify_banner_dismiss – guarda cuándo se cierra el banner de notificación; caduca en 180 días</li>
        <li style={listItemStyle}>hs_ab_test – garantiza que los visitantes vean la misma versión de una página en pruebas A/B; caduca al final de la sesión</li>
        <li style={listItemStyle}>id_key – mantiene el acceso a páginas protegidas por contraseña; caduca en 14 días</li>
        <li style={listItemStyle}>hs-messages-is-open – guarda si el widget de chat está abierto; caduca en 30 minutos</li>
        <li style={listItemStyle}>hs-messages-hide-welcome-message – evita que el mensaje de bienvenida vuelva a mostrarse; caduca en 1 día</li>
        <li style={listItemStyle}>__hsmem – identifica a los miembros con sesión iniciada; caduca en 7 días</li>
        <li style={listItemStyle}>hs-membership-csrf – garantiza que los inicios de sesión de miembros no puedan falsificarse; caduca al final de la sesión</li>
        <li style={listItemStyle}>hs_langswitcher_choice – guarda el idioma seleccionado; caduca en 2 años</li>
        <li style={listItemStyle}>__cfruid, __cfuvid, __cf_bm – cookies de Cloudflare para seguridad y limitación de tráfico; caducan al final de la sesión o en 30 minutos</li>
      </ul>

      <h2 style={sectionHeadingStyle}>3. Cómo desactivar las cookies</h2>
      <p style={paragraphStyle}>
        Las cookies no esenciales pueden desactivarse en la sección "Configurar Cookies" disponible en el pie de página del sitio web. Todos los navegadores también permiten gestionar o eliminar cookies.
      </p>

      <h2 style={sectionHeadingStyle}>4. Aceptación de cookies</h2>
      <p style={paragraphStyle}>
        Este sitio web no instala cookies en los dispositivos de los usuarios hasta que estos hayan aceptado su instalación. Si decide no aceptarlas o posteriormente desactivarlas, es posible que algunos servicios no estén disponibles o que no pueda acceder a determinadas funciones o características del sitio web.
      </p>
    </div>
  );
}

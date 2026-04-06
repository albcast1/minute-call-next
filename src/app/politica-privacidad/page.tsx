import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | minute call",
  description:
    "Conoce nuestra política de privacidad y cómo tratamos tus datos personales en Minute Call",
};

export default function PoliticaPrivacidad() {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 64px 80px" }}>
      {/* Badge */}
      <span className="pill-label" style={{ marginBottom: 24, display: "inline-block" }}>
        Privacidad
      </span>

      {/* Heading */}
      <h1 style={{ marginTop: 16, fontSize: 32, letterSpacing: "-1.5px", lineHeight: "38px" }}>
        Política de <span className="serif-italic">Privacidad</span>
      </h1>

      {/* Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 32, maxWidth: 800 }}>
        {/* Intro */}
        <p>
          Le invitamos a leer nuestra Política de Privacidad completa a continuación para comprender
          en detalle el uso que haremos de sus datos personales y los derechos que tiene en relación
          con ellos.
        </p>

        {/* Sobre nosotros */}
        <section>
          <h2 style={{ marginTop: 48, marginBottom: 16, fontSize: 20, letterSpacing: "-0.5px", lineHeight: "26px" }}>Sobre nosotros</h2>
          <p>
            Somos Minute Call S.L. y tratamos sus datos personales como Responsables del Tratamiento.
            Esto significa que nos encargamos de cómo utilizar y proteger sus datos.
          </p>
        </section>

        {/* Qué uso damos a sus datos */}
        <section>
          <h2 style={{ marginTop: 48, marginBottom: 16, fontSize: 20, letterSpacing: "-0.5px", lineHeight: "26px" }}>Qué uso damos a sus datos</h2>
          <p>
            Utilizaremos sus datos (facilitados online o por otros medios), entre otras finalidades,
            para responder a sus consultas, dudas y sugerencias.
          </p>
        </section>

        {/* Para qué los utilizamos */}
        <section>
          <h2 style={{ marginTop: 48, marginBottom: 16, fontSize: 20, letterSpacing: "-0.5px", lineHeight: "26px" }}>Para qué los utilizamos</h2>
          <p>
            Estamos legitimados para tratar sus datos porque tenemos un interés legítimo en responder
            a sus preguntas y atender sus dudas y sugerencias.
          </p>
        </section>

        {/* Sus derechos */}
        <section>
          <h2 style={{ marginTop: 48, marginBottom: 16, fontSize: 20, letterSpacing: "-0.5px", lineHeight: "26px" }}>Sus derechos</h2>
          <p>
            Tiene derecho a acceder, rectificar o suprimir sus datos personales.
          </p>
        </section>

        {/* Cómo puede contactarnos */}
        <section>
          <h2 style={{ marginTop: 48, marginBottom: 16, fontSize: 20, letterSpacing: "-0.5px", lineHeight: "26px" }}>Cómo puede contactarnos</h2>
          <p>
            Puede contactar con el Delegado de Protección de Datos por correo electrónico:{" "}
            <a href="mailto:privacy@minute-call.com" style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>
              privacy@minute-call.com
            </a>
          </p>
        </section>

        {/* Qué datos recopila Minute Call */}
        <section>
          <h2 style={{ marginTop: 48, marginBottom: 16, fontSize: 20, letterSpacing: "-0.5px", lineHeight: "26px" }}>
            Qué datos recopila Minute Call a través del sitio web
          </h2>
          <p>
            Podemos tener acceso a los siguientes datos:
          </p>
          <ul style={{ marginLeft: 24, marginTop: 12 }}>
            <li>
              <strong>Datos identificativos:</strong> nombre y apellidos
            </li>
            <li>
              <strong>Datos de contacto:</strong> correo electrónico, teléfono
            </li>
          </ul>
        </section>

        {/* Con qué finalidad trata Minute Call */}
        <section>
          <h2 style={{ marginTop: 48, marginBottom: 16, fontSize: 20, letterSpacing: "-0.5px", lineHeight: "26px" }}>
            Con qué finalidad trata Minute Call sus datos personales
          </h2>
          <p>
            Tratamos sus datos personales con el máximo respeto y cumplimiento de la normativa
            aplicable en materia de protección de datos.
          </p>
          <p style={{ marginTop: 16 }}>
            Tratamos sus datos en relación con su solicitud de información sobre los servicios que
            prestamos, nuestras actividades profesionales y empresariales, su asistencia a nuestras
            oficinas, a un evento o seminario organizado por Minute Call o sus socios comerciales,
            así como para contactar con usted e informarle en el marco de nuestras actividades
            profesionales y empresariales.
          </p>
          <p style={{ marginTop: 16 }}>
            Sus datos personales podrán ser utilizados para las siguientes finalidades, de acuerdo
            con el consentimiento expresamente otorgado en el correspondiente formulario de registro:
          </p>
          <ul style={{ marginLeft: 24, marginTop: 12 }}>
            <li>Permitir que el sitio web cumpla su función de prestar los servicios solicitados.</li>
            <li>
              Gestionar, tramitar y responder a solicitudes, peticiones, incidencias o consultas del
              Usuario.
            </li>
            <li>
              Envío de newsletters, felicitaciones navideñas o similares, así como comunicaciones o
              información sobre la actividad de Minute Call por teléfono, correo electrónico,
              SMS/MMS u otros medios equivalentes de comunicación electrónica.
            </li>
            <li>Gestionar su candidatura en procesos de selección de personal.</li>
          </ul>
          <p style={{ marginTop: 16 }}>
            Le informamos de que nos limitaremos a tratar sus datos personales para las finalidades
            mencionadas y que, en ningún caso, se tomarán decisiones automatizadas basadas en su
            perfil.
          </p>
        </section>

        {/* Durante cuánto tiempo conservamos */}
        <section>
          <h2 style={{ marginTop: 48, marginBottom: 16, fontSize: 20, letterSpacing: "-0.5px", lineHeight: "26px" }}>
            Durante cuánto tiempo conservamos sus datos personales
          </h2>
          <p>
            La protección de la privacidad y de los datos personales de los Usuarios es muy
            importante para Minute Call. Por ello, hacemos todo lo posible para evitar un uso
            indebido de los datos de los Usuarios. Solo el personal autorizado tiene acceso a ellos.
          </p>
          <p style={{ marginTop: 16 }}>
            Los datos personales del Usuario se conservarán mientras se mantenga la finalidad para la
            que fueron recabados o mientras el Usuario no haya revocado su consentimiento, ejerciendo
            cualquiera de los derechos que le asisten conforme a la legislación aplicable o
            solicitando la supresión de determinados datos personales.
          </p>
          <p style={{ marginTop: 16 }}>
            Posteriormente, en caso necesario, Minute Call mantendrá la información bloqueada durante
            los plazos legalmente establecidos.
          </p>
          <p style={{ marginTop: 16 }}>
            Nos comprometemos a cumplir con nuestra obligación de secreto y confidencialidad respecto
            a los datos personales, de acuerdo con lo establecido en la normativa aplicable.
          </p>
        </section>

        {/* Legitimación */}
        <section>
          <h2 style={{ marginTop: 48, marginBottom: 16, fontSize: 20, letterSpacing: "-0.5px", lineHeight: "26px" }}>
            Cuál es la legitimación para el tratamiento de mis datos personales
          </h2>
          <p>
            Le informamos de que la legitimación para el tratamiento de sus datos es el consentimiento
            que nos ha otorgado al facilitarnos sus datos personales, así como al marcar la(s)
            casilla(s) de aceptación de la Política de Privacidad habilitadas para tal fin.
          </p>
        </section>

        {/* Derechos del titular */}
        <section>
          <h2 style={{ marginTop: 48, marginBottom: 16, fontSize: 20, letterSpacing: "-0.5px", lineHeight: "26px" }}>
            Qué derechos tiene como titular de los datos
          </h2>
          <p>
            Usted, como titular de los datos personales, tanto en su propio nombre como a través de
            un representante legal o voluntario, puede ejercer los derechos de acceso, rectificación,
            limitación del tratamiento, supresión, oposición, así como el derecho a la portabilidad
            de sus datos y a no ser objeto de decisiones basadas únicamente en el tratamiento
            automatizado de datos.
          </p>
          <p style={{ marginTop: 16 }}>
            Para ejercerlos, deberá contactarnos a través del correo electrónico{" "}
            <a href="mailto:clients@minute-call.com" style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>
              clients@minute-call.com
            </a>
            , indicando en el asunto "Derechos de Protección de Datos".
          </p>
          <p style={{ marginTop: 16 }}>
            En un plazo máximo de 30 días, empleando todos nuestros esfuerzos y los medios a nuestro
            alcance para reducir este plazo lo máximo posible, desde la recepción de su solicitud,
            recibirá una respuesta por nuestra parte. Si no queda satisfecho, podrá presentar una
            reclamación ante una Autoridad de Control, en particular en el Estado en el que tenga su
            residencia habitual, su lugar de trabajo o el lugar de la supuesta infracción, en caso de
            que considere que el tratamiento de sus datos personales no se ajusta a la normativa, así
            como en el caso de no ver atendido el ejercicio de sus derechos. La autoridad de control
            ante la que se haya presentado la reclamación informará al reclamante sobre el curso y el
            resultado de la misma.
          </p>
        </section>

        {/* Cambios en la política */}
        <section>
          <h2 style={{ marginTop: 48, marginBottom: 16, fontSize: 20, letterSpacing: "-0.5px", lineHeight: "26px" }}>Cambios en la política de privacidad</h2>
          <p>
            Podremos modificar la información contenida en esta Política de Privacidad cuando lo
            consideremos oportuno. En cualquier caso, le sugerimos que revise esta Política de
            Privacidad de vez en cuando por si hubiera cambios menores o introdujéramos alguna mejora
            interactiva, aprovechando que siempre la encontrará como un punto permanente de
            información en nuestro sitio web.
          </p>
        </section>
      </div>
    </div>
  );
}

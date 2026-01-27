import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EmailLink } from "@/components/EmailLink";

const TermsConditions = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow pt-28 pb-12 md:pt-32 md:pb-16">
        <div className="container mx-auto px-4 max-w-4xl animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8">
            Términos y Condiciones de Uso
          </h1>
          
          <div className="prose prose-lg max-w-none text-foreground/80 space-y-6">
            <p className="text-muted-foreground">
              Última actualización: Diciembre 2025
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">1. Aceptación de los Términos</h2>
              <p>
                Al acceder y utilizar el sitio web de Integra Residenciales (en adelante, "el Sitio"), usted acepta estar sujeto a estos Términos y Condiciones de Uso, así como a nuestra Política de Privacidad. Si no está de acuerdo con alguno de estos términos, le rogamos que no utilice nuestro Sitio.
              </p>
              <p>
                Integra Residenciales es una asociación civil sin fines de lucro dedicada a orientar y asesorar a familias en la búsqueda de residenciales para adultos mayores en Uruguay. Estos términos regulan el uso del Sitio y los servicios de información y asesoramiento que brindamos.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">2. Descripción del Servicio</h2>
              <p>
                Integra Residenciales ofrece a través de su Sitio:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Información sobre residenciales para adultos mayores que forman parte de nuestra red.</li>
                <li>Herramientas de búsqueda y comparación de residenciales según diversos criterios (ubicación, servicios, tipo de estadía, etc.).</li>
                <li>Asesoramiento personalizado para ayudar a las familias a encontrar el residencial más adecuado para sus necesidades.</li>
                <li>Información general sobre el cuidado de personas mayores y temas relacionados.</li>
                <li>Gestión de convenios y beneficios exclusivos para usuarios de la red.</li>
              </ul>
              <p>
                El Sitio actúa como intermediario de información y no como prestador directo de servicios de residencia o cuidado de personas mayores. Cada residencial miembro de la red es una entidad independiente responsable de sus propios servicios.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">3. Uso Aceptable del Sitio</h2>
              <p>
                Al utilizar nuestro Sitio, usted se compromete a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Proporcionar información veraz y actualizada cuando complete formularios o realice consultas.</li>
                <li>No utilizar el Sitio para fines ilegales o no autorizados.</li>
                <li>No intentar acceder a áreas restringidas del Sitio sin autorización.</li>
                <li>No interferir con el funcionamiento normal del Sitio ni intentar dañar su infraestructura.</li>
                <li>No recopilar información de otros usuarios sin su consentimiento.</li>
                <li>Respetar los derechos de propiedad intelectual de Integra Residenciales y terceros.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">4. Propiedad Intelectual</h2>
              <p>
                Todo el contenido del Sitio, incluyendo pero no limitado a textos, gráficos, logotipos, iconos, imágenes, clips de audio y video, compilaciones de datos y software, es propiedad de Integra Residenciales o de sus proveedores de contenido y está protegido por las leyes de propiedad intelectual de Uruguay y tratados internacionales.
              </p>
              <p>
                Se permite la visualización y descarga de contenido del Sitio únicamente para uso personal y no comercial. Queda prohibida la reproducción, distribución, modificación o cualquier otro uso del contenido sin autorización previa y por escrito de Integra Residenciales.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">5. Información de Residenciales</h2>
              <p>
                La información sobre los residenciales que aparece en nuestro Sitio es proporcionada por los propios establecimientos miembros de la red. Si bien Integra Residenciales realiza esfuerzos razonables para verificar la exactitud de esta información:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>No garantizamos que toda la información sea completa, exacta o actualizada en todo momento.</li>
                <li>No nos responsabilizamos por errores u omisiones en la información proporcionada por los residenciales.</li>
                <li>Recomendamos a los usuarios verificar directamente con cada residencial la información que consideren relevante antes de tomar decisiones.</li>
                <li>Las imágenes y descripciones son orientativas y pueden no reflejar el estado actual exacto de las instalaciones.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">6. Limitación de Responsabilidad</h2>
              <p>
                Integra Residenciales:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>No es responsable de la calidad, seguridad o idoneidad de los servicios prestados por los residenciales miembros de la red.</li>
                <li>No garantiza resultados específicos derivados del uso del Sitio o de nuestros servicios de asesoramiento.</li>
                <li>No se hace responsable de daños directos, indirectos, incidentales o consecuentes que puedan surgir del uso o la imposibilidad de uso del Sitio.</li>
                <li>No garantiza la disponibilidad ininterrumpida del Sitio ni la ausencia de errores técnicos.</li>
              </ul>
              <p>
                En ningún caso la responsabilidad de Integra Residenciales excederá el monto que usted haya pagado, si corresponde, por el uso de nuestros servicios.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">7. Enlaces a Terceros</h2>
              <p>
                El Sitio puede contener enlaces a sitios web de terceros (como páginas de residenciales, redes sociales, mapas, etc.). Estos enlaces se proporcionan únicamente para su conveniencia. Integra Residenciales no controla estos sitios externos y no es responsable de su contenido, políticas de privacidad o prácticas. El acceso a sitios de terceros es bajo su propia responsabilidad.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">8. Registro y Cuentas de Usuario</h2>
              <p>
                Algunas funcionalidades del Sitio pueden requerir registro o creación de cuenta. En tales casos:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Usted es responsable de mantener la confidencialidad de sus credenciales de acceso.</li>
                <li>Debe notificarnos inmediatamente si sospecha de un uso no autorizado de su cuenta.</li>
                <li>Nos reservamos el derecho de suspender o cancelar cuentas que violen estos términos.</li>
                <li>Toda actividad realizada desde su cuenta es su responsabilidad.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">9. Comunicaciones</h2>
              <p>
                Al utilizar nuestro Sitio y proporcionar sus datos de contacto, usted acepta recibir comunicaciones de Integra Residenciales relacionadas con:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Respuestas a sus consultas y solicitudes de información.</li>
                <li>Información sobre residenciales que puedan ser de su interés.</li>
                <li>Actualizaciones importantes sobre nuestros servicios.</li>
              </ul>
              <p>
                Puede optar por no recibir comunicaciones promocionales en cualquier momento contactándonos a través de los medios indicados en nuestra Política de Privacidad.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">10. Indemnización</h2>
              <p>
                Usted acepta indemnizar y mantener indemne a Integra Residenciales, sus directivos, empleados, colaboradores y agentes, de cualquier reclamación, daño, pérdida, responsabilidad y gasto (incluidos honorarios legales) que surjan de su uso del Sitio, su violación de estos Términos, o su violación de cualquier derecho de terceros.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">11. Modificaciones</h2>
              <p>
                Integra Residenciales se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones entrarán en vigor desde su publicación en el Sitio. Le recomendamos revisar periódicamente esta página. El uso continuado del Sitio después de cualquier modificación constituye su aceptación de los nuevos términos.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">12. Legislación Aplicable y Jurisdicción</h2>
              <p>
                Estos Términos y Condiciones se rigen por las leyes de la República Oriental del Uruguay. Para cualquier controversia derivada del uso del Sitio o de estos términos, las partes se someten a la jurisdicción de los tribunales competentes de la ciudad de Montevideo, Uruguay, renunciando a cualquier otro fuero que pudiera corresponderles.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">13. Divisibilidad</h2>
              <p>
                Si alguna disposición de estos Términos se considera inválida o inaplicable, dicha disposición se modificará o eliminará en la medida necesaria, y las disposiciones restantes continuarán en pleno vigor y efecto.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">14. Contacto</h2>
              <p>
                Si tiene preguntas sobre estos Términos y Condiciones, puede contactarnos a través de:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Correo electrónico: <EmailLink email="integraresidenciales@cncs.com.uy" className="text-primary hover:underline" /></li>
                <li>Teléfono: <a href="tel:+59897774000" className="text-primary hover:underline" style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}>598 97 774 000</a></li>
                <li>Formulario de contacto disponible en nuestro Sitio.</li>
              </ul>
            </section>

            <div className="mt-8 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                Al utilizar el sitio web de Integra Residenciales, usted confirma que ha leído, comprendido y aceptado estos Términos y Condiciones en su totalidad.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsConditions;

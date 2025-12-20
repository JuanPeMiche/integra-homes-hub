import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Shield, Mail, Phone, MapPin } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Política de Privacidad y Uso de Cookies
            </h1>
            <p className="text-muted-foreground">
              Última actualización: Diciembre 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-gray dark:prose-invert">
            
            {/* Introduction */}
            <div className="bg-card rounded-lg p-6 mb-8 border">
              <p className="text-foreground leading-relaxed">
                Integra Residenciales se compromete firmemente a proteger la privacidad de sus usuarios y la confidencialidad de sus datos personales. La protección de los datos personales es un derecho fundamental en Uruguay, reconocido por la <strong>Ley N.º 18.331 de Protección de Datos Personales</strong>. Esta política, alineada con dicha normativa, explica de forma clara y transparente cómo recopilamos, utilizamos y resguardamos su información. Nuestro objetivo es brindar confianza a las personas mayores, sus familias y todos nuestros usuarios, evitando lenguaje excesivamente legalista pero cumpliendo con nuestras obligaciones legales en Uruguay.
              </p>
            </div>

            {/* Section 1 */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-bold">1</span>
                Propósito del tratamiento de datos personales
              </h2>
              <p className="text-muted-foreground mb-4">
                Recopilamos y tratamos datos personales únicamente con fines legítimos y claramente informados al usuario. Los propósitos principales para los cuales Integra Residenciales puede utilizar sus datos personales incluyen:
              </p>
              
              <div className="space-y-4">
                <div className="bg-muted/30 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Responder consultas y prestación de servicios</h3>
                  <p className="text-muted-foreground text-sm">
                    Utilizamos sus datos para atender sus consultas sobre residenciales para adultos mayores, ayudarlo a encontrar el hogar adecuado y brindarle la información o asesoramiento que solicite. Por ejemplo, si completa nuestro formulario de contacto indicando preferencias del huésped (sexo, tipo de habitación, etc.), empleamos esa información para orientarlo en la búsqueda del residencial apropiado.
                  </p>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Gestión de relaciones y comunicación</h3>
                  <p className="text-muted-foreground text-sm">
                    Podemos emplear sus datos de contacto para mantener la comunicación con usted, ya sea para responder sus mensajes, coordinar visitas o gestionar la relación entre usted (o su familiar) y los residenciales miembros de nuestra red.
                  </p>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Procesos de selección de personal</h3>
                  <p className="text-muted-foreground text-sm">
                    Si nos envía su currículum u otros datos personales para trabajar con nosotros, los utilizaremos exclusivamente para evaluar su perfil y eventualmente comunicarnos con usted en el marco de nuestros procesos de reclutamiento.
                  </p>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Mejora de nuestros servicios</h3>
                  <p className="text-muted-foreground text-sm">
                    También tratamos datos (incluyendo datos técnicos anónimos o agregados) para analizar el uso de nuestro sitio web y mejorar nuestra plataforma. Esto nos permite entender las necesidades de nuestros usuarios y optimizar tanto la experiencia de navegación como la calidad de los servicios que ofrecemos.
                  </p>
                </div>
              </div>
              
              <p className="text-muted-foreground mt-4">
                Integra Residenciales no compartirá ni divulgará sus datos personales a terceros ajenos a nuestra organización o a la red de residenciales, salvo que usted nos autorice expresamente o que sea necesario para cumplir con la prestación de un servicio solicitado. <strong>En ningún caso vendemos sus datos personales a terceros.</strong>
              </p>
            </div>

            {/* Section 2 */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-bold">2</span>
                Datos personales recopilados y su uso
              </h2>
              <p className="text-muted-foreground mb-4">
                Los tipos de datos personales que podemos recopilar, y el modo en que los utilizamos, dependen de su interacción con nosotros. A continuación, detallamos las categorías de datos que manejamos y su finalidad:
              </p>
              
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-foreground mb-2">Datos de contacto e identificación</h3>
                  <p className="text-muted-foreground text-sm">
                    Incluyen, por ejemplo, nombre, correo electrónico, número de teléfono y eventualmente su cédula de identidad. Estos datos nos permiten identificarlo y comunicarnos con usted para responder sus consultas, brindar asesoramiento personalizado o coordinar servicios solicitados.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-foreground mb-2">Datos del huésped (persona mayor)</h3>
                  <p className="text-muted-foreground text-sm">
                    En caso de que nos proporcione información sobre el futuro residente (por ejemplo, indicando si el huésped es hombre o mujer, preferencias de habitación privada o compartida, etc.), utilizaremos esos datos para entender sus necesidades y recomendarle opciones adecuadas en nuestra red de residenciales. Esta información es tratada con especial cuidado dada la sensibilidad que puede revestir la situación de las personas mayores.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-foreground mb-2">Información enviada en postulaciones laborales</h3>
                  <p className="text-muted-foreground text-sm">
                    Si usted desea trabajar con nosotros y nos envía datos personales relativos a su experiencia profesional, formación, referencias u otra información de su currículum, estos serán utilizados exclusivamente para procesar su candidatura, contactarlo en caso de avanzar en un proceso de selección y eventualmente integrarlo a nuestro equipo de trabajo.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-foreground mb-2">Datos de navegación y técnicos</h3>
                  <p className="text-muted-foreground text-sm">
                    Cuando navega por nuestro sitio web, es posible que automáticamente recolectemos ciertos datos técnicos, como la dirección IP desde la que accede, el tipo de navegador que utiliza, las páginas que visita en nuestro sitio y el horario de su visita. Esta información se emplea con fines estadísticos y de mejora continua del sitio.
                  </p>
                </div>
              </div>
              
              <p className="text-muted-foreground mt-4">
                Todos los datos personales que nos proporcione serán tratados de manera lícita, leal y transparente. Solo solicitamos aquellos datos que son pertinentes y necesarios en relación con la finalidad declarada de cada formulario o interacción (principio de minimización de datos). Además, conservaremos sus datos únicamente durante el tiempo que resulte necesario para cumplir con los propósitos detallados y las exigencias legales aplicables.
              </p>
            </div>

            {/* Section 3 */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-bold">3</span>
                Uso de cookies y su finalidad
              </h2>
              <p className="text-muted-foreground mb-4">
                En nuestro sitio web utilizamos cookies y tecnologías similares para mejorar la experiencia de los usuarios, ofrecer funcionalidades y obtener estadísticas de uso. Una cookie es un pequeño archivo de información que nuestro sitio web envía a su navegador y que se almacena en su dispositivo (computadora, teléfono, etc.). Las cookies cumplen diversas funciones importantes:
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-card border rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">⚙️</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Funcionalidad y preferencias</h3>
                  <p className="text-muted-foreground text-xs">
                    Algunas cookies son esenciales para el funcionamiento del sitio y permiten recordar sus preferencias, brindándole una experiencia más fluida y personalizada.
                  </p>
                </div>
                
                <div className="bg-card border rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Estadísticas y mejora</h3>
                  <p className="text-muted-foreground text-xs">
                    Utilizamos cookies analíticas para recopilar datos agregados sobre cómo los visitantes usan nuestra web y así mejorar nuestros contenidos y servicios.
                  </p>
                </div>
                
                <div className="bg-card border rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🔗</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Cookies de terceros</h3>
                  <p className="text-muted-foreground text-xs">
                    Nuestro sitio podría integrar contenidos de terceros (videos, mapas, redes sociales) que pueden enviar sus propias cookies al navegador.
                  </p>
                </div>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Gestión de cookies:</strong> Usted tiene la posibilidad de aceptar o rechazar las cookies. En cualquier momento, puede configurar su navegador para que bloquee las cookies, le avise antes de instalarlas o las elimine de su dispositivo. Si decide deshabilitarlas completamente, es posible que algunas secciones de nuestro sitio no funcionen correctamente.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-bold">4</span>
                Base legal para el tratamiento de datos
              </h2>
              <p className="text-muted-foreground mb-4">
                El tratamiento que realizamos de sus datos personales se sustenta en bases legales legítimas, conforme a la legislación uruguaya vigente. Principalmente, contamos con su <strong>consentimiento libre, previo e informado</strong> para tratar sus datos personales en las situaciones en que usted nos los proporciona voluntariamente.
              </p>
              
              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Ejecución de un contrato o relación precontractual</h4>
                    <p className="text-muted-foreground text-sm">Cuando usted nos solicita un servicio o información vinculada a nuestra actividad, el tratamiento de sus datos es necesario para dar curso a esa solicitud.</p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Cumplimiento de una obligación legal</h4>
                    <p className="text-muted-foreground text-sm">En ciertos casos, podemos estar obligados por la normativa a conservar o divulgar algunos datos personales.</p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Interés legítimo de la organización</h4>
                    <p className="text-muted-foreground text-sm">En algunos casos limitados, podríamos tratar datos basándonos en nuestro interés legítimo, siempre que dicho interés no vulnere sus derechos y libertades fundamentales.</p>
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground mt-4">
                Cuando el tratamiento de datos se base en su consentimiento, usted tiene el derecho de retirarlo en cualquier momento. Del mismo modo, si en algún caso nos basamos en un interés legítimo, usted puede oponerse a dicho tratamiento.
              </p>
            </div>

            {/* Section 5 */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-bold">5</span>
                Derechos de los usuarios
              </h2>
              <p className="text-muted-foreground mb-4">
                Como usuario y titular de sus datos personales, la ley uruguaya le reconoce una serie de derechos para que usted tenga el control sobre su información. En Integra Residenciales respetamos plenamente estos derechos y facilitamos su ejercicio:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2 text-primary">Derecho de acceso</h3>
                  <p className="text-muted-foreground text-sm">
                    Puede solicitarnos confirmación de si poseemos datos personales suyos y, en tal caso, acceder a ellos. Tiene derecho a saber qué información suya está en nuestras bases de datos, el origen de esos datos y las finalidades del tratamiento.
                  </p>
                </div>
                
                <div className="bg-card border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2 text-primary">Derecho de rectificación</h3>
                  <p className="text-muted-foreground text-sm">
                    Si alguno de sus datos es inexacto, incorrecto o está desactualizado, usted puede solicitarnos que lo corrijamos o actualicemos. Del mismo modo, si algún dato está incompleto, tiene derecho a que lo completemos.
                  </p>
                </div>
                
                <div className="bg-card border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2 text-primary">Derecho de supresión</h3>
                  <p className="text-muted-foreground text-sm">
                    Usted puede solicitarnos la eliminación o borrado de sus datos personales de nuestras bases de datos cuando lo considere pertinente, en la medida que no exista un deber legal de conservar dichos datos.
                  </p>
                </div>
                
                <div className="bg-card border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2 text-primary">Derecho de oposición</h3>
                  <p className="text-muted-foreground text-sm">
                    En circunstancias específicas, usted tiene derecho a oponerse al tratamiento de sus datos personales. Puede revocar su consentimiento en cualquier momento sin consecuencias negativas en nuestra relación.
                  </p>
                </div>
              </div>
              
              <p className="text-muted-foreground mt-4">
                Adicionalmente, usted cuenta con el derecho a presentar una reclamación ante la <strong>Unidad Reguladora y de Control de Datos Personales (URCDP)</strong> si considera que se han vulnerado sus derechos.
              </p>
            </div>

            {/* Section 6 */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-bold">6</span>
                Cómo ejercer sus derechos
              </h2>
              <p className="text-muted-foreground mb-4">
                Ejercer sus derechos es sencillo, gratuito y estaremos encantados de asistirlo en el proceso. Para hacerlo, puede utilizar las siguientes vías de contacto:
              </p>
              
              <div className="bg-card border rounded-lg p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Correo electrónico</h4>
                    <p className="text-muted-foreground text-sm">
                      Envíenos un mensaje a <a href="mailto:hola@integraresidenciales.com.uy" className="text-primary hover:underline">hola@integraresidenciales.com.uy</a> indicando en el asunto qué derecho desea ejercer.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Formulario de contacto</h4>
                    <p className="text-muted-foreground text-sm">
                      Puede escribirnos a través del formulario de contacto en nuestro sitio web, especificando en el mensaje la naturaleza de su solicitud.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Vía postal o presencial</h4>
                    <p className="text-muted-foreground text-sm">
                      Puede enviarnos una nota firmada a nuestra dirección física incluyendo su nombre completo, medio de contacto y descripción de la solicitud.
                    </p>
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground mt-4 text-sm">
                Por razones de seguridad, podríamos necesitar verificar su identidad antes de brindar información o efectuar la acción solicitada. Nos comprometemos a darle una respuesta dentro de los plazos legales establecidos (máximo 5 días hábiles para rectificación o supresión, y 10 días hábiles para solicitudes de acceso). <strong>El ejercicio de sus derechos es gratuito.</strong>
              </p>
            </div>

            {/* Section 7 */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-bold">7</span>
                Seguridad y confidencialidad de los datos
              </h2>
              <p className="text-muted-foreground mb-4">
                La seguridad de sus datos personales es una prioridad para Integra Residenciales. Implementamos medidas técnicas y organizativas apropiadas para proteger la información frente a accesos no autorizados, alteraciones, pérdidas o divulgaciones indebidas. En cumplimiento del principio de seguridad de los datos consagrado en la Ley 18.331, tomamos precauciones acordes con la sensibilidad de los datos en cuestión.
              </p>
              
              <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                <h4 className="font-semibold text-foreground mb-2">Nuestras medidas de seguridad incluyen:</h4>
                <ul className="text-muted-foreground text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Uso de conexiones seguras (protocolo HTTPS)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Firewalls y sistemas de protección frente a intrusiones
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Acceso restringido solo a personal autorizado con compromiso de confidencialidad
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Contratos de confidencialidad con proveedores y terceros
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Aplicación del concepto de "privacidad desde el diseño"
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Procedimientos para detectar, responder y notificar eventuales brechas de seguridad
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 8 */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-bold">8</span>
                Vigencia y modificaciones
              </h2>
              <p className="text-muted-foreground mb-4">
                La presente Política de Privacidad y Uso de Cookies entra en vigencia a partir de su fecha de publicación y será aplicable a todos los usuarios del sitio web de Integra Residenciales.
              </p>
              
              <p className="text-muted-foreground mb-4">
                Integra Residenciales se reserva el derecho de actualizar o modificar el contenido de esta política en cualquier momento. En caso de realizar cambios sustanciales, los mismos serán publicados oportunamente en esta sección de nuestro sitio web. Le sugerimos revisar periódicamente esta política para estar al tanto de cómo protegemos su información.
              </p>
              
              <p className="text-muted-foreground">
                El uso continuado de nuestros servicios o sitio web después de dichas modificaciones implicará la aceptación de la política actualizada, en la medida en que las leyes aplicables así lo permitan.
              </p>
            </div>

            {/* Footer note */}
            <div className="bg-muted/50 rounded-lg p-6 text-center">
              <p className="text-muted-foreground text-sm mb-2">
                En Integra Residenciales valoramos su confianza. Si tiene preguntas adicionales sobre esta Política de Privacidad y Uso de Cookies o sobre cómo manejamos sus datos personales, por favor no dude en contactarnos.
              </p>
              <p className="text-xs text-muted-foreground">
                <strong>Fuente:</strong> Integra Residenciales – Política de Privacidad y Cookies (adaptada al contexto legal uruguayo, Ley 18.331)
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

# Cordelia Landings

Proyecto independiente de landings con Next.js App Router, TypeScript estricto y Tailwind CSS. La landing inicial está en `/cordelia-landings/abc-pensiones-imss`.

## Desarrollo

1. Instala dependencias con `npm install`.
2. Inicia el proyecto con `npm run dev`.
3. Abre `http://localhost:3000/cordelia-landings/abc-pensiones-imss`.

Validaciones: `npm run lint`, `npm run typecheck` y `npm run build`.

## Variables públicas

La configuración actual replica los identificadores públicos de la referencia CEFIN y no requiere variables públicas. No añadas secretos, tokens o datos de CRM/pagos al repositorio. Todas las claves de `sessionStorage` de esta aplicación usan el prefijo `cordelia_`.

## Tracking

La landing `abc-pensiones-imss` carga Meta Pixel y el píxel de leads de VK Digital. Conserva los parámetros `utm_*`, `fbclid`, `campaign_id`, `adset_id`, `ad_id` y `placement` en `sessionStorage`, con la clave `cordelia_traffic`, para atribución de captación y campos de ActiveCampaign. No se carga ni se propaga tracking de Hotmart.

No hay GTM, GA4, `dataLayer` ni lógica de consentimiento en la landing IMSS de referencia; por ello no se incluyen. Los eventos activos son: `PageView` y `ViewContent` al cargar la landing; `PageView` al cargar la página de gracias; `Lead` después de una confirmación real del formulario; y `JoinGroupIntent` al hacer clic en el grupo de WhatsApp. Los CTA de registro gratuitos solo desplazan al formulario y no disparan un evento. La referencia no registra eventos de error del formulario ni clics de teléfono, por lo que tampoco se emiten aquí.

El formulario de registro carga el embed público de ActiveCampaign con ID `396`, completa los campos UTM 7–11 cuando están disponibles y guarda una confirmación de sesión antes del envío. Configura el redirect de éxito de ActiveCampaign hacia `https://www.cordeliacapacitacion.com/cordelia-landings/abc-pensiones-imss/gracias?ac_success=1`. Solo con ese parámetro y una confirmación pendiente se envía el evento estándar `Lead` una sola vez por sesión. El `eventID` es el identificador de confirmación y queda disponible para una futura deduplicación con CAPI. No se guardan ni registran datos personales.

## Assets

Cada landing debe guardar sus recursos en `public/cordelia-landings/<nombre-de-landing>/` y referenciarlos con ruta absoluta, por ejemplo `/cordelia-landings/abc-pensiones-imss/hero.jpg`. Así se resuelven bajo la URL pública esperada sin depender de un `basePath` global.

## Despliegue

Despliega este repositorio como un proyecto independiente de Vercel y define las variables públicas allí. La URL esperada es `https://cefin.mx/cordelia-landings/abc-pensiones-imss`.

El enrutamiento de `cefin.mx` no se configura en este repositorio. Es obligatorio crear externamente un rewrite/proxy que envíe exactamente `cefin.mx/cordelia-landings/:path*` hacia este deployment de Vercel, preservando el path y los query parameters. El equipo que administra el dominio deberá decidir la plataforma y la sintaxis concreta del proxy.

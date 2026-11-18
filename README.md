# Cordelia Landings

Proyecto independiente de landings con Next.js App Router, TypeScript estricto y Tailwind CSS. La landing inicial está en `/cordelia-landings/abc-pensiones-imss`.

## Desarrollo

1. Copia `.env.example` a `.env.local` y agrega únicamente los IDs públicos de píxeles que correspondan al entorno.
2. Instala dependencias con `npm install`.
3. Inicia el proyecto con `npm run dev`.
4. Abre `http://localhost:3000/cordelia-landings/abc-pensiones-imss`.

Validaciones: `npm run lint`, `npm run typecheck` y `npm run build`.

## Variables públicas

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_VK_PIXEL_ID` | ID del píxel VK Digital. |

No añadas secretos, tokens o datos de CRM/pagos al repositorio. Todas las claves de `sessionStorage` de esta aplicación usan el prefijo `cordelia_`; actualmente se conserva la atribución en `cordelia_traffic`.

## Tracking

El layout carga el Meta Pixel global y registra un único `PageView` por URL visitada. El ID público de Meta compartido por las landings de Cordelia se centraliza en `lib/tracking/config.ts`; no requiere variables de Vercel. Se capturan `utm_*`, `fbclid`, `campaign_id`, `adset_id`, `ad_id` y `placement`. `lib/tracking/meta-pixel.ts` envía únicamente eventos estándar `PageView` y `Lead`; `Lead` incluye `eventID` para una futura deduplicación con Conversiones API. Los CTA gratuitos del ABC solo desplazan al formulario; no disparan `InitiateCheckout` ni eventos personalizados.

El formulario de registro carga el embed público de ActiveCampaign con ID `396`. Al enviarlo, prepara un `eventID` de Lead y utiliza correo/teléfono normalizados únicamente para advanced matching del Pixel; estos datos no se almacenan ni se registran en logs. Configura el redirect de éxito de ActiveCampaign hacia `https://www.cordeliacapacitacion.com/cordelia-landings/abc-pensiones-imss/gracias?ac_success=1`. Esa llegada dispara `Lead` una sola vez por sesión: reutiliza el `eventID` pendiente si el navegador lo conserva tras el POST externo y crea uno nuevo si no lo conserva. Recargar la página de gracias no vuelve a dispararlo.

## Assets

Cada landing debe guardar sus recursos en `public/cordelia-landings/<nombre-de-landing>/` y referenciarlos con ruta absoluta, por ejemplo `/cordelia-landings/abc-pensiones-imss/hero.jpg`. Así se resuelven bajo la URL pública esperada sin depender de un `basePath` global.

## Despliegue

Despliega este repositorio como un proyecto independiente de Vercel y define las variables públicas allí. La URL esperada es `https://cefin.mx/cordelia-landings/abc-pensiones-imss`.

El enrutamiento de `cefin.mx` no se configura en este repositorio. Es obligatorio crear externamente un rewrite/proxy que envíe exactamente `cefin.mx/cordelia-landings/:path*` hacia este deployment de Vercel, preservando el path y los query parameters. El equipo que administra el dominio deberá decidir la plataforma y la sintaxis concreta del proxy.

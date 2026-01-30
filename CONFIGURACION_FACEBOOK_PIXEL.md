# 📊 Configuración de Facebook Pixel (Meta Pixel)

## ✅ Estado de Implementación
El código del Facebook Pixel ya está instalado en tu sitio web. Solo necesitas agregar tu ID de Pixel.

## 🔑 Cómo Obtener tu ID de Pixel

### Paso 0: Crear Cuenta de Negocios (Si tienes cuenta personal)

**Si solo tienes una cuenta personal de Facebook, primero debes crear una cuenta de negocios:**

1. Ve a [business.facebook.com/overview](https://business.facebook.com/overview)
2. Haz clic en **"Crear cuenta"**
3. Ingresa:
   - **Nombre de la empresa:** FERREMOLINA (o el nombre de tu negocio)
   - **Tu nombre:** Tu nombre completo
   - **Correo electrónico de trabajo:** Tu email
4. Haz clic en **"Siguiente"** y luego **"Enviar"**
5. Verifica tu correo electrónico
6. ¡Listo! Ya tienes una cuenta Business Manager

**Nota:** No necesitas tener una página de Facebook para usar el Pixel, pero es recomendable crearla después.

### Paso 1: Acceder a Meta Business Suite
1. Ve a [Facebook Business Manager](https://business.facebook.com/)
2. Inicia sesión con tu cuenta de Facebook
3. Selecciona tu cuenta de negocios (la que acabas de crear)

### Paso 2: Crear o Encontrar tu Pixel
1. En el menú lateral, haz clic en **"Configuración de eventos"** o **"Píxeles"**
2. Si no tienes un pixel:
   - Haz clic en **"Crear pixel"**
   - Dale un nombre (por ejemplo: "FERREMOLINA - Taladro TOTAL")
   - Selecciona **"Instalación manual"**
3. Si ya tienes un pixel:
   - Copia el **ID del Pixel** (número de 15-16 dígitos)

### Paso 3: Copiar tu ID de Pixel
Tu ID de Pixel se ve así: `123456789012345`

## 🔧 Configuración en tu Sitio Web

### Reemplazar el ID en los Archivos

Debes reemplazar `YOUR_PIXEL_ID` con tu ID real en **2 archivos**:

#### 1. **index.html** (Línea ~88)
```javascript
fbq('init', 'YOUR_PIXEL_ID'); // ⬅️ Reemplazar aquí
```

Cambiar a:
```javascript
fbq('init', '123456789012345'); // Tu ID real
```

También en la etiqueta noscript (línea siguiente):
```html
src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
```

Cambiar a:
```html
src="https://www.facebook.com/tr?id=123456789012345&ev=PageView&noscript=1"
```

#### 2. **gracias.html** (Línea ~20)
Hacer el mismo cambio en ambos lugares:
```javascript
fbq('init', '123456789012345'); // Tu ID real
```

## 📍 Eventos Configurados

Tu sitio ya está rastreando estos eventos importantes:

### 1. **PageView** (Automático)
- Se dispara cuando alguien visita tu sitio
- Ubicación: `index.html`, `gracias.html`

### 2. **ViewContent**
- Se dispara cuando un usuario llega a la sección de precios
- Ubicación: `js/main.js` (línea ~165)
- Valor: $390,000 COP

### 3. **AddToCart**
- Se dispara cuando hacen clic en "Comprar Ahora"
- Ubicación: `js/main.js` (línea ~115)
- Valor: $390,000 COP

### 4. **InitiateCheckout**
- Se dispara cuando se abre el modal de compra
- Ubicación: `js/main.js` (función `openModal`)
- Valor: Precio del producto

### 5. **Contact**
- Se dispara cuando hacen clic en WhatsApp o teléfono
- Ubicación: `js/main.js` (línea ~128, ~145)

### 6. **Purchase** (Conversión)
- Se dispara en la página de agradecimiento
- Ubicación: `gracias.html` (línea ~285)
- Incluye: transaction_id, valor total, cantidad
- ✨ **Este es el evento más importante para medir ROI**

## 🧪 Verificar que Funciona

### Método 1: Meta Pixel Helper (Chrome Extension)
1. Instala [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
2. Visita tu sitio web
3. Haz clic en el icono de la extensión
4. Deberías ver tu Pixel activo y los eventos disparándose

### Método 2: Events Manager en Facebook
1. Ve a [Events Manager](https://business.facebook.com/events_manager2)
2. Selecciona tu Pixel
3. Haz clic en **"Prueba de eventos"**
4. Ingresa la URL de tu sitio: `https://ferremolina.github.io/Taladro-Total20V/`
5. Navega por tu sitio y verás los eventos en tiempo real

### Método 3: Consola del Navegador
1. Abre tu sitio web
2. Presiona `F12` para abrir DevTools
3. Ve a la pestaña **Console**
4. Deberías ver mensajes como: `FB Event: ViewContent {...}`

## 📈 Usar los Datos para Publicidad

Una vez configurado, podrás:

### 1. **Crear Audiencias Personalizadas**
- Personas que visitaron tu sitio
- Personas que vieron el producto pero no compraron
- Personas que agregaron al carrito pero no compraron

### 2. **Optimizar Campañas**
- Optimizar para evento "Purchase"
- Crear campañas de remarketing
- Medir el ROI real de tus anuncios

### 3. **Crear Audiencias Similares (Lookalike)**
- Facebook encontrará personas similares a tus compradores
- Aumenta la efectividad de tus campañas

## 🚀 Siguiente Paso

**Reemplaza `YOUR_PIXEL_ID` con tu ID real en:**
- ✅ `index.html` (2 lugares)
- ✅ `gracias.html` (2 lugares)

**Luego verifica con Meta Pixel Helper que todo funcione correctamente.**

## � Validar tu Dominio en Facebook

**Para validar el dominio también necesitas el Business Manager que acabas de crear.** Es gratis y lo puedes hacer desde tu cuenta personal.

### Método 1: Meta Tag (Recomendado para GitHub Pages)

#### Paso 1: Obtener el Meta Tag
1. Ve a [Business Manager](https://business.facebook.com/)
2. Inicia sesión con tu cuenta personal de Facebook
3. Arriba a la izquierda, click en el nombre de tu empresa (FERREMOLINA)
4. Click en **"Configuración de la empresa"** (ícono de engranaje ⚙️)
5. En el menú lateral izquierdo, busca **"Seguridad de la marca"**
6. Click en **"Dominios"**
7. Click en **"Agregar"** (botón azul)
8. Ingresa tu dominio: `ferremolina.github.io` (sin https:// ni www)
9. Selecciona el método: **"Agregar metaetiqueta a HTML"**
10. Copia el código completo que aparece:
   ```html
   <meta name="facebook-domain-verification" content="abc123xyz456..." />
   ```

**Nota:** Si no ves "Seguridad de la marca", es porque tu cuenta es nueva. Espera 24 horas o simplemente usa el Pixel sin validar el dominio. El Pixel funcionará igual, solo que con algunas limitaciones menores.

#### Paso 2: Agregar el Meta Tag a tu Sitio
1. Abre tu archivo `index.html`
2. Pega el meta tag en el `<head>`, después de las otras meta etiquetas
3. Guarda el archivo
4. Sube los cambios a GitHub:
   ```bash
   git add index.html
   git commit -m "Agregar verificación de dominio Facebook"
   git push
   ```

#### Paso 3: Verificar
1. Espera 1-2 minutos que GitHub Pages actualice
2. Vuelve a Facebook Business Manager
3. Click en **"Verificar"**
4. Si todo está bien, verás un ✅ verde

### Método 2: DNS (Si tienes dominio propio)

Si usas un dominio personalizado (ej: `www.ferremolina.com`):

1. En Facebook, selecciona el método **"Actualizar DNS"**
2. Copia el registro TXT que te dan
3. Ve a tu proveedor de dominio (GoDaddy, Namecheap, etc.)
4. Agrega un nuevo registro TXT:
   - **Tipo:** TXT
   - **Nombre:** @ o tu dominio
   - **Valor:** El código que te dio Facebook
5. Espera 24-72 horas para que propague
6. Vuelve a Facebook y haz clic en **"Verificar"**

### ✅ Beneficios de Validar el Dominio

Una vez validado, tendrás acceso a:
- **Editar eventos del pixel** sin restricciones
- **Prioridad en atribución** cuando el mismo evento viene de múltiples fuentes
- **Conversions API** para tracking más preciso
- **Mejor protección** contra el uso no autorizado de tu dominio
- **iOS 14+ tracking** mejorado

### 🔍 Verificar que Funciona

Después de validar:
1. Ve a **Configuración de la empresa → Seguridad de la marca → Dominios**
2. Deberías ver tu dominio con estado: **✅ Verificado**

## 📞 Soporte

Si necesitas ayuda con la configuración:
- [Centro de Ayuda de Meta Business](https://www.facebook.com/business/help)
- [Documentación del Pixel](https://developers.facebook.com/docs/meta-pixel)
- [Validación de Dominio](https://www.facebook.com/business/help/286768115176155)

---

**⚠️ Importante:** El Pixel solo funcionará cuando tu sitio esté publicado en internet (GitHub Pages). No funcionará correctamente en `localhost` o `file://`.

# HidroTec - Sitio Web y Encuesta de Market Research

## 📋 Descripción

Proyecto frontend completo para HidroTec, negocio de mantenimiento de computadoras en Aguascalientes. Incluye:

1. **Landing page** completa del negocio con información de servicios, planes y contacto
2. **Encuesta de market research** con análisis en tiempo real y exportación de datos
3. **Anuncio de apertura** exportable como imagen

## 🚀 Características Principales

### Landing Page
- Hero section con promoción de apertura
- Información de la empresa (misión, visión, valores)
- Catálogo de servicios
- Planes de suscripción con precios
- Sección de beneficios
- Testimonios de clientes
- FAQ con acordeón
- Formulario de contacto
- Mapa de ubicación
- SEO optimizado

### Encuesta de Market Research
- 10 preguntas de selección única
- Validación en tiempo real
- Persistencia en localStorage
- Conteo en vivo de respuestas
- Gráficas interactivas (barras y dona) con Chart.js
- Exportación de resultados a CSV
- Botón para compartir encuesta
- Panel de métricas con widgets arrastrables (GridStack)

### Anuncio de Apertura
- Diseño profesional con información clave
- Exportable como imagen PNG con html2canvas
- Información de promoción y contacto

### Características Técnicas
- **100% Frontend** - No requiere backend
- **Responsive** - Se adapta a todos los dispositivos
- **Accesible** - WCAG 2.1 compliant
- **Modo Oscuro** - Toggle con persistencia
- **Animaciones** - anime.js y mo.js
- **Progressive Web App** ready

## 🛠️ Stack Tecnológico

### Librerías (todas vía CDN)
- **Bootstrap 5** - Framework CSS
- **Tailwind CSS** - Utilidades CSS
- **Chart.js** - Gráficas y visualización de datos
- **GridStack.js** - Panel de widgets arrastrables
- **anime.js** - Animaciones suaves
- **mo.js** - Microanimaciones y efectos
- **html2canvas** - Exportación de HTML a imagen

### Arquitectura
- HTML5 semántico
- CSS3 con variables y modo oscuro
- JavaScript vanilla (ES6+)
- LocalStorage para persistencia

## 📁 Estructura de Archivos

```
HidroTec/
│
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos personalizados y tema
├── app.js              # Lógica de la aplicación
├── manifest.json       # Manifest para PWA
├── robots.txt          # Configuración para SEO
└── README.md           # Este archivo
```

## 🎯 Cómo Usar

### Instalación
1. **No requiere instalación** - Solo abre `index.html` en tu navegador
2. Para desarrollo local con live server:
   ```bash
   # Con VS Code Live Server, Python, o cualquier servidor HTTP
   python -m http.server 8000
   ```
   Luego abre http://localhost:8000

### Uso de la Encuesta

1. **Responder encuesta**: Ve a la sección "Encuesta" y completa todas las preguntas
2. **Ver resultados**: Los gráficos se actualizan automáticamente después de cada respuesta
3. **Exportar datos**: Haz clic en "Exportar Resultados (CSV)" para descargar un archivo CSV
4. **Compartir**: Usa el botón "Copiar Link de Encuesta" para compartir con otros

### Panel de Métricas

El panel muestra 4 widgets principales:
- **% Interés en Suscripción** (basado en pregunta 5)
- **Preferencia de Servicio** (domicilio vs remoto, pregunta 8)
- **Importancia de Respaldo** (pregunta 9)
- **Tiempo de Respuesta Esperado** (pregunta 7)

Los widgets son **arrastrables** - puedes reorganizarlos según tu preferencia.

### Descargar Anuncio

1. Ve a la sección del anuncio
2. Haz clic en "Descargar Anuncio como Imagen"
3. Se generará un PNG que puedes usar en redes sociales o WhatsApp

## ⚙️ Configuración

### Modificar Planes

Edita la constante `PLANES` en `app.js`:

```javascript
const PLANES = [
    {
        id: 'basico',
        nombre: 'Plan Básico',
        precio: 200,
        precioPromo: 199,
        // ... más propiedades
    }
    // ... más planes
];
```

### Modificar Preguntas de la Encuesta

Edita la constante `ENCUESTA_DATA` en `app.js`:

```javascript
const ENCUESTA_DATA = {
    preguntas: [
        {
            id: 'q1',
            texto: '¿Tu pregunta aquí?',
            tipo: 'radio',
            opciones: [
                { valor: 'opcion1', texto: 'Opción 1' },
                // ... más opciones
            ]
        }
        // ... más preguntas
    ]
};
```

### Cambiar Colores (Modo Claro/Oscuro)

Edita las variables CSS en `styles.css`:

```css
:root {
    --primary-color: #0066cc;
    --secondary-color: #00b4d8;
    /* ... más colores */
}
```

## 📊 Datos y Persistencia

Todos los datos se almacenan en **localStorage** del navegador:

- `encuestaResponses`: Array de respuestas de la encuesta
- `contactSubmissions`: Formularios de contacto enviados
- `darkMode`: Preferencia de modo oscuro (true/false)

### Limpiar Datos

Para limpiar todos los datos almacenados, abre la consola del navegador y ejecuta:

```javascript
localStorage.clear();
location.reload();
```

## 🎨 Personalización de Estilos

### Modo Oscuro

El modo oscuro se activa automáticamente mediante la clase `.dark-mode` en el `<body>`. Los colores se ajustan usando variables CSS.

### Animaciones

Las animaciones se activan al hacer scroll y son configurables en `app.js` en el objeto `Animations`.

## 📱 Responsive Design

El sitio es completamente responsive con breakpoints:
- **Desktop**: > 992px
- **Tablet**: 768px - 991px
- **Mobile**: < 767px

## ♿ Accesibilidad

Características de accesibilidad implementadas:
- Labels en todos los inputs
- Atributos `aria-*` apropiados
- Contraste WCAG 2.1 AA
- Skip link para navegación por teclado
- Focus visible en todos los elementos interactivos

## 🔧 Próximas Mejoras (TODO)

### Backend
- [ ] Conectar formulario de contacto a un backend real
- [ ] API para almacenar respuestas de encuesta en base de datos
- [ ] Sistema de autenticación para administrador

### Funcionalidades
- [ ] Sistema de blog para noticias y tips
- [ ] Chat en vivo o chatbot
- [ ] Sistema de agendamiento de citas online
- [ ] Portal de clientes con historial de servicios

## 📞 Contacto

**HidroTec**
- 📧 Email: contacto@hidrotec.com
- 📱 WhatsApp: +52 449 123 4567
- 📍 Ubicación: Aguascalientes, Ags. (Zonas UPA/UAA)
- 🌐 Web: www.hidrotec.com

## 📄 Licencia

© 2025 HidroTec. Todos los derechos reservados.

---

**Desarrollado con ❤️ para HidroTec**

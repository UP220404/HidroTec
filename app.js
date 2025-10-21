// ========================================
// HidroTec - JavaScript Application
// ========================================

// === CONSTANTES Y CONFIGURACIÓN ===

// Planes de servicio
const PLANES = [
    {
        id: 'basico',
        nombre: 'Plan Básico',
        precio: 200,
        precioPromo: 199,
        periodo: 'mes',
        popular: false,
        caracteristicas: [
            'Mantenimiento preventivo mensual',
            'Soporte remoto básico',
            '1 optimización de rendimiento al mes',
            'Actualizaciones de software',
            'Análisis antivirus completo',
            'Reporte digital del equipo'
        ],
        target: 'Ideal para estudiantes y usuarios individuales'
    },
    {
        id: 'negocios',
        nombre: 'Plan Negocios/SME',
        precio: 1500,
        precioPromo: null,
        periodo: 'mes',
        popular: true,
        caracteristicas: [
            'Todo del Plan Básico',
            'Visitas programadas a domicilio',
            'Respuesta prioritaria (2 horas)',
            'Respaldo programado automático',
            'Gestión de múltiples equipos',
            'Equipo de reemplazo temporal',
            'SLA garantizado',
            'Soporte 24/7 ilimitado'
        ],
        target: 'Ideal para PyMEs y profesionales'
    },
    {
        id: 'unico',
        nombre: 'Servicio Único',
        precio: 500,
        precioPromo: 400,
        periodo: 'servicio',
        popular: false,
        caracteristicas: [
            'Reparación puntual de fallas',
            'Diagnóstico completo incluido',
            'Sin compromiso mensual',
            'Garantía de 30 días',
            'Reporte detallado',
            'Descuento en servicios adicionales'
        ],
        target: 'Ideal para reparaciones ocasionales'
    }
];

// Preguntas de la encuesta (JSON embebido)
const ENCUESTA_DATA = {
    preguntas: [
        {
            id: 'q1',
            texto: '¿Con qué frecuencia tienes problemas con tu computadora?',
            tipo: 'radio',
            opciones: [
                { valor: 'rara_vez', texto: 'Rara vez' },
                { valor: 'ocasionalmente', texto: 'Ocasionalmente' },
                { valor: 'frecuentemente', texto: 'Frecuentemente' },
                { valor: 'muy_frecuentemente', texto: 'Muy frecuentemente' }
            ]
        },
        {
            id: 'q2',
            texto: '¿Qué tipo de equipo usas más?',
            tipo: 'radio',
            opciones: [
                { valor: 'laptop', texto: 'Laptop' },
                { valor: 'pc_escritorio', texto: 'PC de escritorio' },
                { valor: 'ambos', texto: 'Ambos' }
            ]
        },
        {
            id: 'q3',
            texto: '¿Qué tan importante es el mantenimiento preventivo para ti?',
            tipo: 'radio',
            opciones: [
                { valor: 'nada', texto: 'Nada' },
                { valor: 'poco', texto: 'Poco' },
                { valor: 'importante', texto: 'Importante' },
                { valor: 'muy_importante', texto: 'Muy importante' }
            ]
        },
        {
            id: 'q4',
            texto: 'Cuando falla tu computadora, ¿qué sueles hacer?',
            tipo: 'radio',
            opciones: [
                { valor: 'arreglar_yo', texto: 'Intento arreglarla yo mismo' },
                { valor: 'tecnico', texto: 'Llamo a un técnico' },
                { valor: 'centro', texto: 'La llevo a un centro de reparación' },
                { valor: 'reemplazo', texto: 'La reemplazo' }
            ]
        },
        {
            id: 'q5',
            texto: '¿Te interesaría un plan por suscripción de mantenimiento?',
            tipo: 'radio',
            opciones: [
                { valor: 'si', texto: 'Sí' },
                { valor: 'no', texto: 'No' },
                { valor: 'tal_vez', texto: 'Tal vez' }
            ]
        },
        {
            id: 'q6',
            texto: '¿Qué precio mensual te parece razonable?',
            tipo: 'radio',
            opciones: [
                { valor: '100-300', texto: '$100–$300 MXN' },
                { valor: '300-700', texto: '$300–$700 MXN' },
                { valor: '700-1000', texto: '$700–$1,000 MXN' },
                { valor: 'mas_1000', texto: 'Más de $1,000 MXN' }
            ]
        },
        {
            id: 'q7',
            texto: '¿Qué tan rápido esperas soporte tras reportar un problema?',
            tipo: 'radio',
            opciones: [
                { valor: 'horas', texto: 'En pocas horas' },
                { valor: '1_dia', texto: 'En 1 día' },
                { valor: '2-3_dias', texto: 'En 2–3 días' },
                { valor: 'mas_3_dias', texto: 'Más de 3 días' }
            ]
        },
        {
            id: 'q8',
            texto: '¿Prefieres servicio a domicilio o remoto?',
            tipo: 'radio',
            opciones: [
                { valor: 'domicilio', texto: 'A domicilio' },
                { valor: 'remoto', texto: 'Remoto' },
                { valor: 'ambos', texto: 'Ambos' }
            ]
        },
        {
            id: 'q9',
            texto: '¿Qué tan importante es el respaldo y recuperación de datos para ti?',
            tipo: 'radio',
            opciones: [
                { valor: 'nada', texto: 'Nada' },
                { valor: 'poco', texto: 'Poco' },
                { valor: 'importante', texto: 'Importante' },
                { valor: 'muy_importante', texto: 'Muy importante' }
            ]
        },
        {
            id: 'q10',
            texto: '¿Qué te haría cambiarte a HidroTec?',
            tipo: 'radio',
            opciones: [
                { valor: 'precio', texto: 'Mejor precio' },
                { valor: 'rapidez', texto: 'Mayor rapidez' },
                { valor: 'atencion', texto: 'Atención personalizada' },
                { valor: 'tecnologia', texto: 'Tecnología innovadora' }
            ]
        }
    ]
};

// === UTILIDADES GENERALES ===

const Utils = {
    // LocalStorage helpers
    saveToStorage: (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Error guardando en localStorage:', e);
            return false;
        }
    },

    loadFromStorage: (key, defaultValue = null) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) {
            console.error('Error cargando de localStorage:', e);
            return defaultValue;
        }
    },

    // Formateo de números
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 0
        }).format(amount);
    },

    // Validación de email
    isValidEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // Validación de teléfono (10 dígitos)
    isValidPhone: (phone) => {
        const re = /^[0-9]{10}$/;
        return re.test(phone.replace(/\s/g, ''));
    },

    // Exportar a CSV
    exportToCSV: (data, filename) => {
        if (!data || data.length === 0) {
            alert('No hay datos para exportar');
            return;
        }

        const headers = Object.keys(data[0]);
        const csvContent = [
            headers.join(','),
            ...data.map(row => headers.map(header => {
                const value = row[header] || '';
                return `"${value}"`;
            }).join(','))
        ].join('\n');

        const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },

    // Copiar al portapapeles
    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // Fallback para navegadores antiguos
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                document.body.removeChild(textArea);
                return true;
            } catch (err) {
                document.body.removeChild(textArea);
                return false;
            }
        }
    },

    // Scroll suave a elemento
    scrollToElement: (elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
            const offsetTop = element.offsetTop - 80; // Offset para navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
};

// === MODO OSCURO ===

const DarkMode = {
    init: () => {
        const darkModeToggle = document.getElementById('darkModeToggle');
        const isDarkMode = Utils.loadFromStorage('darkMode', false);

        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            DarkMode.updateIcon(true);
        }

        darkModeToggle?.addEventListener('click', DarkMode.toggle);
    },

    toggle: () => {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        Utils.saveToStorage('darkMode', isDarkMode);
        DarkMode.updateIcon(isDarkMode);

        // Animación del botón
        anime({
            targets: '#darkModeToggle',
            rotate: 360,
            duration: 500,
            easing: 'easeInOutQuad'
        });
    },

    updateIcon: (isDark) => {
        const icon = document.querySelector('.dark-mode-icon');
        if (icon) {
            icon.textContent = isDark ? '☀️' : '🌙';
        }
    }
};

// === ANIMACIONES ===

const Animations = {
    init: () => {
        Animations.heroEntrance();
        Animations.setupScrollAnimations();
        Animations.setupButtonEffects();
    },

    heroEntrance: () => {
        anime({
            targets: '.hero-content',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 1000,
            easing: 'easeOutQuad',
            delay: 300
        });
    },

    setupScrollAnimations: () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;

                    // Animaciones sutiles que funcionan con elementos ya visibles
                    if (element.classList.contains('section-header')) {
                        anime({
                            targets: element,
                            translateY: [-10, 0],
                            duration: 600,
                            easing: 'easeOutQuad'
                        });
                    } else if (element.classList.contains('info-card') ||
                               element.classList.contains('service-card') ||
                               element.classList.contains('testimonial-card')) {
                        anime({
                            targets: element,
                            translateY: [-10, 0],
                            duration: 600,
                            easing: 'easeOutQuad',
                            delay: anime.stagger(100)
                        });
                    } else if (element.classList.contains('benefit-item')) {
                        anime({
                            targets: element,
                            translateX: [-10, 0],
                            duration: 600,
                            easing: 'easeOutQuad',
                            delay: anime.stagger(100)
                        });
                    } else if (element.classList.contains('plan-card')) {
                        anime({
                            targets: element,
                            scale: [0.98, 1],
                            duration: 600,
                            easing: 'easeOutQuad',
                            delay: anime.stagger(150)
                        });
                    } else if (element.classList.contains('survey-question')) {
                        // Animación sutil para las preguntas
                        anime({
                            targets: element,
                            translateX: [-10, 0],
                            duration: 400,
                            easing: 'easeOutQuad',
                            delay: anime.stagger(50)
                        });
                    }

                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        // Observar elementos
        document.querySelectorAll('.section-header, .info-card, .service-card, .testimonial-card, .benefit-item, .plan-card, .survey-question')
            .forEach(el => observer.observe(el));
    },

    setupButtonEffects: () => {
        // Efectos mo.js en botones CTA
        document.querySelectorAll('.cta-button').forEach(button => {
            const burst = new mojs.Burst({
                parent: button,
                radius: { 0: 60 },
                count: 8,
                children: {
                    shape: 'circle',
                    fill: ['#0066cc', '#00b4d8', '#06d6a0'],
                    radius: 5,
                    duration: 1000,
                    easing: 'cubic.out'
                }
            });

            button.addEventListener('click', (e) => {
                burst.tune({ x: e.offsetX, y: e.offsetY }).replay();
            });
        });
    },

    confetti: () => {
        // Confeti al enviar encuesta
        const burst = new mojs.Burst({
            radius: { 0: 200 },
            count: 20,
            children: {
                shape: 'circle',
                fill: ['#0066cc', '#00b4d8', '#06d6a0', '#ffd166'],
                radius: { 10: 0 },
                duration: 2000,
                easing: 'cubic.out'
            }
        });

        burst.play();
    }
};

// === PLANES ===

const PlanesModule = {
    init: () => {
        PlanesModule.render();
    },

    render: () => {
        const container = document.getElementById('planesContainer');
        if (!container) return;

        container.innerHTML = PLANES.map(plan => `
            <div class="col-md-6 col-lg-4">
                <div class="card h-100 border-0 shadow-lg plan-card ${plan.popular ? 'popular' : ''}">
                    ${plan.popular ? '<div class="plan-badge">Más Popular</div>' : ''}
                    <div class="card-body p-4">
                        <h3 class="h4 fw-bold mb-3 text-center">${plan.nombre}</h3>
                        <div class="text-center mb-4">
                            <div class="plan-price">
                                ${Utils.formatCurrency(plan.precioPromo || plan.precio)}
                                ${plan.precioPromo ? `<div class="text-decoration-line-through text-muted" style="font-size: 1.2rem;">${Utils.formatCurrency(plan.precio)}</div>` : ''}
                                <small>/ ${plan.periodo}</small>
                            </div>
                            <p class="text-muted mt-2">${plan.target}</p>
                        </div>
                        <ul class="plan-features mb-4">
                            ${plan.caracteristicas.map(feat => `<li>${feat}</li>`).join('')}
                        </ul>
                        <a href="#contacto" class="btn btn-primary w-100">
                            Contratar Ahora
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    }
};

// === ENCUESTA ===

const EncuestaModule = {
    responses: [],

    init: () => {
        EncuestaModule.loadResponses();
        EncuestaModule.renderQuestions();
        EncuestaModule.setupFormHandlers();
        EncuestaModule.updateCharts();
        EncuestaModule.updateTotalResponses();
    },

    loadResponses: () => {
        EncuestaModule.responses = Utils.loadFromStorage('encuestaResponses', []);
    },

    saveResponses: () => {
        Utils.saveToStorage('encuestaResponses', EncuestaModule.responses);
    },

    renderQuestions: () => {
        const container = document.getElementById('surveyQuestions');
        if (!container) return;

        container.innerHTML = ENCUESTA_DATA.preguntas.map((pregunta, index) => `
            <div class="survey-question" data-question-id="${pregunta.id}">
                <label class="form-label">
                    ${index + 1}. ${pregunta.texto}
                    <span class="text-danger">*</span>
                </label>
                <div class="options-container">
                    ${pregunta.opciones.map((opcion, optIndex) => `
                        <div class="form-check">
                            <input
                                class="form-check-input"
                                type="${pregunta.tipo}"
                                name="${pregunta.id}"
                                id="${pregunta.id}_${optIndex}"
                                value="${opcion.valor}"
                                required
                                aria-required="true"
                            >
                            <label class="form-check-label" for="${pregunta.id}_${optIndex}">
                                ${opcion.texto}
                            </label>
                        </div>
                    `).join('')}
                </div>
                <div class="invalid-feedback">
                    Por favor selecciona una opción.
                </div>
            </div>
        `).join('');
    },

    setupFormHandlers: () => {
        const form = document.getElementById('surveyForm');

        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (form.checkValidity() === false) {
                form.classList.add('was-validated');
                return;
            }

            EncuestaModule.submitSurvey(form);
        });

        // Compartir encuesta
        document.getElementById('shareEncuestaBtn')?.addEventListener('click', async () => {
            const url = window.location.href.split('#')[0] + '#encuesta';
            const success = await Utils.copyToClipboard(url);

            if (success) {
                const btn = document.getElementById('shareEncuestaBtn');
                const originalText = btn.textContent;
                btn.textContent = '✓ Link copiado!';
                btn.classList.add('btn-success');
                btn.classList.remove('btn-outline-secondary');

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.classList.remove('btn-success');
                    btn.classList.add('btn-outline-secondary');
                }, 2000);
            } else {
                alert('No se pudo copiar el link. Por favor cópialo manualmente.');
            }
        });

        // Exportar resultados
        document.getElementById('exportResultsBtn')?.addEventListener('click', () => {
            EncuestaModule.exportResults();
        });
    },

    submitSurvey: (form) => {
        const formData = new FormData(form);
        const response = {
            timestamp: new Date().toISOString(),
            answers: {}
        };

        ENCUESTA_DATA.preguntas.forEach(pregunta => {
            response.answers[pregunta.id] = formData.get(pregunta.id);
        });

        EncuestaModule.responses.push(response);
        EncuestaModule.saveResponses();

        // Mostrar mensaje de éxito
        form.classList.add('d-none');
        document.getElementById('surveySuccess').classList.remove('d-none');

        // Animación de confeti
        Animations.confetti();

        // Actualizar gráficas y métricas
        EncuestaModule.updateCharts();
        EncuestaModule.updateTotalResponses();
        MetricsPanel.update();

        // Scroll al mensaje de éxito
        setTimeout(() => {
            document.getElementById('surveySuccess').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 300);
    },

    updateTotalResponses: () => {
        const totalEl = document.getElementById('totalResponses');
        if (totalEl) {
            totalEl.textContent = EncuestaModule.responses.length;
        }
    },

    updateCharts: () => {
        const container = document.getElementById('chartsContainer');
        if (!container) return;

        // Seleccionar preguntas clave para graficar
        const questionsToChart = ['q1', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'];

        container.innerHTML = questionsToChart.map(qId => {
            const pregunta = ENCUESTA_DATA.preguntas.find(p => p.id === qId);
            if (!pregunta) return '';

            return `
                <div class="col-md-6">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body">
                            <h5 class="card-title h6 mb-3">${pregunta.texto}</h5>
                            <div class="chart-container">
                                <canvas id="chart_${qId}"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Generar gráficas
        questionsToChart.forEach(qId => {
            EncuestaModule.createChart(qId);
        });
    },

    createChart: (questionId) => {
        const canvas = document.getElementById(`chart_${questionId}`);
        if (!canvas) return;

        const pregunta = ENCUESTA_DATA.preguntas.find(p => p.id === questionId);
        if (!pregunta) return;

        // Contar respuestas
        const counts = {};
        pregunta.opciones.forEach(opt => counts[opt.valor] = 0);

        EncuestaModule.responses.forEach(response => {
            const answer = response.answers[questionId];
            if (answer && counts.hasOwnProperty(answer)) {
                counts[answer]++;
            }
        });

        const labels = pregunta.opciones.map(opt => opt.texto);
        const data = pregunta.opciones.map(opt => counts[opt.valor]);

        // Determinar tipo de gráfica
        const chartType = ['q5', 'q8'].includes(questionId) ? 'doughnut' : 'bar';

        const colors = [
            'rgba(0, 102, 204, 0.8)',
            'rgba(0, 180, 216, 0.8)',
            'rgba(6, 214, 160, 0.8)',
            'rgba(255, 209, 102, 0.8)',
            'rgba(239, 71, 111, 0.8)'
        ];

        new Chart(canvas, {
            type: chartType,
            data: {
                labels: labels,
                datasets: [{
                    label: 'Respuestas',
                    data: data,
                    backgroundColor: colors,
                    borderColor: colors.map(c => c.replace('0.8', '1')),
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: chartType === 'doughnut',
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = total > 0 ? ((context.parsed / total) * 100).toFixed(1) : 0;
                                return `${context.label}: ${context.parsed} (${percentage}%)`;
                            }
                        }
                    }
                },
                scales: chartType === 'bar' ? {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                } : {}
            }
        });
    },

    exportResults: () => {
        if (EncuestaModule.responses.length === 0) {
            alert('No hay respuestas para exportar.');
            return;
        }

        const csvData = EncuestaModule.responses.map((response, index) => {
            const row = {
                'Respuesta #': index + 1,
                'Fecha': new Date(response.timestamp).toLocaleString('es-MX')
            };

            ENCUESTA_DATA.preguntas.forEach(pregunta => {
                const valor = response.answers[pregunta.id];
                const opcion = pregunta.opciones.find(opt => opt.valor === valor);
                row[pregunta.texto] = opcion ? opcion.texto : valor;
            });

            return row;
        });

        const timestamp = new Date().toISOString().split('T')[0];
        Utils.exportToCSV(csvData, `hidrotec_encuesta_${timestamp}.csv`);

        // Feedback visual
        const btn = document.getElementById('exportResultsBtn');
        const originalText = btn.textContent;
        btn.textContent = '✓ Exportado!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    }
};

// === PANEL DE MÉTRICAS (GridStack) ===

const MetricsPanel = {
    grid: null,

    init: () => {
        const container = document.getElementById('metricsPanel');
        if (!container) return;

        // Inicializar GridStack
        MetricsPanel.grid = GridStack.init({
            cellHeight: 120,
            margin: 15,
            float: true,
            animate: true,
            resizable: false, // Desactivado para mantener tamaños consistentes
            draggable: true   // Solo permite arrastrar, no redimensionar
        }, '#metricsPanel');

        MetricsPanel.createWidgets();
        MetricsPanel.update();
    },

    createWidgets: () => {
        const widgets = [
            {
                x: 0, y: 0, w: 3, h: 2,
                id: 'widget-interest',
                title: '¿Interés en Suscripción?',
                getValue: () => MetricsPanel.calculateInterest()
            },
            {
                x: 3, y: 0, w: 3, h: 2,
                id: 'widget-service-pref',
                title: 'Preferencia de Servicio',
                getValue: () => MetricsPanel.calculateServicePreference()
            },
            {
                x: 6, y: 0, w: 3, h: 2,
                id: 'widget-backup-importance',
                title: 'Importancia de Respaldo',
                getValue: () => MetricsPanel.calculateBackupImportance()
            },
            {
                x: 9, y: 0, w: 3, h: 2,
                id: 'widget-response-time',
                title: 'Tiempo de Respuesta Esperado',
                getValue: () => MetricsPanel.calculateResponseTime()
            }
        ];

        widgets.forEach(widget => {
            MetricsPanel.grid.addWidget({
                x: widget.x,
                y: widget.y,
                w: widget.w,
                h: widget.h,
                content: `
                    <div class="widget-content">
                        <div class="widget-header">${widget.title}</div>
                        <div class="widget-value" id="${widget.id}-value">-</div>
                        <div class="widget-label" id="${widget.id}-label">Cargando...</div>
                    </div>
                `
            });
        });
    },

    update: () => {
        // Widget 1: Interés en suscripción (q5)
        const interest = MetricsPanel.calculateInterest();
        document.getElementById('widget-interest-value').textContent = interest.percentage;
        document.getElementById('widget-interest-label').textContent = interest.label;

        // Widget 2: Preferencia de servicio (q8)
        const servicePref = MetricsPanel.calculateServicePreference();
        document.getElementById('widget-service-pref-value').textContent = servicePref.percentage;
        document.getElementById('widget-service-pref-label').textContent = servicePref.label;

        // Widget 3: Importancia de respaldo (q9)
        const backupImp = MetricsPanel.calculateBackupImportance();
        document.getElementById('widget-backup-importance-value').textContent = backupImp.percentage;
        document.getElementById('widget-backup-importance-label').textContent = backupImp.label;

        // Widget 4: Tiempo de respuesta esperado (q7)
        const responseTime = MetricsPanel.calculateResponseTime();
        document.getElementById('widget-response-time-value').textContent = responseTime.percentage;
        document.getElementById('widget-response-time-label').textContent = responseTime.label;
    },

    calculateInterest: () => {
        const responses = EncuestaModule.responses;
        if (responses.length === 0) return { percentage: '0%', label: 'Sin datos' };

        const interested = responses.filter(r =>
            r.answers.q5 === 'si' || r.answers.q5 === 'tal_vez'
        ).length;

        const percentage = ((interested / responses.length) * 100).toFixed(1);
        return {
            percentage: `${percentage}%`,
            label: `${interested} de ${responses.length} interesados`
        };
    },

    calculateServicePreference: () => {
        const responses = EncuestaModule.responses;
        if (responses.length === 0) return { percentage: '-', label: 'Sin datos' };

        const counts = {
            domicilio: 0,
            remoto: 0,
            ambos: 0
        };

        responses.forEach(r => {
            if (counts.hasOwnProperty(r.answers.q8)) {
                counts[r.answers.q8]++;
            }
        });

        const max = Math.max(...Object.values(counts));
        const preferred = Object.keys(counts).find(key => counts[key] === max);

        const labels = {
            domicilio: 'A domicilio',
            remoto: 'Remoto',
            ambos: 'Ambos'
        };

        return {
            percentage: labels[preferred] || '-',
            label: `${counts[preferred]} de ${responses.length} prefieren esto`
        };
    },

    calculateBackupImportance: () => {
        const responses = EncuestaModule.responses;
        if (responses.length === 0) return { percentage: '0%', label: 'Sin datos' };

        const important = responses.filter(r =>
            r.answers.q9 === 'importante' || r.answers.q9 === 'muy_importante'
        ).length;

        const percentage = ((important / responses.length) * 100).toFixed(1);
        return {
            percentage: `${percentage}%`,
            label: `${important} de ${responses.length} lo consideran importante`
        };
    },

    calculateResponseTime: () => {
        const responses = EncuestaModule.responses;
        if (responses.length === 0) return { percentage: '-', label: 'Sin datos' };

        const counts = {
            horas: 0,
            '1_dia': 0,
            '2-3_dias': 0,
            'mas_3_dias': 0
        };

        responses.forEach(r => {
            if (counts.hasOwnProperty(r.answers.q7)) {
                counts[r.answers.q7]++;
            }
        });

        const max = Math.max(...Object.values(counts));
        const preferred = Object.keys(counts).find(key => counts[key] === max);

        const labels = {
            horas: 'Pocas horas',
            '1_dia': '1 día',
            '2-3_dias': '2-3 días',
            'mas_3_dias': '+3 días'
        };

        return {
            percentage: labels[preferred] || '-',
            label: `${counts[preferred]} de ${responses.length} esperan esto`
        };
    }
};

// === CONTACTO ===

const ContactoModule = {
    init: () => {
        const form = document.getElementById('contactForm');

        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (form.checkValidity() === false) {
                form.classList.add('was-validated');
                return;
            }

            ContactoModule.submitForm(form);
        });
    },

    submitForm: (form) => {
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // TODO: conectar a backend
        // Por ahora, simulamos envío y mostramos mensaje

        // Crear mailto como fallback
        const mailtoLink = `mailto:contacto@hidrotec.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(
            `Nombre: ${data.name}\nEmail: ${data.email}\nTeléfono: ${data.phone}\n\nMensaje:\n${data.message}`
        )}`;

        // Guardar en localStorage para seguimiento
        const contacts = Utils.loadFromStorage('contactSubmissions', []);
        contacts.push({
            ...data,
            timestamp: new Date().toISOString()
        });
        Utils.saveToStorage('contactSubmissions', contacts);

        // Mostrar mensaje de éxito
        form.classList.add('d-none');
        document.getElementById('contactSuccess').classList.remove('d-none');

        // Abrir mailto
        window.location.href = mailtoLink;

        // Scroll al mensaje
        setTimeout(() => {
            document.getElementById('contactSuccess').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 300);
    }
};

// === ANUNCIO (Exportar como imagen) ===

const AnuncioModule = {
    init: () => {
        const btn = document.getElementById('downloadAnuncioBtn');
        btn?.addEventListener('click', AnuncioModule.downloadAsImage);
    },

    downloadAsImage: async () => {
        const card = document.getElementById('anuncioCard');
        if (!card) return;

        const btn = document.getElementById('downloadAnuncioBtn');
        btn.disabled = true;
        btn.textContent = 'Generando imagen...';

        try {
            const canvas = await html2canvas(card, {
                scale: 2,
                backgroundColor: '#ffffff',
                logging: false
            });

            const link = document.createElement('a');
            link.download = 'HidroTec_Anuncio_Apertura.png';
            link.href = canvas.toDataURL('image/png');
            link.click();

            btn.textContent = '✓ Imagen descargada!';
            btn.classList.add('btn-success');
            btn.classList.remove('btn-success');

            setTimeout(() => {
                btn.disabled = false;
                btn.textContent = '📥 Descargar Anuncio como Imagen';
                btn.classList.remove('btn-success');
                btn.classList.add('btn-success');
            }, 2000);
        } catch (error) {
            console.error('Error generando imagen:', error);
            alert('Hubo un error al generar la imagen. Por favor intenta de nuevo.');
            btn.disabled = false;
            btn.textContent = '📥 Descargar Anuncio como Imagen';
        }
    }
};

// === SMOOTH SCROLL PARA LINKS ===

const NavigationModule = {
    init: () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '') return;

                e.preventDefault();
                const targetId = href.substring(1);
                Utils.scrollToElement(targetId);
            });
        });
    }
};

// === INICIALIZACIÓN ===

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 HidroTec App iniciando...');

    // Inicializar módulos
    DarkMode.init();
    Animations.init();
    PlanesModule.init();
    EncuestaModule.init();
    MetricsPanel.init();
    ContactoModule.init();
    AnuncioModule.init();
    NavigationModule.init();

    console.log('✅ HidroTec App lista!');
});

// === MANIFEST Y ROBOTS (generados dinámicamente) ===

// Crear manifest.json
const manifest = {
    name: 'HidroTec - Mantenimiento de Computadoras',
    short_name: 'HidroTec',
    description: 'Servicio profesional de mantenimiento de computadoras en Aguascalientes',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0066cc',
    icons: [
        {
            src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ctext y=".9em" font-size="90"%3E💻%3C/text%3E%3C/svg%3E',
            sizes: '512x512',
            type: 'image/svg+xml'
        }
    ]
};

// Crear link al manifest
const manifestLink = document.createElement('link');
manifestLink.rel = 'manifest';
manifestLink.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(manifest));
document.head.appendChild(manifestLink);

// robots.txt (comentario para referencia)
/*
User-agent: *
Allow: /

Sitemap: https://www.hidrotec.com/sitemap.xml
*/

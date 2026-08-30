
**UNIVERSIDAD PRIVADA ANTENOR ORREGO FACULTAD DE INGENIERÍA**

PROGRAMA DE ESTUDIO DE INGENIERÍA DE COMPUTACIÓN Y SISTEMAS

![](Aspose.Words.fd8a8c2c-5052-4c7b-99ad-c515b05d40b1.001.png)

![ref1]

**SW2: Solución Tecnológica de la Tesis - Proyect Chapter**

![ref1]

Autores:

Prieto Meléndez, Alexander Antonio 

Vidal Rodríguez, Fabrizio

Asesor:

Díaz Sánchez, Jaime Eduardo













Trujillo–Perú 2026

**INFORMACIÓN GENERAL DEL PROYECTO**

|**NOMBRE DEL PROYECTO**|**GERENTE DE PROYECTO**|**PATROCINADOR DEL PROYECTO**||
| :- | :-: | :-: | :- |
|Sistema web con funcionalidades predictivas para mejorar la eficiencia de gestión del inventario en la Funeraria Aranzabal, Trujillo - 2026|Cueva Chavez Walter Manuel |Secretaria||
|**MIEMBROS**|**TELÉFONO/CORREO**|||
|Prieto Meléndez Alexander Antonio|955109474|aprietom1@upao.edu.pe||
|Vidal Rodríguez Fabrizio|984044400|fvidalr1@upao.edu.pe||

**VISIÓN GENERAL DEL PROYECTO**

|<p>**PROBLEMA** </p><p>**O SITUACIÓN PROBLEMA** </p>|La gestión actual del inventario en la funeraria enfrenta una dualidad crítica que afecta su competitividad: por un lado, una ineficiencia operativa debido a procesos de control manuales y descentralizados, lo que genera retrasos en el flujo de información y susceptibilidad a errores en el registro de existencias; y por otro lado, una deficiencia estratégica al basar la reposición de stock únicamente en la intuición y la experiencia empírica; provocando quiebres de inventario (desabastecimiento de ataúdes u otros insumos críticos) o sobrecostos logísticos por exceso de almacenamiento, limitando la toma de decisiones óptimas en la empresa.|
| :- | - |
|<p>**PROPÓSITO** </p><p>**DEL PROYECTO**</p>|Desarrollar e implementar un sistema web con funcionalidades predictivas diseñado específicamente para optimizar la gestión del inventario en la Funeraria Aranzabal. Esta solución tecnológica busca transformar la logística de la empresa mediante dos componentes clave: la centralización y automatización del control de existencias, sustituyendo los registros manuales para garantizar un flujo de información ágil y libre de errores; y la optimización inteligente del stock mediante el uso de modelos predictivos de series temporales que proyecten con precisión la demanda futura. La finalidad es proveer una plataforma integrada que mitigue de manera drástica los quiebres de inventario, reduzca el capital inmovilizado y facilite una toma de decisiones estratégica basada en datos reales y alineada con las necesidades del negocio.|
|**CASO DE NEGOCIO**|El caso de negocio se fundamenta en la necesidad crítica de modernizar la gestión de existencias en la Funeraria Aranzabal, donde la actual dependencia de procesos de registro manuales e intuitivos compromete la rentabilidad y la continuidad operativa. La carencia de una herramienta tecnológica centralizada genera un escenario de incertidumbre en el control de almacén, lo que deriva en quiebres de stock recurrentes y sobrecostos logísticos debido a compras de último minuto. Ante esta situación, el proyecto propone el desarrollo de una plataforma web que integre modelos de Machine Learning especializados en la predicción de demanda mediante series temporales. Esta solución no solo optimizará el control administrativo del inventario, sino que permitirá una transición crucial de una gestión puramente empírica a una estrategia guiada por evidencia analítica. De este modo, la implementación garantiza la disponibilidad permanente de suministros críticos y mejora significativamente la toma de decisiones estratégicas de la empresa.|
|**OBJETIVOS / MÉTRICAS**|<p><h4><a name="_heading=h.w5yycbx2k8kd"></a>**OBJETIVO GENERAL**</h4></p><p>Desarrollar e implementar un sistema web con funcionalidades predictivas mediante un modelo de Machine Learning de series temporales para mejorar la eficiencia en la gestión del inventario y mitigar los quiebres de stock en la Funeraria Aranzabal de Trujillo, en un periodo aproximado de 10 semanas y con un costo de infraestructura inicial optimizado.  </p><p><h4><a name="_heading=h.2ujc4x23wpui"></a>**OBJETIVOS ESPECÍFICOS**</h4></p><p><h4><a name="_heading=h.xxjdbwn5hx9a"></a>**1. Implementar los módulos transaccionales del sistema web para centralizar la gestión operativa de la Funeraria Aranzabal.** </h4></p><p>- **Métricas:**</p><p>&emsp;- **Métrica 1.1: Tasa de Cobertura de Requerimientos (TCR)**</p><p>TCR=Requerimientos funcionales transaccionales validadosTotal de requerimientos funcionales planificados\*100%</p><p>- **Métrica 1.2: Tiempo promedio de Procesamiento Transaccional (TPT)**</p><p>TPT=Tiempo total empleado en registrar entradas o salidasNúmero total de transacciones registradas</p><p><h4><a name="_heading=h.t5eox3caxzdr"></a>**2. Implementar el modelo de Machine Learning de series temporales para la predicción de la demanda de suministros de la funeraria.** </h4></p><p>- **Métricas:**</p><p>&emsp;- **Métrica 2.1: Error Porcentual Absoluto Medio (MAPE)**</p><p>MAPE=1Nt=1nDemanda Realt- Demanda PredichatDemanda Realt\*100%  (Objetivo<20%)</p><p>- **Métrica 2.2: Sesgo de Predicción (Forecast Bias - FB)**</p><p>FB=∑(Demanda Predichat-Demanda Realt)∑DemandaRealt\*100%  (Margen Objetivo±5%)</p><p><h4><a name="_heading=h.ru3a0zfjbmp"></a>**3. Integrar el módulo predictivo optimizado dentro de la arquitectura del sistema web, garantizando una comunicación eficiente entre el backend analítico y la interfaz de usuario.** </h4></p><p>- **Métricas:**</p><p>&emsp;- **Métrica 3.1: Latencia del Endpoint de Predicción (LEP)**</p><p>LEP=Tiempo de respuesta del backend segundos ante una petición analítica web</p><p>- **Métrica 3.2: Tasa de Éxito de Peticiones API (TEP)**</p><p>TEP=Peticiones analíticas con código HTTP 200Total de peticiones analíticas enviadas\*100%</p><p><h4><a name="_heading=h.77zsceu719bu"></a>**4. Desplegar el sistema web con funcionalidades predictivas garantizando la viabilidad financiera, temporal y la adopción de usuarios.** </h4></p><p>- **Métricas:**</p><p>&emsp;- **Desviación del Cronograma de Despliegue (DCD)**</p><p>DCD=Fecha real de cierre administrativo-Fecha planificada</p><p>- **Desviación del Costo Presupuestal (DCP)**</p><p>DCP=Costo Real de Infraestructura-Costo Presupuestado</p><p>- **Eficiencia de Capacitación Usuaria (ECU)**</p><p>ECU=Tiempo real invertido en capacitaciónTiempo planificado 2 horas\*100%</p><p></p>|
|**ENTREGABLES ESPERADOS**|<p>- Dataset de entrenamiento etiquetado.</p><p>- Dataset de entrenamiento etiquetado y listo para modelos de ML.</p><p>- Modelo predictivo entrenado con reporte de métricas finales.</p><p>- Diagrama de base de datos</p><p>- Módulo de predicción funcional integrado en el entorno web mediante API.</p>|

**ALCANCE DEL PROYECTO**

El alcance del proyecto contempla el diseño, desarrollo e implementación integral de un sistema web centralizado en la Funeraria Aranzabal (Trujillo) para el Área de Almacén y Logística, orientado a la digitalización y optimización del control de inventarios (altas, bajas y modificaciones de suministros y ataúdes) y a la transición hacia una estrategia de reposición de stock guiada por la evidencia analítica. La solución tecnológica comprende la investigación, comparación y optimización de modelos de series temporales en lenguaje Python para la predicción de la demanda, excluyendo explícitamente migraciones desde sistemas legados, adquisición de hardware, desarrollo de aplicaciones móviles nativas o integraciones con plataformas administrativas ajenas al almacén. Todo el proceso se ejecutará en un plazo estricto de 10 semanas, empleando metodologías híbridas que combinan la gestión por Sprints de Scrum, prácticas de ingeniería de software de Extreme Programming (XP) y el ciclo de vida de ciencia de datos CRISP-DM.  

Para garantizar el éxito de la implementación, el sistema se soportará en una arquitectura que incluye una base de datos relacional PostgreSQL alojada en Supabase, una interfaz de usuario desplegada en Vercel y una API predictiva en Python (desarrollada con Pandas, Statsmodels y Scikit-Learn) alojada en un servidor en la nube de Digital Ocean. La calidad del producto y del proceso de desarrollo de software se medirá rigurosamente bajo el estándar internacional ISO/IEC 25010, evaluando los atributos de adecuación funcional y eficiencia de desempeño a través del tiempo de respuesta y la cobertura de requerimientos. Asimismo, se adoptarán métricas clave del estándar DORA propuesto por Google, específicamente el tiempo de ciclo de cambios (Lead Time for Changes) para cuantificar la agilidad en la integración de módulos mediante XP, y la tasa de fallos en cambios (Change Failure Rate) para asegurar la estabilidad de los despliegues predictivos en producción.

Por el contrario, se delimita explícitamente fuera del alcance de esta investigación cualquier proceso de migración automatizada desde sistemas legados externos o la adquisición y provisión de componentes de hardware para la empresa. De igual manera, quedan excluidas del desarrollo tanto la construcción de una aplicación móvil nativa como la integración del sistema con plataformas de terceros o módulos administrativos ajenos al control estricto del almacén.

**CALENDARIO**

|**Fase / Sprints (Scrum)**|**Duración y Fechas**|**Enfoque Metodológico Integrado**|**Actividades Clave**|**Entregables Principales**|
| :-: | :-: | :-: | :-: | :-: |
|**Fase 1: Iniciación y Planificación Ágil**|<p>**Semanas 1 – 2**</p><p>(07/04/26 - 20/04/26)</p>|<p>**Scrum:** Kick-off y Planificación.</p><p>**CRISP-DM:** Comprensión del Negocio.</p>|<p>- Definición de objetivos del negocio y criterios de éxito del modelo.</p><p>- Elaboración y priorización del Product Backlog inicial.</p><p>- Definición de historias de usuario.</p>|<p>- Acta de Constitución aprobada.</p><p>- Product Backlog priorizado.</p><p>- Matriz de Objetivos y Métricas.</p>|
|**Fase 2: Sprint 1 (Core Transaccional y Datos)**|<p>**Semanas 3 – 4**</p><p>(21/04/26 -04/05/26)</p>|<p>**Scrum:** Sprint Backlog 1.</p><p>**XP:** Diseño simple y Programación en parejas.</p><p>**CRISP-DM:** Comprensión y Preparación de datos.</p>|<p>- Diseño y despliegue de base de datos PostgreSQL (Supabase).</p><p>- Maquetación Frontend e inicio del módulo transaccional de almacén.</p><p>- • Extracción, limpieza y análisis exploratorio (EDA) de datos históricos.</p>|<p>- Base de datos operativa.</p><p>- Primer incremento web (UI transaccional).</p><p>- • Dataset limpio y transformado para el modelo.</p>|
|**Fase 3: Sprint 2 (Modelado e Integración)**|<p>**Semanas 5 – 6**</p><p>(05/05/26 - 18/05/26)</p>|<p>**Scrum:** Sprint Backlog 2.</p><p>**XP:** Integración Continua y *Refactoring* de código.</p><p>**CRISP-DM:** Modelado y Evaluación.</p>|<p>- Finalización de flujos transaccionales de almacén (altas, bajas).</p><p>- Entrenamiento y ajuste de modelos de series temporales en Python.</p><p>- Evaluación del rendimiento del modelo analítico (Métrica MAPE).</p><p>- • Refactoring (XP) para optimizar la eficiencia del sistema.</p>|<p>- Reporte de evaluación del modelo.</p><p>- Código fuente optimizado y refactorizado.</p><p>- • API predictiva local funcional.</p>|
|**Fase 4: Sprint 3 (Despliegue y Calidad)**|<p>**Semanas 7 – 8**</p><p>(19/05/26 - 01/06/26)</p>|<p>**Scrum:** Sprint Backlog 3.</p><p>**XP:** Pruebas unitarias/aceptación y Despliegue frecuente.</p><p>**CRISP-DM:** Despliegue del Modelo.</p>|<p>- Despliegue de la API predictiva en Digital Ocean.</p><p>- Integración y consumo de la API desde el Frontend (Vercel).</p><p>- Pruebas de aceptación con usuarios y medición de latencia.</p><p>- • Medición de estabilidad (Métricas DORA: Lead Time for Changes).</p>|<p>- Sistema web predictivo completamente integrado.</p><p>- API e interfaz desplegadas en producción beta.</p><p>- • Reporte de pruebas unitarias y de aceptación.</p>|
|**Fase 5: Cierre del Proyecto y Adopción**|<p>**Semanas 9 – 10**</p><p>(02/06/26 - 16/06/26)</p>|**Scrum:** Sprint Review y Retrospectiva final.|<p>- Ejecución de la sesión de capacitación (2 horas) a los usuarios.</p><p>- Evaluación final de estándares de calidad ISO 25010.</p><p>- Control final de desviación presupuestal e infraestructura.</p><p>- • Cierre administrativo del proyecto.</p>|<p>- Manuales de usuario y del sistema.</p><p>- Informe final de métricas de calidad.</p><p>- • Acta de Aceptación y Cierre firmada.</p>|

**RECURSOS**

|EQUIPO DEL PROYECTO|<p>Investigadores:</p><p>- Prieto Meléndez Alexander Antonio </p><p>- Vidal Rodríguez Fabrizio</p>|
| :- | - |
|RECURSOS DE SOPORTE|<p>- Patrocinador:</p><p>&emsp;Zayda Atoche Urbina, nos proporcionará la información y los medios para el desarrollo del proyecto.</p><p>- Gerente de Proyecto:</p><p>&emsp;Cueva Chavez Waler Manuel encargado de  la validación y aprobación de hitos. </p>|
|NECESIDADES ESPECIALES|<p>- Despliegue de un servidor en la nube (Digital Ocean)la API en Python junto al modelo de machine learning</p><p>- Software de análisis de datos: Entorno de ejecución de scripts en Python (Jupyter Notebook/VS Code) y librerías especializadas en series temporales (Pandas, Statsmodels, Scikit-Learn) para el procesamiento y modelado de datos históricos”.</p><p>- Para alojar la base de datos PostgreSQL se usará supabase.</p><p>- Para el despliegue del frontend se usará vercel</p><p>- Para el dominio usaremos hostinger con la renovación anual.</p>|

**CAPEX**

|**TIPO DE COSTO**|**NOMBRES DE PROVEEDORES**|**PRECIO UNITARIO**|**IMPORTE**||
| :- | :- | :-: | :-: | :- |
|**Dominio**|Hostinger|238\.53 |238\.53||
|| | |COSTOS TOTALES|238\.53 |

**OPEX(Mensual)**

|**TIPO DE COSTO**|**NOMBRES DE PROVEEDORES**|**PRECIO UNITARIO**|**IMPORTE**||
| :- | :- | :-: | :-: | :- |
|**Infraestructura** |` `Digital Ocean|28|28||
| | | |COSTOS TOTALES|` `28|

**OPEX(Primer año)**

|**TIPO DE COSTO**|**NOMBRES DE PROVEEDORES**|**PRECIO UNITARIO**|**IMPORTE**||
| :- | :- | :-: | :-: | :- |
|**Infraestructura** |` `Digital Ocean|280|280||
| | | |COSTOS TOTALES|280|

**OPEX(De dos a cinco año)**

|**Año** |**Digital Ocean** |**Digital Ocean** |**Supabase** |**TOTAL OPEX** ||
| :-: | :-: | :-: | :-: | :-: | :- |
|**Año 2**|29\.06 |348\.77 |1,023.00 |1,371.77 ||
|**Año 3**|30\.17 |362\.02 |1,061.87 |1,423.89 ||
|**Año 4**|31\.31 |375\.78 |1,101.66 |1,477.44 ||
|**Año 5**|32\.50 |390\.06 |1,144.11 |1,534.17 ||




**Proyección de flujo de caja operativo a 5 años** 

|**Categoría de Gasto** |**Año 1** |**Año 2**|**Año 3**|**Año 4**|**Año 5**||
| :-: | :-: | :-: | :-: | :-: | :-: | :- |
|**CAPEX** |238\.53 |0\.00 |0\.00 |0\.00 |0\.00 ||
|**OPEX Cloud** |280\.00 |348\.77 |362\.02 |375\.78 |390\.06 ||
|**OPEX Base de Datos** |0\.00 |1,023.00 |1,061.87 |1,101.66 |1,144.11 ||
|**TOTAL ANUAL** |518\.53 |1,371.77 |1,423.89 |1,477.44 |1,534.17 ||
### <a name="_heading=h.w3z0psedel29"></a>**Flujo de caja neto proyectado**

|**Año** |**Beneficios / Ahorros (A)** |**Costos Operativos (OPEX) (B)** |**Flujo Neto de Efectivo (A − B)** ||
| :-: | :-: | :-: | :-: | :- |
|**Año 0** |0\.00 |238\.53 |(238.53) ||
|**Año 1**|2,020.00 |280\.00 |1,740.00 ||
|**Año 2**|2,020.00 |1,371.77 |648\.23 ||
|**Año 3**|2,020.00 |1,423.89 |596\.11 ||
|**Año 4**|2,020.00 |1,477.44 |542\.56 ||
|**Año 5**|2,020.00 |1,534.17 |485\.83 ||
###
|<a name="_heading=h.16z1z9r9jd6b"></a>**Indicador Financiero** |**Resultado** |**Interpretación Técnica** ||
| :-: | :-: | :-: | :- |
|**VAN (Valor Actual Neto)** |S/ 5,797.07 |Aunque el costo operativo sube considerablemente desde el Año 2, por Supabase Pro, el proyecto sigue generando valor neto positivo, superando el 12% de rentabilidad exigida. ||
|**TIR (Tasa Interna de Retorno)** |669\.6% |Se reduce respecto al escenario 100% gratuito, pero se mantiene muy por encima del COK(Costo de Oportunidad del Capital ) (12%), gracias a la baja inversión inicial. ||
|**Período de recuperación** |0\.14 años (~1.6 meses) |La recuperación ocurre en el primer año, antes de que se active el costo de Supabase Pro en el Año 2. ||

**VAN** 

**VAN=−238.53+1740.00 1.121++648.23​1.122+596.11 1.123+542.56  1.124+485.83   1.125​** 

**VAN=−238.53+1553.57+516.76+424.30+344.81+275.68**  

**VAN = 2,876.59**

**TIR**

**0=−238.53+11740.00(1+TIR)1+648.23 (1+TIR)2+596.11 (1+TIR)3+542.56 (1+TIR)4+485.83 (1+TIR)5​​** 

**TIR ≈669.6%**

**Período de recuperación** 

**Payback=238.53  1,740.00=0.137 años ≈ 1.64 meses​​** 

**Payback​​ ≈ 0.14 años ≈ 1.6 meses**

**BENEFICIOS Y CLIENTES**

|PROPIETARIO DEL PROCESO|` `Dueño y secretaria de la funeraria|
| :- | :- |
|PRINCIPALES PARTES INTERESADAS|` `Dueño y secretaria de la funeraria|
|CLIENTE FINAL|` `Secretaria de la funeraria|
|BENEFICIOS ESPERADOS|Eliminación de quiebres de stock y optimización del gasto en inventario.|


|**TIPO DE PRESTACIÓN**|**BASE DE ESTIMACIÓN**|**MONTO ESTIMADO DEL BENEFICIO**|||
| :- | :- | :-: | :- | :- |
|**Ahorro de costes específicos**|Reducción de capital inmovilizado en sobrestock y disminución de gastos de mantenimiento mediante el modelo predictivo.|S/ 500.00|||
|**Mayor productividad (suave)**|Ahorro de aprox. 40 horas mensuales de la secretaria al centralizar y automatizar el registro de existencias en el sistema web.|S/ 420.00|||
|**Mejor toma de decisiones**|Evitar la pérdida de ventas (servicios funerarios no concretados) por quiebres de stock mediante alertas tempranas basadas en datos.|S/ 800.00|||
|**Otros costos evitados**|Eliminación de gastos de transporte urgente por compras de último minuto y errores en pedidos manuales.|S/ 300.00|||
|<p> </p><p></p><p></p>| | |BENEFICIO TOTAL|S/ 2,020.00|

**RIESGOS, LIMITACIONES Y SUPUESTOS**

|RIESGOS|<p>- Inconsistencia, pérdida o falta de datos en los registros históricos de la funeraria que afecten el entrenamiento del modelo predictivo.</p><p>- Volumen insuficiente de datos históricos para lograr una alta precisión en el modelo predictivo.</p><p>- Resistencia del personal administrativo al cambio del proceso físico al digital.</p>|
| :- | :- |
|RESTRICCIONES|<p>- Presupuesto limitado a los recursos asignados por el taller integrador.</p><p>- El sistema debe ser compatible con navegadores web estándar sin requerir hardware especializado.</p><p>- El entrenamiento y la precisión de los modelos analíticos están supeditados al volumen, consistencia y calidad de la data histórica real.</p>|
|SUPOSICIONES|<p>- La empresa facilitará el acceso total a los registros físicos.</p><p>- El equipo de desarrollo tiene acceso a potencia de cómputo necesaria para el entrenamiento de modelos.</p><p>- Los datos extraídos son la demanda real del negocio.</p>|






|PREPARADO POR|TÍTULO|FECHA|
| :- | :- | :-: |
|Prieto Meléndez Alexander Antonio y Vidal Rodríguez Fabrizio|Sistema web con funcionalidades predictivas para mejorar la eficiencia de gestión del inventario en la Funeraria Aranzabal, Trujillo - 2026|26/04/2026 |

[ref1]: Aspose.Words.fd8a8c2c-5052-4c7b-99ad-c515b05d40b1.002.png

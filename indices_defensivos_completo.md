# 🛡️ Índices Defensivos para Dominó Profesional
## *IED (Índice de Eficiencia Defensiva) e ICD (Índice de Consistencia Defensiva)*

---

## 📋 **Resumen Ejecutivo**

El dominó profesional en parejas requiere un equilibrio entre capacidad ofensiva y defensiva. Mientras que índices como IAR miden el ataque, era necesario desarrollar métricas específicas para evaluar las habilidades defensivas de los jugadores. Este documento presenta **dos índices complementarios** que cubren diferentes aspectos de la defensa en el dominó.

---

## 🎯 **Índice de Eficiencia Defensiva (IED)**

### **Definición y Fórmula:**
```
IED = ((PC_Promedio_Torneo - PC_Jugador) / PC_Promedio_Torneo) × 100
```

### **Interpretación:**
- **IED > 0**: Jugador concede menos puntos que el promedio (buena defensa)
- **IED = 0**: Jugador concede exactamente el promedio del torneo
- **IED < 0**: Jugador concede más puntos que el promedio (defensa débil)

### **Características Técnicas:**
- **Tipo**: Índice relativo contextualizado
- **Rango**: Sin límites teóricos (típicamente -50% a +40%)
- **Correlación esperada con IAR**: -0.3 a -0.5
- **Datos requeridos**: PC individual, PC promedio del torneo

---

## 🛡️ **Índice de Consistencia Defensiva (ICD)**

### **Definición y Fórmula:**
```
ICD = (1 - Desviación_Estándar_PC / Media_PC_Jugador) × 100
```

### **Interpretación:**
- **ICD cercano a 100%**: Jugador extremadamente consistente defensivamente
- **ICD 80-90%**: Consistencia defensiva alta
- **ICD 60-80%**: Consistencia defensiva moderada
- **ICD < 60%**: Jugador defensivamente errático

### **Características Técnicas:**
- **Tipo**: Índice de variabilidad individual
- **Rango**: 0% a 100% (valores negativos = 0%)
- **Correlación esperada con ICR**: +0.6 a +0.8
- **Datos requeridos**: PC por ronda individual

---

## 🧮 **Cálculo Detallado de Desviación Estándar**

### **Fórmula General:**
```
σ = √[(Σ(xi - μ)²) / (n - 1)]

Donde:
- σ = Desviación estándar
- xi = Cada valor individual (PC por ronda)
- μ = Media de los valores
- n = Número total de valores
- (n-1) = Grados de libertad (para muestra)
```

### **Proceso Paso a Paso:**

#### **Paso 1: Calcular la Media**
```
Media = Σ(PC por ronda) / n
```

#### **Paso 2: Calcular las Diferencias al Cuadrado**
```
Para cada ronda: (PC_ronda - Media)²
```

#### **Paso 3: Calcular la Varianza**
```
Varianza = Σ(Diferencias²) / (n - 1)
```

#### **Paso 4: Calcular la Desviación Estándar**
```
Desviación Estándar = √(Varianza)
```

---

## 📊 **Ejemplo Práctico Completo**

### **Escenario: Torneo Nacional - 10 jugadores, 9 rondas**

#### **Datos Base del Torneo:**
```
Participantes: 10 jugadores
Rondas: 9 rondas
PC Promedio del torneo: 675 puntos
Desviación estándar promedio del torneo: 18.5 puntos por ronda
```

---

## 🔍 **Análisis de 4 Perfiles de Jugadores**

### **Jugador A - "El Muro Perfecto"**

#### **Datos:**
```
PC Total: 540 puntos
PC por ronda: [60, 58, 62, 59, 61, 57, 63, 60, 60]
```

#### **Cálculo Detallado de Desviación Estándar:**

**Paso 1: Media**
```
Media = (60 + 58 + 62 + 59 + 61 + 57 + 63 + 60 + 60) / 9
Media = 540 / 9 = 60 puntos
```

**Paso 2: Diferencias al Cuadrado**

| Ronda | PC | Diferencia (PC - Media) | Diferencia² |
|-------|----|-----------------------|-------------|
| 1 | 60 | 60 - 60 = 0 | 0² = 0 |
| 2 | 58 | 58 - 60 = -2 | (-2)² = 4 |
| 3 | 62 | 62 - 60 = 2 | 2² = 4 |
| 4 | 59 | 59 - 60 = -1 | (-1)² = 1 |
| 5 | 61 | 61 - 60 = 1 | 1² = 1 |
| 6 | 57 | 57 - 60 = -3 | (-3)² = 9 |
| 7 | 63 | 63 - 60 = 3 | 3² = 9 |
| 8 | 60 | 60 - 60 = 0 | 0² = 0 |
| 9 | 60 | 60 - 60 = 0 | 0² = 0 |

**Suma de diferencias²:** 0 + 4 + 4 + 1 + 1 + 9 + 9 + 0 + 0 = **28**

**Paso 3: Varianza**
```
Varianza = 28 / (9 - 1) = 28 / 8 = 3.5
```

**Paso 4: Desviación Estándar**
```
Desviación Estándar = √(3.5) = 1.87 puntos
```

#### **Cálculo IED:**
```
IED_A = ((675 - 540) / 675) × 100
IED_A = (135 / 675) × 100 = 20.0%
```

#### **Cálculo ICD:**
```
ICD_A = (1 - 1.87/60) × 100
ICD_A = (1 - 0.0312) × 100 = 96.88%
```

#### **Perfil Táctico:**
- **IED: +20.0%** → Excelente eficiencia defensiva
- **ICD: 96.88%** → Extremadamente consistente
- **Clasificación**: **MURO CONFIABLE**

---

### **Jugador B - "El Equilibrado"**

#### **Datos:**
```
PC Total: 675 puntos  
PC por ronda: [78, 72, 76, 74, 77, 73, 79, 75, 75]
Media PC por ronda: 75 puntos
Desviación Estándar PC: 2.35 puntos
```

#### **Cálculo IED:**
```
IED_B = ((675 - 675) / 675) × 100
IED_B = (0 / 675) × 100 = 0.0%
```

#### **Cálculo ICD:**
```
ICD_B = (1 - 2.35/75) × 100
ICD_B = (1 - 0.031) × 100 = 96.9%
```

#### **Perfil Táctico:**
- **IED: 0.0%** → Defensa promedio del torneo
- **ICD: 96.9%** → Muy consistente
- **Clasificación**: **DEFENSIVO ESTABLE**

---

### **Jugador C - "El Ofensivo Errático"**

#### **Datos:**
```
PC Total: 810 puntos
PC por ronda: [95, 85, 105, 75, 110, 80, 100, 85, 75]
Media PC por ronda: 90 puntos  
Desviación Estándar PC: 13.54 puntos
```

#### **Cálculo IED:**
```
IED_C = ((675 - 810) / 675) × 100
IED_C = (-135 / 675) × 100 = -20.0%
```

#### **Cálculo ICD:**
```
ICD_C = (1 - 13.54/90) × 100
ICD_C = (1 - 0.150) × 100 = 85.0%
```

#### **Perfil Táctico:**
- **IED: -20.0%** → Defensa pobre
- **ICD: 85.0%** → Moderadamente consistente
- **Clasificación**: **GLADIADOR PREDECIBLE**

---

### **Jugador D - "El Impredecible"**

#### **Datos:**
```
PC Total: 675 puntos
PC por ronda: [45, 105, 50, 95, 55, 100, 60, 90, 75]
Media PC por ronda: 75 puntos
Desviación Estándar PC: 23.98 puntos
```

#### **Cálculo IED:**
```
IED_D = ((675 - 675) / 675) × 100
IED_D = (0 / 675) × 100 = 0.0%
```

#### **Cálculo ICD:**
```
ICD_D = (1 - 23.98/75) × 100
ICD_D = (1 - 0.320) × 100 = 68.0%
```

#### **Perfil Táctico:**
- **IED: 0.0%** → Defensa promedio total
- **ICD: 68.0%** → Bastante errático
- **Clasificación**: **COMODÍN IMPREDECIBLE**

---

## 📈 **Tabla Resumen del Análisis**

| Jugador | PC Total | IED | ICD | Perfil Defensivo | Recomendación Táctica |
|---------|----------|-----|-----|------------------|----------------------|
| **A** | 540 | **+20.0%** | **96.88%** | Muro Confiable | Ideal para finales cerrados |
| **B** | 675 | **0.0%** | **96.9%** | Defensivo Estable | Comodín versátil |
| **C** | 810 | **-20.0%** | **85.0%** | Gladiador Predecible | Pareja con defensivo sólido |
| **D** | 675 | **0.0%** | **68.0%** | Comodín Impredecible | Alto riesgo/alta recompensa |

---

## 🎯 **Valores de Referencia y Clasificación**

### **Escala IED (Eficiencia Defensiva):**
- **IED > +25%**: Defensa excepcional
- **IED +15% a +25%**: Defensa excelente
- **IED +5% a +15%**: Defensa buena
- **IED -5% a +5%**: Defensa promedio
- **IED -15% a -5%**: Defensa deficiente
- **IED < -15%**: Defensa muy pobre

### **Escala ICD (Consistencia Defensiva):**
- **ICD > 95%**: Consistencia excepcional
- **ICD 90% a 95%**: Consistencia excelente
- **ICD 80% a 90%**: Consistencia buena
- **ICD 70% a 80%**: Consistencia regular
- **ICD 60% a 70%**: Consistencia deficiente
- **ICD < 60%**: Muy errático

---

## 🔬 **Análisis de Correlaciones**

### **Correlaciones Teóricas Esperadas:**

| Índice | IED | ICD | IAR | ICR | DRP |
|--------|-----|-----|-----|-----|-----|
| **IED** | 1.00 | 0.25 | -0.40 | 0.30 | 0.45 |
| **ICD** | 0.25 | 1.00 | -0.10 | 0.75 | 0.20 |

### **Interpretación:**
- **IED vs IAR (-0.40)**: Correlación negativa moderada - jugadores ofensivos tienden a ser menos eficientes defensivamente
- **ICD vs ICR (0.75)**: Correlación alta positiva - consistencia general se refleja en ambos aspectos
- **IED vs ICD (0.25)**: Correlación baja - miden aspectos diferentes de la defensa

---

## 🏆 **Aplicaciones Estratégicas**

### **1. Formación de Parejas**

#### **Pareja Ideal - Balance Clásico:**
```
Jugador Ofensivo: IAR 115%, IED -10%, ICD 75%
Jugador Defensivo: IAR 95%, IED +20%, ICD 90%
Resultado: Equilibrio perfecto ataque-defensa
```

#### **Pareja Arriesgada - Doble Ataque:**
```
Jugador A: IAR 120%, IED -15%, ICD 70%
Jugador B: IAR 118%, IED -12%, ICD 80%
Resultado: Máximo potencial ofensivo, riesgo defensivo alto
```

### **2. Análisis de Rendimiento Individual**

#### **Jugador Completo (MVP Candidato):**
```
Métricas: IAR 110%, IED +15%, ICD 88%
Perfil: Ofensivo eficiente con defensa sólida y consistente
Valor: Extremadamente versátil, puede jugar cualquier rol
```

#### **Especialista Defensivo:**
```
Métricas: IAR 88%, IED +25%, ICD 94%
Perfil: "El Muro" - especialista en contener rivales
Valor: Ideal para torneos de eliminación directa
```

---

## 🔧 **Implementación Técnica**

### **Datos Requeridos:**

#### **Para IED:**
- PC total de cada jugador
- Cálculo del PC promedio del torneo
- Fórmula: `((PC_Promedio - PC_Jugador) / PC_Promedio) × 100`

#### **Para ICD:**
- PC por ronda individual de cada jugador
- Cálculo de media y desviación estándar por jugador
- Fórmula: `(1 - Desv_Std_PC / Media_PC) × 100`

### **Consideraciones Especiales:**

#### **IED:**
- **Sin límites teóricos**, pero valores extremos (+50%, -50%) son raros
- **Contextualizado por torneo** - no comparable entre eventos diferentes
- **Interpretación directa** como porcentaje vs promedio

#### **ICD:**
- **Rango 0-100%**, valores negativos se ajustan a 0%
- **Mínimo 3 rondas** para cálculo estadísticamente válido
- **Comparable entre torneos** diferentes

---

## 📊 **Ejemplo de Implementación en Tabla**

### **Clasificación General con Índices Defensivos:**

| Pos | Jugador | EFF | V | D | PF | PC | **IED** | **ICD** | Perfil |
|-----|---------|-----|---|---|----|----|---------|---------|--------|
| 1 | García | 85.2 | 8 | 1 | 950 | 540 | **+20.0%** | **96.88%** | Completo |
| 2 | López | 82.1 | 7 | 2 | 920 | 580 | **+14.1%** | **91.2%** | Equilibrado |
| 3 | Martín | 79.8 | 8 | 1 | 1050| 810 | **-20.0%** | **85.0%** | Ofensivo |
| 4 | Pérez | 76.5 | 6 | 3 | 840 | 620 | **+8.1%** | **88.5%** | Defensivo |

### **Métricas Auxiliares Defensivas:**

| Jugador | IAR | IED | ICD | Clasificación Defensiva |
|---------|-----|-----|-----|-----------------------|
| García | 108% | +20.0% | 96.88% | **Elite Defensivo** |
| López | 104% | +14.1% | 91.2% | **Sólido** |
| Martín | 119% | -20.0% | 85.0% | **Ofensivo Puro** |
| Pérez | 95% | +8.1% | 88.5% | **Especialista Defensivo** |

---

## 🎯 **Ventajas del Sistema Dual IED + ICD**

### **Complementariedad:**
✅ **IED** mide eficiencia relativa al contexto del torneo  
✅ **ICD** mide consistencia individual independiente del contexto  
✅ **Juntos** proporcionan una visión completa de las habilidades defensivas  

### **Aplicaciones Diferenciadas:**
- **IED**: Comparaciones dentro de un torneo específico
- **ICD**: Evaluación de confiabilidad del jugador a largo plazo
- **Combinados**: Selección óptima de parejas y estrategias

### **Información Única:**
- **No redundantes** con índices ofensivos existentes
- **Correlaciones bajas** entre sí (miden aspectos diferentes)
- **Altamente relevantes** para la táctica del dominó en parejas

---

## 📋 **Recomendaciones de Implementación**

### **Fase 1: Implementación IED**
1. Calcular PC promedio del torneo
2. Aplicar fórmula IED para todos los jugadores
3. Incluir como columna en tabla de clasificación

### **Fase 2: Implementación ICD**
1. Verificar disponibilidad de datos por ronda
2. Calcular desviación estándar de PC por jugador
3. Aplicar fórmula ICD y añadir como métrica auxiliar

### **Fase 3: Análisis Táctico**
1. Crear perfiles defensivos basados en IED + ICD
2. Desarrollar recomendaciones de parejas
3. Integrar en análisis post-torneo

---

## 🔬 **Conclusiones Técnicas**

Los índices **IED e ICD representan una innovación significativa** en la evaluación del dominó profesional, proporcionando por primera vez métricas específicas para medir las habilidades defensivas de los jugadores.

### **Valor Añadido:**
- **Completan el espectro** de evaluación (ya no solo ataque)
- **Información táctica única** para formación de parejas
- **Facilitan análisis estratégico** más profundo
- **Mantienen simplicidad** en cálculo e interpretación

### **Aplicabilidad:**
- **Inmediatamente implementables** con datos existentes
- **Escalables** a cualquier formato de torneo
- **Compatibles** con sistema EFF actual
- **Relevantes** para todos los niveles de competición

---

## 📅 **Información del Documento**

**Versión**: 1.1 Corregido  
**Fecha**: Junio 2025  
**Estado**: Listo para implementación  
**Índices presentados**: IED (Eficiencia Defensiva) + ICD (Consistencia Defensiva)  
**Aplicación**: Dominó profesional internacional en parejas  
**Corrección principal**: Cálculo detallado y corregido de desviación estándar
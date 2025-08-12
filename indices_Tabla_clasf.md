# 🏆 Tabla de Clasificación – Dominó Profesional

> 📋 Esta tabla está diseñada para torneos oficiales, de élite e internacionales, y contiene los principales índices y métricas recomendadas para el contexto profesional del dominó.

---

## 📊 Columnas y Significado por Categorías

### 🎯 **Ficha Técnica**
| Columna         | Abreviatura | ¿Qué representa? / Fórmula                                                                 |
|-----------------|-------------|-------------------------------------------------------------------------------------------|
| **Posición**        | POS         | 🥇 Puesto en la clasificación general.                                                      |
| **Jugador/Club**    |             | 👤 Nombre del jugador o club.                                                               |
| **País**            |             | 🏳️ País de origen del jugador o club.                                                       |

### 📈 **Estadísticas Básicas**
| Columna         | Abreviatura | ¿Qué representa? / Fórmula                                                                 |
|-----------------|-------------|-------------------------------------------------------------------------------------------|
| **Partidas Jugadas**| PJ          | 🎮 Número total de partidas disputadas.                                                     |
| **Victorias**       | V           | ✅ Cantidad de partidas ganadas.                                                            |
| **Derrotas**        | D           | ❌ Cantidad de partidas perdidas.                                                           |
| **Puntos a Favor**  | PF          | ⬆️ Total de puntos anotados.                                                                |
| **Puntos en Contra**| PC          | ⬇️ Total de puntos recibidos.                                                               |
| **Win Rate**        | WR %        | 🎯 (Victorias / Partidas Jugadas) × 100. Porcentaje de partidas ganadas.                   |

### ⚡ **Eficiencia y Performance**
| Columna         | Abreviatura | ¿Qué representa? / Fórmula                                                                 |
|-----------------|-------------|-------------------------------------------------------------------------------------------|
| **Índice de Efectividad** | EFF     | 🔥 Medida de eficiencia y rendimiento global según reglamento oficial.                      |
| **Performance de Oponentes** | μTBz | 💪 Suma o promedio de los puntos de los rivales enfrentados (Buchholz truncado).           |
| **ELO Rating**      | ELO         | 🏅 Valoración internacional basada en el sistema ELO.                                       |

### 🎯 **Rendimiento Ofensivo**
| Columna         | Abreviatura | ¿Qué representa? / Fórmula                                                                 |
|-----------------|-------------|-------------------------------------------------------------------------------------------|
| **Índice de Calidad de Victorias** | ICV | 🚀 Promedio ponderado de calidad de victorias basado en márgenes.                       |
| **Índice de Ataque Relativo** | IAR %| 💥 (PF_jugador / Media_Ataque_Ajustada) × 100. Poder ofensivo relativo al promedio.       |
| **Promedio de Puntos por Partida** | AVG | 📊 PF / PJ. Promedio de puntos a favor por partida jugada.                                 |

### 🛡️ **Rendimiento Defensivo**
| Columna         | Abreviatura | ¿Qué representa? / Fórmula                                                                 |
|-----------------|-------------|-------------------------------------------------------------------------------------------|
| **Índice de Eficiencia Defensiva** | IED % | 🔒 ((PC_Promedio_Torneo - PC_Jugador) / PC_Promedio_Torneo) × 100. Eficiencia defensiva relativa. |
| **Índice de Consistencia Defensiva** | ICD % | 🛡️ (1 - Desviación_Estándar_PC / Media_PC_Jugador) × 100. Consistencia defensiva individual. |

### ⚔️ **Dominancia/Balance**
| Columna         | Abreviatura | ¿Qué representa? / Fórmula                                                                 |
|-----------------|-------------|-------------------------------------------------------------------------------------------|
| **Índice de Dominio Normalizado** | IDN % | 👑 [(PF - PC)/(PF + PC)] × 100. Refleja el dominio relativo normalizado sobre el total jugado.|
| **Índice de Margen por Victoria** | MOV % | 💪 (Victorias_amplias / Partidas Jugadas) × 100. Porcentaje de victorias dominantes.    |
| **Diferencia de Puntos** | DIFF    | ⚖️ PF - PC. Saldo neto de puntos.                                                          |

---

## 🔬 Fórmulas Compuestas y Sub-Fórmulas

### **⚡ EFF - Índice de Efectividad**
**Fórmula Principal:**
```
EFF = 0.40×DRP_norm + 0.30×PBT_TBz_norm + 0.20×ICV + 0.10×ICC_TBz_inv
```

**Sub-fórmulas:**
- **🎯 DRP_norm**: Eficiencia Técnica Individual Normalizada [-100, +100]
  ```
  DRP = [(Piedras_Favor - Piedras_Contra) / (Umbral × Partidas_Jugadas)] × 100
  Umbral = ptj_base × (1 + (1/3 × (PF_total / (ptj_base × PJ))))
  DRP_norm = [(DRP - DRP_min) / (DRP_max - DRP_min)] × 200 - 100
  ```

- **💪 PBT_TBz_norm**: Promedio Buchholz Truncado Normalizado [0, 100]
  ```
  TBz_crudo = Σ(PG_oponentes) - min(PG_oponentes)  [si N ≥ 2]
  TBz_crudo = PG_oponente × 10                       [si N = 1]
  TBz_crudo = 0                                      [si N = 0]
  ```

- **🤝 ICC_TBz_inv**: Compensación por Calidad de Compañeros Invertido [0, 100]
  ```
  ICC_crudo = 100 - Promedio_TBz_norm_compañeros
  ```

### **🚀 ICV - Índice de Calidad de Victorias**
**Fórmula Principal:**
```
ICV = (Σ Puntos_calidad / Partidas_totales) × (Victorias / Partidas_totales)
```

**Sub-fórmulas:**
- **🎖️ Clasificación adaptativa por puntaje objetivo:**
  - **🏆 Victoria Dominante (VD)**: Diferencia ≥ 60% del puntaje objetivo → 100 puntos
  - **🥇 Victoria Clara (VC)**: Diferencia 31-59% del puntaje objetivo → 75 puntos
  - **🥈 Victoria Ajustada (VA)**: Diferencia 11-30% del puntaje objetivo → 50 puntos
  - **🥉 Victoria Mínima (VM)**: Diferencia ≤ 10% del puntaje objetivo → 25 puntos

### **💪 MOV - Índice de Margen por Victoria**
**Fórmula Principal:**
```
MOV = (Victorias_amplias / Partidas Jugadas) × 100
```

**Sub-fórmula:**
- **⚔️ Criterio Victoria Amplia:** 1-(PC/PF) > 0.50
  (Victorias con margen superior al 50% del total de puntos jugados)

### **🔒 IED - Índice de Eficiencia Defensiva**
**Fórmula Principal:**
```
IED = ((PC_Promedio_Torneo - PC_Jugador) / PC_Promedio_Torneo) × 100
```

### **🛡️ ICD - Índice de Consistencia Defensiva**
**Fórmula Principal:**
```
ICD = (1 - Desviación_Estándar_PC / Media_PC_Jugador) × 100
```

**Sub-fórmula de Desviación Estándar:**
```
σ = √[(Σ(xi - μ)²) / (n - 1)]
Donde:
- xi = PC por ronda individual
- μ = Media de PC del jugador
- n = Número de rondas jugadas
```

### **💥 IAR - Índice de Ataque Relativo**
**Fórmula Principal:**
```
IAR = (PF_jugador / Media_Ataque_Ajustada) × 100
```

**Sub-fórmula de Media Ajustada:**
```
Media_Ataque_Ajustada = (Σ PF_restantes) / (N - nº excluidos)
```
- **🚫 Excluye:** Jugador con mayor PF y jugador con menor PF
- **⚠️ Si último jugador tuvo inasistencias:** También excluye al penúltimo

---

## 📝 Ejemplo Visual de Tabla

| POS | Jugador/Club | País | PJ | V | D | PF  | PC  | WR (%) | EFF | μTBz | ELO | ICV | IAR (%) | AVG | IED (%) | ICD (%) | IDN (%) | MOV (%) | DIFF |
|:---:|:-------------|:----:|:--:|:-:|:-:|:---:|:---:|:------:|:---:|:----:|:---:|:---:|:-------:|:---:|:-------:|:-------:|:-------:|:-------:|:----:|
|🥇 1 | Ana Team     | 🇪🇸  |  7 | 6 | 1 |1400 |1200 | 85.7   | 83.5| 36.4 |2100 | 80  | 120     | 200 | +20.0   | 96.9    | 14.3    | 57.1    | +200 |
|🥈 2 | Juan Club    | 🇻🇪  |  7 | 5 | 2 |1300 |1250 | 71.4   | 71.2| 32.1 |2080 | 65  | 104     |185.7| +8.1    | 91.2    | 5.0     | 28.6    |  +50 |
| ... | ...          | ...  | ...|...|...|... | ... | ...    | ... | ...  | ... | ... | ...     | ... | ...     | ...     | ...     | ...     |  ... |

---

## 💡 Notas de Interpretación

### **⚡ Índices Principales:**
- **🔥 EFF:** Sistema optimizado de efectividad que combina rendimiento técnico, fuerza de oponentes, calidad de victorias y compensación por compañeros.
- **💪 μTBz:** Fuerza de Calendario, útil como criterio de desempate en sistema suizo.
- **🏅 ELO:** Valoración internacional estandarizada.

### **🎯 Índices Ofensivos:**
- **💥 IAR (%):** >100% indica ataque superior al promedio ajustado del torneo.
- **📊 AVG:** Mide la capacidad ofensiva media por ronda.
- **🚀 ICV:** Evalúa no solo la cantidad sino la calidad de las victorias obtenidas.

### **🛡️ Índices Defensivos:**
- **🔒 IED (%):** >0% indica defensa mejor que el promedio del torneo.
- **🛡️ ICD (%):** Cerca del 100% indica alta consistencia defensiva.

### **⚔️ Índices de Dominancia:**
- **👑 IDN (%):** Valores positivos indican dominio neto, negativos dominio adverso.
- **💪 MOV (%):** Mide la frecuencia de victorias dominantes (blowouts).
- **⚖️ DIFF:** Saldo absoluto de puntos, indicador directo de dominancia.

### **📏 Escalas de Interpretación:**
- **🔒 IED:** +25% excepcional, +15% excelente, +5% buena, ±5% promedio, -15% deficiente
- **🛡️ ICD:** >95% excepcional, 90-95% excelente, 80-90% buena, 70-80% regular, <60% errática
- **💪 MOV:** >40% dominante, 25-40% agresivo, 10-25% equilibrado, <10% conservador

---

## ⚖️ Criterios de Desempate (Orden de Prioridad)
1. **✅ Victorias (V)**
2. **⚡ Efectividad (EFF)**
3. **💪 μ Buchholz (μTBz)**
4. **👑 Índice de Dominio Normalizado (IDN)**
5. **⚖️ Diferencia de Puntos (DIFF)**
6. **⬆️ Puntos a Favor (PF)**
7. **💥 Índice de Ataque Relativo (IAR)**
8. **📊 Promedio por Partida (AVG)**
9. **🏅 Enfrentamiento Directo por ELO** (mayor ELO inicial, previo al torneo)

---

## 🎯 Aplicación por Tipo de Torneo

### **🏟️ Torneos Grandes (≥16 atletas):**
- ✅ Todos los índices aplicables
- ⚡ Sistema EFF completo con sus 4 componentes
- 🛡️ Métricas defensivas IED/ICD altamente confiables

### **🏠 Torneos Pequeños (<16 atletas):**
- 📈 Índices básicos: V, D, PF, PC, WR, AVG
- ⚠️ EFF requiere adaptaciones específicas
- 🔍 IED/ICD con interpretación limitada

### **🏆 Torneos Profesionales:**
- 🎯 Énfasis en EFF, ICV, IAR, IED, ICD
- ⚖️ Todos los criterios de desempate aplicables
- 📊 Métricas avanzadas para análisis táctico

---

> **💡 Recomendación:** Adapte el formato y agregue colores o iconos para destacar posiciones, mejores rendimientos o líderes en cada índice según el contexto del torneo.
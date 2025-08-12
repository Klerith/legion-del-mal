# Fórmula Buchholz Truncado para Torneos de Dominó Profesional (TBz)

## 🎯 Objetivo

El sistema Buchholz Truncado (TBz) mide la fuerza de los oponentes que enfrentó cada jugador durante un torneo. Evalúa la "dureza" de los rivales sumando las partidas ganadas (PG) de todos sus oponentes y excluyendo el puntaje más bajo para evitar distorsiones por rivales débiles.

---

## 📋 Definiciones

- **PG**: Partidas Ganadas acumuladas por un jugador en el torneo
- **N**: Número total de oponentes únicos diferentes que enfrentó el jugador
- **Lista_PG_Oponentes**: Lista con los PG de todos los oponentes únicos enfrentados
- **TBz**: Valor Buchholz Truncado calculado

---

## 🧮 Procedimiento de Cálculo

### Paso 1: Recopilar Datos de Oponentes

1. Identificar todos los oponentes únicos que enfrentó el jugador durante el torneo
2. Obtener el total de Partidas Ganadas (PG) de cada oponente único
3. Crear la `Lista_PG_Oponentes = [PG_op1, PG_op2, ..., PG_opN]`
4. Contar el número total de oponentes únicos: **N**

### Paso 2: Aplicar Fórmula según Casos

#### CASO A: N = 0
*(El jugador no enfrentó oponentes únicos)*

```
TBz = 0
```

#### CASO B: N = 1  
*(El jugador enfrentó a un solo oponente único)*

```
TBz = PG_oponente
```

#### CASO C: N ≥ 2
*(El jugador enfrentó a dos o más oponentes únicos)*

1. **Identificar el mínimo**: Encontrar el menor valor en `Lista_PG_Oponentes`
2. **Truncar**: Eliminar una instancia del valor mínimo de la lista
3. **Sumar**: Calcular la suma de los valores restantes

```
TBz = Σ(Lista_PG_Oponentes) - min(Lista_PG_Oponentes)
```

---

## 📊 Normalización (Opcional)

Para comparar jugadores de diferentes torneos o visualizar el desempeño relativo:

```
TBz_normalizado = ((TBz - TBz_min_torneo) / (TBz_max_torneo - TBz_min_torneo)) × 100
```

Donde:
- `TBz_min_torneo`: Menor TBz del torneo
- `TBz_max_torneo`: Mayor TBz del torneo

**Resultado**: Porcentaje entre 0% y 100%

---

## 🔢 Ejemplo Práctico

**Datos del torneo:**
- Jugador A enfrentó oponentes con PG: `[5, 5, 4, 4, 3, 3, 2]`
- Jugador B enfrentó oponentes con PG: `[5, 4, 4, 3, 3, 2, 1]`  
- Jugador C enfrentó oponentes con PG: `[4, 3, 2, 2, 1, 1, 0]`

**Cálculos:**

**Jugador A** (N = 7):
- Suma total: 5+5+4+4+3+3+2 = 26
- Mínimo: 2
- **TBz_A = 26 - 2 = 24**

**Jugador B** (N = 7):
- Suma total: 5+4+4+3+3+2+1 = 22
- Mínimo: 1  
- **TBz_B = 22 - 1 = 21**

**Jugador C** (N = 7):
- Suma total: 4+3+2+2+1+1+0 = 13
- Mínimo: 0
- **TBz_C = 13 - 0 = 13**

**Normalización:**
- TBz_min = 13, TBz_max = 24, Rango = 11

- A_normalizado = (24-13)/11 × 100 = **100%**
- B_normalizado = (21-13)/11 × 100 = **73%**
- C_normalizado = (13-13)/11 × 100 = **0%**

---

## ⚙️ Implementación Paso a Paso

### 1. Preparar Datos
```
Para cada jugador:
  - Crear lista vacía: oponentes_únicos = []
  - Revisar cada ronda jugada
  - Agregar PG de oponentes únicos a la lista
```

### 2. Ejecutar Cálculo
```
N = longitud(oponentes_únicos)

Si N = 0:
    TBz = 0
Si N = 1:
    TBz = oponentes_únicos[0]  
Si N ≥ 2:
    suma_total = suma(oponentes_únicos)
    valor_mínimo = mínimo(oponentes_únicos)
    TBz = suma_total - valor_mínimo
```

### 3. Normalizar
```
Para todo el torneo:
  - TBz_min = mínimo(todos_los_TBz)
  - TBz_max = máximo(todos_los_TBz)
  - rango = TBz_max - TBz_min
  
Para cada jugador:
  - TBz_norm = (TBz - TBz_min) / rango × 100
```

---

## 🎮 Consideraciones para Dominó Profesional

- En torneos con parejas rotativas, considerar a ambos oponentes de la pareja rival
- Los byes no cuentan como oponentes (no incrementan N)
- Todos los jugadores avanzan ronda por ronda simultáneamente
- No existen empates en dominó profesional (máximo una mano de desempate)
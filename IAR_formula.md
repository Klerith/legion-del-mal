# 🏆 Índice de Ataque Relativo (IAR)

## 📖 ¿Qué es el IAR?
El **Índice de Ataque Relativo (IAR)** mide la fuerza ofensiva de un jugador en comparación con el rendimiento promedio de sus pares, aplicando un ajuste para eliminar el efecto de los valores extremos (outliers) del torneo.

---

## 📐 Fórmula General

\[
IAR = PF_jugador / Media_Ataque_Ajustada
\]

- **PF<sub>jugador</sub>:** Puntos a favor del jugador.
- **Media_Ataque_Ajustada:** Promedio de puntos a favor de todos los jugadores, excluyendo el mayor (1°) y el menor (último). Si el último no jugó todas las rondas, se excluye también al penúltimo.

---

## ⚙️ ¿Cómo se calcula la Media Ajustada?
1. **Ordena** todos los jugadores por puntos a favor (PF), de mayor a menor.
2. **Excluye:**
   - ✅ El jugador con mayor PF (outlier superior).
   - ✅ El jugador con menor PF (outlier inferior), **si jugó todas las rondas**.
   - ❌ Si el último tuvo inasistencias, excluye también al penúltimo.
3. **Calcula:**
   \[
   Media_Ataque_Ajustada = (∑ PF_restantes) / (N - nº de excluidos)
   \]

---

## 💡 Ejemplos Prácticos

### 🔹 Caso 1: Último jugador activo
- **PF_torneo:** [500, 300, 250, 200, 150]
- **Excluidos:** 500 (1°) y 150 (último)
- **Media ajustada:** (300 + 250 + 200) / 3 = **250**
- **Ejemplo de jugador:** PF = 200  
  \[
  IAR = 200 / 250 = 0.80
  \]
  **Interpretación:** Ataque inferior al promedio ajustado.

---

### 🔹 Caso 2: Último jugador inactivo (abandono)
- **PF_torneo:** [500, 300, 250, 200, 50]
- **Excluidos:** 500 (1°), 50 (último), 200 (penúltimo)
- **Media ajustada:** (300 + 250) / 2 = **275**
- **Ejemplo de jugador:** PF = 250  
  \[
  IAR = 250 / 275 ≈ 0.91
  \]
  **Interpretación:** El IAR no se distorsiona por el abandono.

---

## 🧑‍💻 Código de Referencia (Python)

```python
def calcular_IAR(PF_jugador, lista_PF_todos, inasistencias_ultimo=False):
    lista_ordenada = sorted(lista_PF_todos, reverse=True)
    N = len(lista_ordenada)
    if N <= 2:
        return PF_jugador / (sum(lista_ordenada) / N) if N > 0 else 0
    if not inasistencias_ultimo:
        suma_ajustada = sum(lista_ordenada[1:-1])
        media_ajustada = suma_ajustada / (N - 2)
    else:
        suma_ajustada = sum(lista_ordenada[1:-2])
        media_ajustada = suma_ajustada / (N - 3)
    return round(PF_jugador / media_ajustada, 2)
```

---

## 📋 Parámetros

| Parámetro           | Tipo         | Descripción                                               |
|---------------------|--------------|-----------------------------------------------------------|
| PF_jugador          | float        | Puntos a favor del jugador a evaluar                      |
| lista_PF_todos      | list[float]  | Lista de PF de todos los jugadores                        |
| inasistencias_ultimo| bool         | Si True, también excluye al penúltimo                     |

---

## 📊 Interpretación

- **IAR > 1:** Ataque superior al promedio ajustado del torneo.
- **IAR = 1:** Ataque igual al promedio ajustado.
- **IAR < 1:** Ataque inferior al promedio ajustado.

---

## 📈 Mostrar como Diferencia Porcentual del Promedio (Diff. Prom. Ataque %)

**Cálculo:**  
\[
Diff. Prom. Ataque % = (IAR_calculado - 1) * 100
\]

**Columna sugerida:**  
- `Dif. AvC (%)`  
- `+/- Prom. Ofensivo (%)`  
- `Desv. Ofen. (%)`

**Valor ejemplo:**  
- Si IAR = 0.80 ⇒ **-20.0%** (o **-20%**):  
  > “Fue un 20% peor que el promedio.”
- Si IAR = 1.35 ⇒ **+35%**:  
  > “Un 35% por encima del promedio.”
- **El 0% es la línea base** (igual al promedio ofensivo ajustado).

---

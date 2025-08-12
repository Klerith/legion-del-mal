# **Algoritmo para Emparejamiento en Torneos de Dominó Profesional con Sistema Suizo en Parejas Rotativas**

---

## **Contexto**

En el sistema de dominó profesional con **SvelteKit** y **Svelte 5** que estoy desarrollando sobre gestión de torneos y manejo de rankings, la modalidad más utilizada es el **sistema suizo**. Los torneos a nivel internacional con **ELO** se juegan siempre en **parejas rotativas**, es decir, la clasificación es individual pero en cada ronda se empareja con un compañero nuevo, lo mismo sucede con los rivales.

Necesito que me ayudes a desarrollar el algoritmo, pero no en código de programación todavía, ya que la idea es entenderlo primero antes de plasmarlo en código, sobre todo porque el sistema será auditado y debe conservar su naturaleza en lenguaje humano para que los auditores de la federación puedan aprobarlo. 

### **Reglas Fundamentales**

Es vital subrayar que **en dominó profesional no existen empates**. Cada partida arroja obligatoriamente un ganador y un perdedor. Una partida equivale a una ronda y se establece un puntaje objetivo que, a nivel internacional y profesional, suelen ser **200 puntos**. La pareja que logre alcanzar o incluso superar dicha cifra será la pareja ganadora.

**Importante:** Existe un límite de tiempo por ronda. Si una mesa demora más del tiempo estipulado, gana quien tenga más puntos en ese preciso instante, indistintamente de si no llegaron a alcanzar el puntaje objetivo. En caso de empate, se juega una sola mano adicional para poder desempatar.

### **Criterios de Clasificación**

A lo largo de todo el torneo, el **número total de victorias** actúa como criterio primario e inapelable para ordenar la lista descendente que el algoritmo recibe en cada ronda. Los índices auxiliares calculados por la tabla de clasificación (**WR2, EFF** y otros) solo se emplean como desempate **secundario** si dos atletas acumulan exactamente la misma cantidad de victorias.

### **Alcance del Algoritmo**

En referencia a los índices que influyen como criterio de desempate y demás índices, se debe hacer énfasis en que el **algoritmo suizo no debe evaluar dichos criterios**, ya que no es su función. La función real que queremos es la de gestionar emparejamientos y enfrentamientos según la esencia de la modalidad en sí.

En teoría, desde la tabla de clasificación el algoritmo recibe ronda tras ronda la lista ya ordenada con sus posiciones respectivas.

### **Escalabilidad del Torneo**

En todo torneo élite de esta categoría, la cantidad ideal de participantes suele ser **28 atletas como mínimo**. A continuación, crearemos un esquema sobre cómo se jugaría ronda por ronda, con la prioridad de que el algoritmo o esquema sea escalable para conservar el mismo patrón incluso con una mayor participación de atletas.

---

## **Notas Importantes**

### Sobre el Análisis de Emparejamientos

Para evitar la necesidad de reconstruir constantemente secuencias completas de emparejamientos y enfrentamientos, es fundamental llevar un registro progresivo de los mismos. Este enfoque previene conclusiones precipitadas que podrían llevar a interpretaciones incorrectas o "alucinaciones" en el análisis de los emparejamientos.

### Glosario de Términos Clave

- **Atleta**: Jugador individual (ej. A1, B2)
- **Pareja**: Equipo Temporal compuesto por dos atletas unidos por un guion "-" que compiten juntos en una ronda específica (ej. A1-C1). Este emparejamiento es temporal y puede cambiar en rondas posteriores.
- **Mesa**: Conjunto de cuatro atletas (dos parejas) que compiten entre sí, representado con el término "vs" como conductor (ej. A1-C1 vs M2-G1)
- **Ronda**: Serie de partidas que se juegan simultáneamente en un momento dado del torneo
- **Bloque**: Grupo de atletas con el mismo número de victorias en un momento dado del torneo
- **Plegado**: Acción de dividir un bloque de atletas en dos mitades iguales después del emparejamiento, donde la mitad superior se enfrenta a la mitad inferior de manera paralela. Este proceso garantiza que los atletas con mejor rendimiento se enfrenten entre sí.

---

## **Primera Ronda**

### **Configuración Inicial**

El administrador o anfitrión del torneo decidirá si la primera ronda se juega ordenando por **ELO** o aleatoriamente. En este algoritmo en específico, no tomaremos en cuenta el **ELO** aún. Partiremos de la base de que todos los participantes tienen un nivel similar y, por lo tanto, en la primera ronda se emparejarán compañeros y rivales de manera aleatoria.

### **Lista de Participantes**

Recibimos desde la tabla de clasificación la siguiente lista desordenada de atletas según su inscripción:

```
M2, K1, D2, F1, G1, I2, E1, N2, C2, L1, B1, J2, H1, K2, B2, D1, A2, E2, L2, F2, I1, G2, C1, N1, J1, A1, M1, H2
```

### **Proceso de Ordenamiento Aleatorio**

Aplicamos un algoritmo que posicione a los atletas al azar sin ningún criterio en particular. Supongamos que el listado queda de la siguiente manera:

```
A1, A2, C1, C2, E1, E2, G1, G2, I1, I2, K1, K2, M1, M2, B1, B2, D1, D2, F1, F2, H1, H2, J1, J2, L1, L2, N1, N2
```

Al cual denominaremos bloque inicial, el cual seria el equivalente a "bloque 0".

> **Nota:** Este orden aleatorio solo ocurre en la primera ronda.

### **Aplicación de las Reglas de Emparejamiento**

Aplicamos la **Regla 1*** (descrita más adelante) para emparejar compañeros y plegamos el bloque para confrontar paralelamente ambas mitades, respetando la **Regla 2*** (descrita más adelante).

**Mesas resultantes Ronda 1:**

| Mesa | Partida |
|------|------------|
|  1   | **A1 - A2** vs **B1 - B2** |
|  2   | **C1 - C2** vs **D1 - D2** |
|  3   | **E1 - E2** vs **F1 - F2** |
|  4   | **G1 - G2** vs **H1 - H2** |
|  5   | **I1 - I2** vs **J1 - J2** |
|  6   | **K1 - K2** vs **L1 - L2** |
|  7   | **M1 - M2** vs **N1 - N2** |

### **Resultados de la Ronda 1**

Los ganadores de la primera ronda fueron:

| Parejas | 
|--------|
| A1 - A2 |
| C1 - C2 |
| E1 - E2 |
| G1 - G2 |
| I1 - I2 |
| K1 - K2 |
| M1 - M2 |

---

## **Criterios de Desempate y Ordenamiento**

### **Proceso de Ordenamiento Inicial**

Después de que la tabla de clasificación aplica criterios de desempate con índices discriminatorios secundarios, el algoritmo vuelve a recibir la lista completa ordenada en forma descendente con todos los atletas según su eficiencia y desempeño ronda tras ronda. Esto es necesario porque pueden existir atletas empatados en número de victorias, pero con diferentes posiciones debido a los puntajes obtenidos (puntos a favor y en contra por partida).

### **Lista Ordenada Recibida**

El algoritmo recibe la siguiente lista ya ordenada:

```
A1, A2, C1, C2, M1, M2, G1, G2, I1, I2, E1, E2, K1, K2, L1, L2, F1, F2, J1, J2, H1, H2, N1, N2, D1, D2, B1, B2
```

### **División en Bloques por Número de Victorias**

El algoritmo divide la lista en bloques según el número de victorias:

- **Bloque 1 (1 victoria):**
  ```
  A1, A2, C1, C2, M1, M2, G1, G2, I1, I2, E1, E2, K1, K2
  ```
  
- **Bloque 0 (0 victorias):**
  ```
  L1, L2, F1, F2, J1, J2, H1, H2, N1, N2, D1, D2, B1, B2
  ```

### **Consideraciones sobre Empates**

Es importante destacar que:

- **A1** y **A2** tienen los mismos valores ya que fueron pareja y han jugado una sola ronda.
- Esta misma lógica aplica para los demás pares (C1-C2, M1-M2, etc.).
- **A1** y **A2** están empatados en la primera posición del primer bloque.
- **C1** y **C2** ocupan la segunda posición, y así sucesivamente.

> **Nota:** Este tipo de empates son comunes después de la ronda 1 y antes de la ronda 2. No es común que dos atletas mantengan los mismos valores después de la ronda 2, gracias a los índices de desempate en la tabla de clasificación.

### **Verificación de Mesas Completas**

Antes de proceder con el bloque de atletas con más victorias (en este caso, 1 victoria), el algoritmo debe verificar si el bloque generará mesas incompletas. Por ejemplo:

- Si dividimos el bloque en cuestión, en este caso 14 atletas entre 4 (para formar mesas de 4 jugadores), obtenemos 3.5 mesas, lo cual no es un número entero.
- Necesitamos un número par de atletas para cumplir con el requisito de 4 jugadores por mesa.

### **Ajuste de Bloques**

Al detectar esta incongruencia, el algoritmo debe:

1. **Identificar** a los 2 atletas mejor posicionados del bloque contiguo inmediato (en este caso, el bloque con 0 victorias): **L1** y **L2**.

2. **Verificar** si estos atletas fueron compañeros de los últimos atletas del bloque 1 en la ronda anterior:
   - ¿**L1** fue compañero de **K1** o **K2**? → No
   - ¿**L2** fue compañero de **K1** o **K2**? → No

3. **Integrar** a **L1** y **L2** al bloque superior, ubicándolos en las últimas posiciones.

> **Caso Especial:** Si hubiera coincidencias, el algoritmo continuaría buscando candidatos válidos en el bloque 0 hasta encontrar una combinación que no viole la Regla 1.

### **Bloque Superior Ajustado**

Finalmente, el bloque superior quedaría así:

```
A1, A2, C1, C2, M1, M2, G1, G2, I1, I2, E1, E2, K1, K2, L1, L2
```

### **Consideraciones Finales**

- Este ajuste garantiza que el número total de atletas en el bloque sea par, permitiendo la formación de mesas completas de 4 jugadores.
- Estos escenarios son excepcionales y ocurren principalmente cuando la división del número de atletas entre 4 no da como resultado un número entero.
- Cuando la división es par, las mesas se completan normalmente sin necesidad de ajustes.

### **Proceso de Emparejamiento**

En la ronda 2, el algoritmo comienza a emparejar compañeros siguiendo estos pasos:

1. Si el contiguo inmediato infringe la **Regla 1**, se avanza al siguiente puesto hasta encontrar un candidato válido.
2. Una vez formadas todas las parejas, haremos un **recorrido del bloque** para contabilizar la cantidad de parejas y así cerciorarnos de que esta vez el bloque sí sea par, de este modo podremos dividir el bloque en partes iguales.
3. Cada bloque se **pliega** para crear los enfrentamientos:
   - La mitad superior del bloque se enfrenta ordenadamente contra la mitad inferior.
   - La pareja en primer lugar de la mitad superior enfrenta a la pareja en primer lugar de la mitad inferior.
   - El segundo contra el segundo, y así sucesivamente, manteniendo el orden jerárquico.

### **Ejemplo de Emparejamiento**

Aplicando la **Regla 1** y manteniendo las posiciones jerárquicas, se forman las siguientes parejas:

```
A1 - C1, A2 - C2, M1 - G1, M2 - G2, I1 - E1, I2 - E2, K1 - L1, K2 - L2
```

---

## **Conformación de Sistema de Plegado**

### **División del Bloque 1**

El bloque 1 (denominado temporalmente como "1" por contener a los jugadores con 1 victoria) se divide en dos subgrupos: la mitad superior y la mitad inferior.

#### **Mitad Superior**
```
A1 - C1, A2 - C2, M1 - G1, M2 - G2
```

#### **Mitad Inferior**
```
I1 - E1, I2 - E2, K1 - L1, K2 - L2
```

### **Creación de Mesas**

El algoritmo cierra los pliegues paralelamente, creando así las mesas con sus respectivos enfrentamientos:

| Partidas |
|----------|
| **A1 – C1** vs **I1 – E1** |
| **A2 – C2** vs **I2 – E2** |
| **M1 – G1** vs **K1 – L1** |
| **M2 – G2** vs **K2 – L2** |

### **Explicación del Proceso**

1. **Ordenamiento Jerárquico**: Las parejas se ordenan según su posición en la clasificación general.
2. **División en Mitades**: Se divide el bloque en dos mitades iguales.
3. **Emparejamiento Cruzado**: La primera pareja de la mitad superior se enfrenta a la primera de la mitad inferior, y así sucesivamente.
4. **Asignación de Mesas**: Se asignan números de mesa de forma ascendente según el rendimiento de las parejas.

---

## **Emparejamiento del Bloque Inferior en Ronda 2**

### **Proceso de Emparejamiento**

Aplicamos la misma dinámica y los mismos criterios para encontrar compañeros, rivales y conformar las mesas faltantes.

#### **Lista de Atletas del Bloque 0**
```
F1, F2, J1, J2, H1, H2, N1, N2, D1, D2, B1, B2
```

#### **Formación de Parejas**
Siguiendo la **Regla 1**, se forman las siguientes parejas:
```
F1 - J1, F2 - J2, H1 - N1, H2 - N2, D1 - B1, D2 - B2
```

#### **División en Mitades**

- **Mitad Superior:**
  ```
  F1 - J1, F2 - J2, H1 - N1
  ```

- **Mitad Inferior:**
  ```
  H2 - N2, D1 - B1, D2 - B2
  ```

### **Creación de Mesas**

Respetando la Regla 2 El algoritmo cierra los pliegues paralelamente, creando así las siguientes mesas con sus respectivos enfrentamientos:

| Partidas |
|----------|
| **F1 – J1** vs **H2 – N2** |
| **F2 – J2** vs **D1 – B1** |
| **H1 – N1** vs **D2 – B2** |

### **Consideraciones**

- Se mantiene el orden jerárquico para la futura asignación de mesas.
- Se respeta la **Regla 1** para evitar emparejamientos recientes.
- Se respeta la **Regla 2** para evitar rivales recientes.

---

## **Enumeración de Mesas**

### **Asignación de Números de Mesa**

Una vez conformados todos los enfrentamientos, procedemos a enumerar las mesas para la Ronda 2. La numeración sigue un orden ascendente según el rendimiento de las parejas, donde la **Mesa 1** siempre corresponde al enfrentamiento con los atletas de mejor desempeño.

### **Normativa de Asignación**

- **Criterio Principal:** Los atletas con mejor desempeño ocupan las mesas con números más bajos.
- **Jerarquía:** La numeración refleja el orden jerárquico de los equipos según su rendimiento acumulado.
- **Universalidad:** Este criterio es estándar en torneos profesionales de dominó a nivel mundial.

### **Mesas de la Ronda 2**

| Mesa | Partida |
|------|---------|
| **1** | **A1 – C1** vs **I1 – E1** |
| **2** | **A2 – C2** vs **I2 – E2** |
| **3** | **M1 – G1** vs **K1 – L1** |
| **4** | **M2 – G2** vs **K2 – L2** |
| **5** | **F1 – J1** vs **H2 – N2** |
| **6** | **F2 – J2** vs **D1 – B1** |
| **7** | **H1 – N1** vs **D2 – B2** |

### **Consideraciones**

- La numeración es crucial para el desarrollo del torneo, ya que las mesas con números más bajos suelen recibir mayor atención.
- Los árbitros más experimentados suelen ser asignados a las mesas con números más bajos.
- Este orden se mantendrá en rondas posteriores, ajustándose según el rendimiento de los participantes.

---

## **Reglas Obligatorias del Torneo**

### **Regla 1: Restricción de Reemparejamiento de Compañeros**

#### **Descripción**
Un atleta no puede volver a formar pareja con un excompañero hasta que hayan transcurrido al menos **2 rondas completas** desde su último emparejamiento.

#### **Aplicación Práctica**
- **Período de Enfriamiento:** 2 rondas completas
- **Flexibilidad:** En torneos pequeños, se puede ser flexible considerando el número limitado de participantes.
- **Fórmula de Cálculo:**
  ```
  Ronda de Nuevo Emparejamiento = Ronda de Último Emparejamiento + 3
  ```

#### **Ejemplo**
En un torneo de 9 rondas:
- Si **A1** y **A2** fueron pareja en la **Ronda 1**
- **No podrán** volver a ser pareja en las rondas 2 y 3
- **Podrán** volver a ser pareja a partir de la **Ronda 4**

### **Regla 2: Restricción de Reencuentros entre Rivales**

#### **Descripción**
Un atleta no puede enfrentarse nuevamente a los mismos rivales hasta que hayan transcurrido al menos **1 ronda completa** desde su último encuentro.

#### **Aplicación Práctica**
- **Período de Enfriamiento:** 1 ronda completa
- **Recomendación:** Aunque técnicamente podrían volver a enfrentarse después de 2 rondas, lo ideal es evitarlo cuando sea posible.
- **Fórmula de Cálculo:**
  ```
  Ronda de Nuevo Enfrentamiento = Ronda del Último Enfrentamiento + 2
  ```

#### **Ejemplo**
En un torneo de 9 rondas:
- Si **A1** se enfrentó a **B1** y **B2** en la **Ronda 1**
- **No podrá** volver a enfrentarse a cualquiera de ellos en la **Ronda 2**
- **Podría** volver a enfrentárseles a partir de la **Ronda 3** (aunque se recomienda evitarlo si es posible)

### **Consideraciones Generales**

| Aspecto | Regla 1 (Compañeros) | Regla 2 (Rivales) |
|---------|----------------------|-------------------|
| **Período de Enfriamiento** | 2 rondas | 1 rondas |
| **Flexibilidad** | Alta (especialmente en torneos pequeños) | Media (preferible evitar) |
| **Afecta a** | Parejas del mismo equipo | Equipos rivales |
| **Objetivo** | Promover diversidad de alianzas | Garantizar variedad de oponentes |

### **Excepciones y Flexibilidad**

1. **Torneos Pequeños:**
   - En torneos con pocos participantes, las reglas pueden relajarse ligeramente para permitir más combinaciones posibles.
   
2. **Fases Finales:**
   - En rondas avanzadas, especialmente en la final, estas reglas pueden flexibilizarse para priorizar los enfrentamientos más justos y emocionantes.

3. **Relajación progresiva**
   - Leer propuesta más adelante y también leer mandamientos excepcionales.


# **Análisis de Ronda 3**

## **Resumen de Resultados de la Ronda 2**

Los ganadores de la segunda ronda fueron los siguientes equipos:

| Parejas | 
|--------|
| A1 – C1 |
| A2 – C2 |
| M1 – G1 |
| M2 – G2 |
| F1 – J1 |
| F2 – J2 |
| H1 – N1 |

## **Lista Ordenada para la Ronda 3**

El algoritmo recibe la siguiente lista completa ordenada según el rendimiento:

```
A2, C2, A1, C1, M2, G2, G1, M1, F1, J1, F2, J2, K1, K2, H1, N1, E2, I2, E1, I1, L1, L2, D2, B2, D1, B1, H2, N2
```
A pesar de que no se refleja, cabe recordar que desde la tabla de clasificación el algoritmo  o recibe tanto la posición de los atletas como su número de victorias.

## **Consideraciones Generales**

A partir de la **Ronda 3**, el algoritmo sigue un patrón consistente que se mantendrá hasta el final del torneo. Las rondas 1 y 2 tuvieron reglas especiales que ya no aplican.

## **División en Bloques por Número de Victorias**

El algoritmo analiza y divide a los atletas en bloques según su número de victorias:

| Bloque | Victorias | Cantidad de Atletas | Atletas |
|--------|-----------|---------------------|---------|
| **Bloque 2** | 2 victorias | 8 | A2, C2, A1, C1, M2, G2, G1, M1 |
| **Bloque 1** | 1 victoria | 12 | F1, J1, F2, J2, K1, K2, H1, N1, E2, I2, E1, I1 |
| **Bloque 0** | 0 victorias | 8 | L1, L2, D2, B2, D1, B1, H2, N2 |

---

# **Procesamiento del Bloque 2 (2 Victorias)**

## **1. Verificación de División**

- **Cálculo:** 8 atletas ÷ 4 = 2 mesas exactas
- **Resultado:** La división es exacta (número par), por lo que no es necesario traer atletas del bloque inferior.

## **2. Proceso de Emparejamiento**

### **Aplicación de la Regla 1**
El algoritmo busca formar parejas verificando que no hayan sido compañeros en las 2 rondas anteriores.

#### **Intentos Recursivos**

1. **Emparejamiento de A2**
   - Posibles compañeros: C2, A1, C1, M2, G2, G1, M1
   - Verificación:
     - A2 con C2: ❌ Fueron compañeros en Ronda 2
     - A2 con A1: ❌ Fueron compañeros en Ronda 1
     - A2 con C1: ✓ No han sido compañeros
   - **Pareja formada:** A2 - C1

2. **Emparejamiento de C2**
   - Posibles compañeros restantes: A1, M2, G2, G1, M1
   - Verificación:
     - C2 con A1: ✓ No han sido compañeros
   - **Pareja formada:** C2 - A1

3. **Emparejamiento de M2**
   - Posibles compañeros restantes: G2, G1, M1
   - Verificación:
     - M2 con G2: ❌ Fueron compañeros en Ronda 2
     - M2 con G1: ✓ No han sido compañeros
   - **Pareja formada:** M2 - G1

4. **Emparejamiento de G2 y M1**
   - Verificación:
     - G2 con M1: ✓ No han sido compañeros
   - **Pareja formada:** G2 - M1


## Escenario Ficticio e Hipotético 
  Supongamos que en el punto 4 del proceso de emparejamiento
  **Emparejamiento de los atletas ultimos atletas faltantes G2 y M1**
   - Verificación: 
     - G2 con M1: ❌ Fueron compañeros en Ronda 2
   - **Problema detectado:** No se puede formar esta pareja

### **Solución al problema detectado: Reajuste de Emparejamiento**

El algoritmo debe retroceder hasta la penultima pareja formada (M2 - G1) y probar un cruce de combinaciones diferentes hasta encontrar una combinación valida.

1. **Reemparejamiento de M2**
   - Posibles compañeros: G2, M1, G1 
   - Verificación:
     - M2 con G2: ✓ No han sido compañeros
   - **Nueva pareja formada:** M2 - G2

2. **Reemparejamiento de G1 y M1**
   - Verificación:
     - G1 con M1: ✓ No han sido compañeros
   - **Nueva pareja formada:** G1 - M1

> **Importante:** El algoritmo debe tener presente y diseñar esta contingencia para cuando se detecten ese tipo de problemas.

### **Parejas Finales del Bloque 2**

1. **A2 - C1**
2. **C2 - A1**
3. **M2 - G1**
4. **G2 - M1**

## **3. Sistema de Plegado**

### **División en Mitades**

| Mitad | Parejas |
|-------|---------|
| **Superior** | A2 - C1, C2 - A1 |
| **Inferior** | M2 - G1, G2 - M1 |

## **4. Validación de Enfrentamientos - Regla 2**

Antes de confirmar los enfrentamientos, el algoritmo debe verificar que ningún atleta se enfrente a rivales que ya enfrentó en la ronda anterior o segun la ventana que corresponda.

### **Enfrentamientos Propuestos**

1. **A2 - C1** vs **M2 - G1**
2. **C2 - A1** vs **G2 - M1**

### **Verificación de la Regla 2**

- **A2 - C1 vs M2 - G1**
  - A2 no se enfrentó a M2 en Ronda 2 ✓
  - A2 no se enfrentó a G1 en Ronda 2 ✓
  - C1 no se enfrentó a M2 en Ronda 2 ✓
  - C1 no se enfrentó a G1 en Ronda 2 ✓
  - **Solución:** No requiere ajuste

- **C2 - A1 vs G2 - M1**
  - No hay enfrentamientos previos entre estos equipos ✓

  ### **Enfrentamientos Finales del Bloque 2**

| Partidas |
|----------|
| **A2 - C1** vs **M2 - G1** |
| **C2 - A1** vs **G2 - M1** |

## **Ajuste Necesario solo en casos que se requieran correcciones por enfrentamientos repetidos**

El algoritmo debe intercambiar los enfrentamientos con la pareja contigua del pliegue opuesto para evitar la violación de la **Regla 2**:

  ### **Ejemplo:** 
  - **A2 - C1 vs M2 - G1**
   - A2 si se enfrentó a M2 en Ronda 2 ❌ (simulación hipotética)
  - **Problema detectado:** Se requiere ajuste

   Verificar entonces → **A2 - C1** vs **G2 - M1**

  Si el enfrentamiento sigue siendo repetitivo y se acaban las parejas del pliegue opuesto entonces confrontar de manera ascendente con la última pareja de su propio pliegue, hasta encontrar rivales válidos. Ejemplo: **¿ A2 - C1 vs C2 - A1 ?**

Cuando no existan conflictos, se procesan los enfrentamientos finales del bloque 2.

---

### Procesamiento Resumido del Bloque 1 (1 victoria)
Atletas: F1, J1, F2, J2, K1, K2, H1, N1, E2, I2, E1, I1  
Parejas (Regla 1):  
- **F1 – J2**  
- **J1 – F2**  
- **K1 – H1**  
- **K2 – N1**  
- **E2 – I1**  
- **I2 – E1**

Enfrentamientos (Sistema de plegado, Regla 2):  
- **F1 – J2 vs K2 – N1**  
- **J1 – F2 vs E2 – I1**  
- **K1 – H1 vs I2 – E1**

### Procesamiento Resumido del Bloque 0 (0 victorias)
Atletas: L1, L2, D2, B2, D1, B1, H2, N2  
Parejas (Regla 1):  
- **L1 – D2**  
- **L2 – B2**  
- **D1 – H2**  
- **B1 – N2**

Enfrentamientos (Sistema de plegado, Regla 2):  
- **L1 – D2 vs D1 – H2**  
- **L2 – B2 vs B1 – N2**

### Mesas Definitivas – Ronda 3

| Mesa | Partida |
|------|---------|
| **1** | **A2 – C1** vs **M2 – G1** |
| **2** | **C2 – A1** vs **G2 – M1** |
| **3** | **F1 – J2** vs **K2 – N1** |
| **4** | **J1 – F2** vs **E2 – I1** |
| **5** | **K1 – H1** vs **I2 – E1** |
| **6** | **L1 – D2** vs **D1 – H2** |
| **7** | **L2 – B2** vs **B1 – N2** |

---

# Consideraciones sobre la Paridad de Bloques

## Causas de Mesas Incompletas en Bloques

Es fundamental comprender que **un torneo puede tener un número total de participantes válido para formar mesas completas**, pero durante el desarrollo del torneo, **la división natural en bloques por número de victorias puede generar cantidades impares** que requieren protocolos de ajuste.

### Causas Principales

1. **División Natural del Sistema Suizo (Situación Normal)**
   - Los atletas se distribuyen en bloques según sus victorias
   - Esta distribución orgánica frecuentemente genera números impares por bloque
   - **Es completamente normal y esperado** en el funcionamiento del sistema

   **Ejemplo Ilustrativo:**
   - **28 atletas** = 7 mesas completas (28 ÷ 4 = 7)
   - Otro ejemplo pero con **44 atletas** = 11 mesas completas (44 ÷ 4 = 11)

   **Sin embargo, durante las rondas intermedias:**
   - Un bloque puede tener **14 atletas** (mesas incompletas) → Requiere ajuste para el plegado y así completar mesas reglamentarias de 4 atletas
   - Un bloque puede tener **22 atletas** (mesas incompletas) → Necesita protocolo de redistribución para cumplir con la exigencia de mesas reglamentarias de 4 atletas

2. **Abandonos**
   - Atletas que deciden retirarse del torneo por diversas razones
   - Impacto directo en la paridad de los bloques

3. **Expulsiones por Violaciones Reglamentarias**
   - Atletas sancionados por incumplimiento de las reglas
   - Similar al abandono en términos de su efecto en la paridad

4. **Inasistencias Imprevistas**
   - Atletas que no se presentan a una ronda específica
   - Afectan temporalmente la composición de los bloques

5. **Reducción Progresiva en Rondas Avanzadas**
   - En fases finales del torneo, la distribución de victorias puede resultar en un bloque superior con un solo atleta
   - **Escenario crítico:** En rondas 5-6 o posteriores, el bloque de máxima puntuación puede quedar con un único competidor
   - **Implicación técnica:** Requiere protocolo de promoción para integrar al atleta solitario en una mesa competitiva
   - **Consideración estratégica:** Este fenómeno es intrínseco a la dinámica de clasificación de rezagados en torneos suizos

   **Ejemplo de flujo:**
   - Ronda 5: Bloque superior con 2 atletas → Se enfrentan en la ronda 6
   - Ronda 6: El perdedor desciende, el ganador queda como único en el bloque superior
   - Ronda 7: Protocolo especial para promover atletas e integrarlos en el bloque con el competidor solitario

## Impacto en el Algoritmo

Cuando se detecta un número impar en cualquier bloque:
- **El sistema de plegado no puede ejecutarse** correctamente (no se pueden formar mitades iguales)
- **Se activa el protocolo de ajuste de bloques**
- **Se implementa el sistema de BYE** cuando corresponde según el MOD 4

## Manejo Automático

El algoritmo debe incorporar una verificación sistemática antes de cada proceso de plegado para detectar estas situaciones y aplicar los protocolos correspondientes.

> **Nota Importante:** Esta verificación es obligatoria en cada ronda. Incluso en torneos sin abandonos ni inasistencias, la distribución natural de atletas por bloques de victorias frecuentemente genera números impares que requieren ajustes para el correcto funcionamiento del algoritmo.

---

## Algoritmo Generalizado para Rondas 3 en Adelante

### Pasos del Algoritmo para rondas posteriores:

1. **Recepción de Lista Ordenada:** El algoritmo recibe la lista completa ordenada descendentemente por número de victorias y criterios de desempate secundarios.

2. **Separación en Bloques:** Divide automáticamente la lista en bloques según el número de victorias de cada atleta.

3. **Procesamiento por Bloque (de mayor a menor victorias):**

   a) **Verificación de División:** Si el número de atletas en el bloque dividido entre 4 no da un número par:
   - Trae la mínima cantidad necesaria de atletas del bloque inmediato inferior (por lo general suelen ser 2 atletas)
   - Verifica que no violen la Regla 1 con los 2 últimos del bloque superior
   - Si hay violación, busca los siguientes candidatos válidos en bloque inferior contiguo

   b) **Emparejamiento:** Para cada atleta en orden jerárquico:
   - Busca el primer compañero disponible que no viole la Regla 1
   - Si no encuentra válido en posiciones inmediatas, avanza secuencialmente

   c) **Sistema de Plegado:**
   - Divide las parejas en mitad superior e inferior
   - Enfrenta paralelamente: 1° superior vs 1° inferior, 2° superior vs 2° inferior, etc.

4. **Verificación de Regla 2:** Antes de confirmar enfrentamientos, verificar que ninguna pareja haya enfrentado rivales de la ronda anterior o numero de rondas segun corresponda ventana por categoria.

5. **Enumeración de Mesas:** Numera ascendentemente comenzando por el atleta líder del torneo.

6. **Gestión de Enfrentamientos:**
   - **Almacenamiento Temporal:** Todos los enfrentamientos generados se guardan en una lista temporal
   - **Recolección:** Se recopilan los enfrentamientos de todos los bloques
   - **Asignación Final:** Se asignan números de mesa siguiendo el orden jerárquico de los líderes, ejemplo:
     - **Mesa 1:** Líder actual del torneo
     - **Mesas siguientes:** Siguen el orden de clasificación de los atletas disponibles de tal modo que si el #2, #3 y #5 ya están en mesas superiores, la siguiente mesa la lidera el #4

---

## Escenario Especial: Bloque Superior con Exactamente 2 Atletas

### REGLA DEL DUELO DE LÍDERES

Cuando el algoritmo detecta que el bloque superior contiene exactamente 2 atletas (los líderes absolutos del torneo), se activa un protocolo especial denominado "Duelo de Líderes". Este escenario típicamente ocurre en rondas intermedias o avanzadas (ronda 5, 6 o posteriores) cuando la competencia se ha polarizado y dos atletas se han destacado claramente del resto.

Protocolo de Ejecución:

1. Identificación del Escenario:

  - El algoritmo detecta que el bloque superior tiene exactamente 2 atletas
  - Estos atletas son los líderes absolutos del torneo con el mayor número de victorias

2. Prohibición de Emparejamiento:

  - Los 2 líderes NO pueden ser compañeros bajo ninguna circunstancia
  - Deben enfrentarse obligatoriamente como rivales en bandos opuestos
  - Esta regla prevalece sobre cualquier otra consideración del algoritmo

3. Búsqueda de Compañeros Válidos:

  - El algoritmo debe traer exactamente 2 atletas del bloque inmediato inferior
  - Estos atletas se convertirán en los compañeros de cada líder
  - Verificación Regla 1: Los candidatos no pueden haber sido compañeros de ninguno de los 2 líderes en las rondas anteriores según la ventana establecida
  - Compañero A y Compañero B NO deben haberse enfrentado en ronda anterior.
  - Si los primeros 2 candidatos violan la Regla 1, el algoritmo debe continuar buscando secuencialmente hasta encontrar 2 candidatos válidos, en caso de ser válidos verificar que no violen la Regla 2.
  
4. Configuración de Mesa:

  - Líder 1 + Compañero A vs Líder 2 + Compañero B
  - Esta mesa se convierte automáticamente en la Mesa 1 del torneo (mesa principal)
  - Representa el enfrentamiento más relevante de la ronda


5. Impacto en la Clasificación:

  - El resultado de esta mesa define quién mantiene o toma el liderazgo absoluto
  - Es un momento decisivo en la evolución del torneo

Ejemplo Práctico:
Situación: Ronda 6, Bloque Superior con 2 atletas (5 victorias c/u)

Líderes: A2, C1
Bloque Inferior: E1, I2, D1, D2, E2... (4 victorias c/u)

Proceso:

A2 y C1 NO pueden ser compañeros
Buscar compañeros: ¿A2 fue compañero de E1 en ventana? ¿C1 fue compañero de I2 en ventana? ¿E1 fue rival de I2 en ventana?
Si válidos → A2-E1 vs C1-I2 (Mesa 1) 
Si inválidos → continuar con las combinaciones:
  - E1, D1
  - E1, D2
  - I2, D1
  - I2, D2
  - D1, D2 
  - D1, E2 y así sucesivamente...

Resultado: El Duelo de Líderes garantiza que los mejores atletas se enfrenten directamente, manteniendo la competitividad y el espíritu del sistema suizo profesional.

---

## Escenario ELO para primera ronda:

**Caso Excepcional:** Cuando en primera ronda el administrador del torneo no decide comenzar la ronda en modo aleatorio sino que decide que los jugadores se ordenen por ELO, entonces el algoritmo recibe la lista completa de jugadores ordenada de manera descendente segun su ELO, posicionados desde el ELO mas alto hasta el ELO mas bajo. 

En una situación así el algoritmo debe ser capaz de identificar la modalidad en cuestión y buscar como compañero al atleta más contiguo (de nivel similar) para conformar parejas antes de iniciar ronda 1.

Supongamos recibimos el siguiente listado:

**A1, A2, B1, B2, C1, C2, D1, D2, E1, E2, F1, F2, G1, G2, H1, H2, I1, I2, J1, J2, K1, K2, L1, L2, M1, M2, N1, N2**

Realizamos el pareo:

**A1 - A2, B1 - B2, C1 - C2, D1 - D2, E1 - E2, F1 - F2, G1 - G2, H1 - H2, I1 - I2, J1 - J2, K1 - K2, L1 - L2, M1 - M2, N1 - N2**

Dividimos la lista completa de jugadores en una primera mitad (las mejores parejas) y enviamos esa primera mitad para conformar la Piramide Principal (PP) y estos mismos a su vez se subdividen entre lados, es decir, en 2 grupos , la mitad superior sera el lado A de la piramide y la mitad inferior sera el lado B. 

Del mismo modo haremos con la última mitad del listado total de parejas, los enviamos para conformar la Pirámide Secundaria (PS), el algoritmo también va a subdividir entre lados A y B con la mitad superior y mitad inferior respectivamente.  

PP: **A1 - A2, B1 - B2, C1 - C2, D1 - D2, E1 - E2, F1 - F2, G1 - G2**

PS: **H1 - H2, I1 - I2, J1 - J2, K1 - K2, L1 - L2, M1 - M2, N1 - N2**

Conformamos las piramides y dividimos en partes iguales:

Lado A PP: A1 - A2, B1 - B2, C1 - C2, **D1 - ¿?** (incongruencia detectada) 

El algoritmo debe tener la capacidad de detectar si un lado es impar, si o si siempre cada lado debe tener un numero de atletas par. En el lado A comprobamos que no es par ya que 7 atletas es una cantidad impar, entonces el algoritmo debe subir desde PS a los 2 atletas lideres o mejor posicionados quienes serian H1 y H2, los ascendemos hasta PP y de este modo ya tendriamos un lado A de PP con parejas par. La siguiente estructura es la que debe generar el algoritmo, tal cual sin alucinaciones:

Lado A PP: A1 - A2, B1 - B2, C1 - C2, D1 - D2 

Lado B PP: E1 - E2, F1 - F2, G1 - G2, H1 - H2

Lado A PS: I1 - I2, J1 - J2, K1 - K2 

Lado B PS: L1 - L2, M1 - M2, N1 - N2

Cerramos los lados de cada pirámide y creamos las mesas con sus respectivos enfrentamientos:

- Mesa 1: **A1 – A2 vs E1 – E2**
- Mesa 2: **B1 – B2 vs F1 – F2**  
- Mesa 3: **C1 – C2 vs G1 – G2**
- Mesa 4: **D1 – D2 vs H1 – H2**
- Mesa 5: **I1 – I2 vs L1 – L2**
- Mesa 6: **J1 – J2 vs M1 – M2**
- Mesa 7: **K1 – K2 vs N1 – N2**

y así bajo este esquema ya tenemos las mesas ordenadas para dar inicio al torneo, después para las rondas posteriores se aplica la misma dinámica por bloques.

---

## Manejo de Inasistencias y "Byes"

El algoritmo obligatoriamente debe contemplar el siguiente escenario:
  - El algoritmo debe detectar cuando un jugador esta ausente, abandona o es expulsado, quizas por medio de alguna bandera que recibe por parte del sistema.
  - **BYE ≠ abandono.** Un atleta con BYE está presente y sigue compitiendo, pero en esa ronda no juega porque falta gente para completar su mesa de 4. Quien abandona obtiene 0 puntos; su ausencia provoca el BYE de otros.
  - Si el total de inscritos deja un resto 1 (mod 4) → 3 atletas reciben BYE.
  - Si resta 2 (mod 4) → 2 atletas reciben BYE.
  - Si resta 3 (mod 4) → 1 atleta recibe BYE.
  - Los BYE obtienen automáticamente el puntaje de descanso (≈ 50 % del puntaje objetivo) y se marcan con una bandera para que el sistema de clasificación los procese el puntaje debido.

---

## Propuesta para Reglas 1 y 2 según Categoría

- **CATEGORÍA COMPACTA (≤ 36 participantes):**
  - Compañeros: ventana de +2 rondas
  - Rivales: ventana de +1 ronda
  - Riesgo distorsión: ¿quizás ALTO si aplicamos más restricciones?

- **CATEGORÍA ESTÁNDAR (40-76 participantes):**
  - Compañeros: ventana de +3 rondas
  - Rivales: ventana de +2 rondas
  - Riesgo distorsión: ¿quizás MEDIO-BAJO con parejas en bucle infinito por espera de pareo?

- **CATEGORÍA INTERNACIONAL (80+ participantes):**
  - Compañeros: ventana de +4 rondas
  - Rivales: ventana de +3 rondas
  - Riesgo distorsión: ¿quizás MÍNIMO sin alteraciones y todos los jugadores dentro de su respectiva pirámide según corresponda?

---

## Posibles Problemas: Efecto Cascada

- Si una pareja líder en el bloque superior no encuentra rivales, debe bajar hasta el siguiente bloque y este suceso distorsiona completamente el sistema suizo.
- Crea "emparejamientos forzados" no competitivos.

---

## Flexibilidad y Mandamientos Excepcionales

En caso extremo que el algoritmo no logre encontrar pareja válida, lo idóneo es que no se pierda la base y estructura del “sistema suizo”. Por ende, se podría estudiar la posibilidad de aplicar mandamientos excepcionales tales como:

- **Primero:** Realizar una transfusión de atletas entre bloques, los últimos lugares del bloque superior intercambiados con los primeros lugares del bloque inferior. Se debe ser estrictamente selectivo y excluyente para no generar distorsiones.
- **Segundo:** Con respecto a las reglas 1 y 2, se podría aplicar una relajación progresiva en cuanto a las ventanas, como por ejemplo disminuir una ronda; es decir, en el escenario de “categoría estándar” se podría aplicar -1 ronda y las ventanas pasarían de ser +3/+2 a +2/+1 solo para los jugadores afectados, no para todos.

Pero dejando siempre claro que lo óptimo sería que el algoritmo funcionara sin estos mandamientos, que sean solo una utilidad de último recurso.

---

## Conclusiones y petición a la IA

Dicho esto, como la IA con mayor potencial del mercado que eres tú, con mentalidad de programador "Senior" y con la misma capacidad de un arquitecto de software, por supuesto debes profundizar con rigurosidad y desarrollar el algoritmo. El algoritmo que generes debe tener la lógica, consistencia y coherencia desde la ronda 1 hasta la ronda 9 o mas rondas. Es importante que el algoritmo esté bien fundamentado, ya que será auditado.

Con el algoritmo ya finalizado debes hacer doble simulación interna para tu propio consumo, no a nivel visual, ni generar archivos extras, la simulación debe ser mentalmente para ti mismo como IA para que luego me indiques si se presentaron vicisitudes durante la simulación y sobre cuáles serían los posibles retos inesperados a presentarse, ya que necesitamos prever problemas para los debidos mantenimientos preventivos y no correctivos. Este algoritmo debe ser versátil y adaptable para poder superar cualquier prueba con rotundo éxito. Yo no necesito ver las simulaciones, la doble simulacion sera una sin jugadores "Bye" y otra simulacion si con 3 jugadores con estatus BYE y 1 abandono.

Se generarán dos archivos: uno con el algoritmo en pseudocódigo técnico y otro en formato Markdown con una explicación en lenguaje natural para la comprensión de los auditores. La explicación detallada se proporcionará una vez finalizada la revisión y generación del algoritmo.

**Importante:** No se generarán archivos hasta que las simulaciones internas hayan culminado con éxito. Se repetirán las simulaciones según sea necesario para garantizar que el algoritmo sea óptimo antes de proceder con la generación de los archivos.

---

> **Nota:** Si necesitas más contexto me puedes preguntar y yo te voy a facilitar otro prompt contextual adicional para abordar la eventualidad.
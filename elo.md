# 🏆 Sistema ELO para Torneos de Dominó (Parejas Rotativas)

## 📌 **Fórmulas Principales**

### 1. **Cálculo del ELO del Equipo**
\[
ELO_pareja = (elo_jugador_A + elo_jugador_B) / 2
\]


### 2. **Probabilidad Esperada de Victoria**
\[
E_eq = 1 / (1 + 10^((R_rival - R_propio) / 400))
\]

>function calcularExpectativa(ELO_rivalPar, ELO_propioPar) {
>  
>  >let exponente = (ELO_rivalPar - ELO_propioPar) / 400;
>>
>  >let potencia = Math.pow(10, exponente);
>>
>  >let potenciaTruncada = parseFloat(potencia.toFixed(3));
>>
>  >let expectativa = 1 / (1 + potenciaTruncada);
>>
>  >let E_eq = parseFloat(expectativa.toFixed(2)); 
>  >
>  >// toFixed() Redondea a decimales
>  >// Usando Math.pow()
>  >// 1O base de la exponenciacion
>  >// let expectativa = 1 / (1 + 10 ** exponente); // Usando "**" seria igual que "^" 
>  >
>  >return E_eq;
>
>}


### 3. **Actualización del ELO Individual**
\[
ELO = ELO + K * (S - E_eq) + Bono_Aplastante
\]
- **\(S\)**: 1 (victoria) / 0 (derrota).
- **Bono_Aplastante**: Ver siguiente sección.

---

## 🔥 **Bono por Victoria Aplastante**
**Condiciones**:  
1. El equipo ganador **alcanza o supera el puntaje objetivo** (ej. 100/200 puntos).  
2. La **brecha porcentual** cumple:  
   \[
   Brecha = ((Puntos Ganador - Puntos Perdedor) / Puntos Ganador) * 100
   \]
   - **+2 ELO** → 100% (ej. 100-0).  
   - **+1.50 ELO** → ≥90% (ej. 100-10).  
   - **+0.75 ELO** → ≥80% (ej. 100-20).  

**Ejemplo**:  
- Ganador: 100-15 → Brecha = 85% → **+0.75 ELO**.  
- Ganador: 99-16 → **No aplica** (aplastante pero no alcanzó el puntaje objetivo "100").
- Todo torneo tiene un puntaje objetivo por partida (ej. 100/200 puntos).  

---

## ⏳ **Ajustes por Inactividad**
### 1. **Inactividad ≥3 meses**
- **Primeras 5 partidas de regreso**:  
  - \(K = 32\) (sin importar su ELO).  
- **Objetivo**: Reajustar rápido su ELO real.  

### 2. **Inactividad ≥6 meses**
- **Decaimiento mensual**:  
  \[
    ELO = ELO * 0.98 (-2% por mes)  \]

  - Ejemplo 1: 2000 ELO → 1960 tras 1 mes. 
  - Ejemplo 2: 2000 ELO → 1569 tras 1 año. 
  - Valor_Final = Valor_Inicial * (1 - Tasa_Descuento)^Número_de_Periodos 
  - Valor_Final = 2000 * (1 - 0.02)^12 

---

## ⚠️ **Casos Especiales**
### 1. **Abandono (Conducta Antideportiva)**
- **Jugador que abandona**:  
  \[
  ELO = ELO - 40 (Penalización fija)
  \]
- **Equipo contrario**: Sin cambios en su ELO.  

### 2. **Inasistencia (Walkover)**
- **Equipo presente**: Sin cambios.  
- **Equipo ausente**: Sin cambios.
- **Judagor Ausente**
  
      - preinscripción paga: Sin cambios.   
      - preinscripción sin pagar: penalización -5 puntos.   

---

## 🎯 **Parámetros Clave**
| **Concepto**          | **Valor**                               |
|-----------------------|-----------------------------------------|
| ELO inicial           | 1200                                    |
| Factor K (nuevos)     | 40 (<1600 ELO o <20 partidas)           |
| Factor K (inactivos)  | 32 (por 5 partidas)                     |
| Factor K (intermedios)| 20 (1600-2000 ELO)                      |
| Factor K (élite)      | 15 (>2000 ELO)                          |
| Factor K (gran maestro)| 10 (>2200 ELO)                          |
| Penalización abandono | -40 ELO                                  |
| Bono aplastante       | +0.75/+1.50/+2 ELO (según brecha)             |

---

## 📝 **Ejemplo Integral**
**Partida a 100 puntos**:  
- **Equipo A** (1700 ELO promedio) vs **Equipo B** (1800 ELO promedio).  
- **Resultado**: A gana 105-15.  
- **S**: 1 por victoria.  
- **Cálculos**:  
  1. (E_eq = 0.36) (36% de probabilidad).  
  2. **Brecha%**: 85.71% → **+0.75 ELO**.  
  3. **K-factor** 20 jugador activo y establecido.  
  4. **ELO individual actual** 1500.  
     \[
     ELO = 1500 + 20 * (1 - 0.36) + 0.75 = 1513.8 ≈ 1513.55
     \]
  5. 1513.55 → ELO = 1514

---

## 📌 **Reglas de Oro**
1. **Precisión** Visualmente se muestra el ELO redondeado (1514), pero logicamente el valor se conserva intacto (1513.55) para mantener la precisión en los cálculos futuros. 
2. **Transparencia**: Todos los parámetros deben ser públicos.  
3. **Consistencia**: Aplicar siempre las mismas reglas.  
4. **Registro histórico**: Guardar datos de partidas y ELOs.  

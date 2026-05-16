# 💀 Legión del Mal

> Repositorio de práctica · Curso de Git & GitHub en Udemy

Este repositorio fue utilizado como práctica durante un curso de Git y GitHub tomado en Udemy. Fue obtenido mediante un **fork** del repositorio original del instructor Fernando Herrera  [@Klerith](https://github.com/Klerith), simulando un flujo de trabajo colaborativo real donde se aplican conceptos de ramas, fusiones y pull requests.

---

## 📚 Conceptos aprendidos

### Fork y pull requests
- **Fork** — crear una copia personal de un repositorio ajeno para trabajar de forma independiente sin afectar el original
- **Pull request** — solicitar que los cambios realizados en el fork o en una rama sean integrados al repositorio principal
- **Flujo de trabajo colaborativo** — entender el ciclo completo: fork → rama → cambios → pull request → merge

### Feature branches
- Crear ramas dedicadas a una funcionalidad o tarea específica, manteniéndolas aisladas de `master` hasta estar listas
- Fusionar la rama con `git merge` una vez completado el trabajo
- Publicar una rama local al remoto con:
```bash
  git push --set-upstream origin <rama>
```

### Gestión de ramas
- **`git branch -a`** — listar todas las ramas, tanto locales como remotas
- **`git branch -d <rama>`** — eliminar una rama local que ya no es necesaria
- Eliminar una rama simultáneamente en local y en remoto:
```bash
  git push origin :<rama>
```
- **`git remote prune origin`** — limpiar referencias locales a ramas remotas que ya fueron eliminadas
- **`git pull --all`** — traer todas las ramas remotas al repositorio local, útil cuando otros colaboradores crean ramas nuevas en el remoto

### Fusión de cambios
- **`git merge`** — integrar los cambios de una rama hacia otra

### Recuperación de rama de producción desde un tag

Flujo practicado para restaurar una rama de producción que había sido eliminada tanto en local como en remoto, usando el tag que apuntaba a ese estado del proyecto:

```bash
# 1. Hacer checkout del tag para situarse en ese estado del repo
git checkout <tag>

# 2. Crear una nueva rama local desde ese punto
git checkout -b <rama>

# 3. Subir la rama recuperada al remoto
git push --set-upstream origin <rama>
```

Este flujo funciona porque el tag conserva una referencia exacta al commit de producción, permitiendo reconstruir la rama con el contenido intacto aunque ya no existiera ni en local ni en remoto.
# proyecto-cabidas

#### Objetivo:
Encapsular implementacion actual de Rhino, capaz de tomar dos vectores que representan el terreno y su lote.
Para ser procesador por el flujo de Grasshopper, que se encarga de obtener la cabida optima en funcion de la norma especificada (plan regulador) como parametros de entrada.
De manera en la que se pueda mas adelante acceder de forma remota y externa al entorno de Rhino para simplemente facilitar unos inputs y retornar los outputs deseados a traves de una API REST

### Dependecias
- Rhino 8
- Grasshopper (incluido)
- Plugins:
  - OpenNest
    - nest_geo
    - OpenNest2
    - Options
    - Project
    - Sheets
  - LunchBox
    - Object bake
  - PufferFish
    - Mesh to Polysurface

  No se encontraron:
  - Human
  - Sasquash

---

## Pasos para recrear el entorno

1. Instalar Rhino
2. Cargar el plano del terreno en Rhino
4. Ejecutar Grasshopper
5. Cargar flujo de nodos ´CABIDAS_FINAL_2´
4. Listo se visualiza

---

### Bitacora primeros pasos recreandolo:

Al abrir Rhino y cargar un terreno funciona bien

Al querrer correr Grasshoppper va a solicitar instalar los plugins, no encontró el del `OpenNest`

No corre automaticamente el script, hay que seleccionar los dos lotes inputs. Ingresar datos a las variables `Sup. Bruta` y `Lote` 
- Investigar como asignar curvas de referencias desde Rhino a Grasshopper programaticamente
- Con la  GUI se puede haciendo click derecho 

Se instaló `OpenNest 2.11.0.0` manualmente al ejecutar el comando `PackageManager` en la consola de Rhino, forzandolo a reiniciar la app.

Para visualizar el formulario de control, en Grasshopper ir a:
`View -> Remote Control Panel`

Fallá en generar un output.
Al parecer el error esta en el chace que se genera antes de filtrar los bloques. Siguiendo los outputs parece que Opennest2 entrema una mala geometria en `All Geometry`

### Bitacora encapsulado:

Instalar paquete `Hops 0.16.23`, abrir el `PackageManager` e instalar el plugin


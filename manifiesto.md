# Racimo de Conversaciones

*Una propuesta de UX para conversaciones con Claude.*

---

## El chat con Claude tiene una geometría que el producto no me deja ver

Cada conversación útil que tengo con Claude se parece más a un árbol que a una línea. Empiezo en una pregunta, Claude responde mencionando cuatro conceptos, yo profundizo en uno, eso ramifica otros tres, vuelvo al primero, y en quince minutos he construido en mi cabeza un mapa de pequeñas decisiones. Pero el chat lo presenta todo como un scroll vertical, y cuando cierro la ventana, el mapa se pierde.

He estado prototipando una manera distinta de navegar conversaciones, y quería compartirla con quien diseña el producto. La idea madre, en una frase: **una conversación no es un hilo, es un racimo**.

Hay tres propuestas concretas dentro de esa idea.

---

## 1. Navegación espacial en lugar de scroll lineal

Cada conversación es una uva. Las uvas se agrupan en racimos por tema — los predefine el usuario, no el producto. Ver todas tus conversaciones de un vistazo no es solo más rápido: cambia tu relación con tu propio historial. Lo que hoy se siente como "carpeta de chats vieja" pasa a sentirse como un cuerpo de pensamiento. La memoria espacial humana es potente; el scroll no la activa, un racimo sí.

## 2. Bifurcación con herencia de contexto

Cuando Claude responde algo denso — cinco ideas en un párrafo — hoy hay dos opciones malas: ignorar cuatro y profundizar en una, contaminando el hilo principal, o abrir un chat nuevo y re-explicar todo el contexto desde cero. Falta un tercer camino: bifurcar. Cualquier respuesta de Claude debería ser fork-able en una sub-rama que hereda el contexto entero del padre. La sub-rama explora la tangente sin ensuciar el hilo. Y para llegar más fino: cualquier *fragmento* de una respuesta debería poder ser semilla de su propia sub-rama. Esto convierte una respuesta densa en algo navegable. Es git para el pensamiento.

## 3. Destilación como output de primera clase

Después de tres o cuatro conversaciones sobre un mismo tema, lo que tengo es valor disperso. Hoy ese valor se queda dentro del chat, y si no lo extraigo a mano, se pierde. Una "destilación" debería ser una operación que toma todas las uvas de un racimo y devuelve un texto cuidado — temas dominantes, decisiones tomadas, preguntas abiertas, conexiones que no se veían entre conversaciones — descargable y persistente. El usuario sale de Claude con algo que puede leer fuera de Claude. Eso convierte la conversación en preparación de pensamiento, no en consumo de respuestas.

---

## Una nota sobre las tres ideas

Las tres funcionan por separado, pero juntas dibujan un patrón coherente: tratan al usuario como alguien que **construye** conocimiento, no como alguien que consulta una base de datos. La metáfora de las uvas es un envoltorio — pueden llamarse topics, branches, synthesis — pero la estructura debajo se sostiene con o sin la metáfora.

## El prototipo

He construido un prototipo navegable que materializa las tres ideas. Es un único archivo HTML autocontenido, con persistencia en localStorage, sin login ni backend ni API key. Funciona como demostración en cualquier navegador. Lo adjunto, junto a un demo grabado de 90 segundos que muestra los tres movimientos en acción.

## Trabajemos en esto

Si alguno de los tres movimientos resuena con algo que ya estaban pensando, o si abre una conversación útil dentro del equipo, me gustaría participar en ella. Tengo el prototipo funcionando y disposición a adaptar la idea a lo que tenga sentido en su contexto — sea bajo este nombre, bajo otro, o integrada en algo más grande que ya estén construyendo.

Que lo consideren — y, si avanza, que me hagan partícipe.

— Pedro

# Guía de visita rápida

*Cinco minutos navegando el prototipo, una pieza a la vez.*

---

Has abierto un archivo HTML autocontenido. Funciona sin login, sin internet, sin nada que instalar — el estado se guarda en localStorage de tu navegador, así que puedes cerrarlo y volver más tarde y todo seguirá donde lo dejaste.

Vienen 27 conversaciones de ejemplo pre-cargadas, agrupadas en tres racimos: Trabajo, Personal, Aprendizaje. Son inventadas; sirven solo para demostrar la forma. Las respuestas en vivo no se generan en este modo standalone — el modelo se conecta cuando el prototipo corre dentro de un entorno con bridge a Claude. Para entender la propuesta basta con el contenido pre-cargado.

Tres cosas que vale la pena probar, en orden.

## 1. Navegar el racimo

Mira el lienzo entero. Tres racimos colgando como uvas de verdad, uno por tema. Pasa el cursor por encima sin clickear — las uvas reaccionan suavemente. Ahora pincha cualquier uva (te recomiendo **"Música clásica"** en el racimo rosa, abajo). Abajo aparece la conversación: una pregunta, una respuesta. En la respuesta hay tres palabras resaltadas — Bach, Chopin, Stravinsky. Eso es lo siguiente.

## 2. Bifurcar una sub-rama

Click en cualquiera de las palabras resaltadas — digamos **Bach**. Se abre un modal pre-rellenado para crear una sub-rama enfocada en ese concepto. Ajusta lo que quieras y pulsa "Bifurcar y preguntar". Verás aparecer una uva más pequeña colgando de la madre, conectada por un tallito fino. Esa es tu sub-rama: hereda todo el contexto del padre.

También puedes **seleccionar cualquier fragmento de texto** dentro de la respuesta con el cursor. Aparece un botón flotante "Bifurcar selección" y el flujo es el mismo. La diferencia conceptual: los resaltados son sugerencias del modelo; la selección manual es tu propia intuición de lector. Los dos caminos coexisten.

## 3. Destilar el racimo

En la barra de chips arriba del lienzo, sobre cualquier racimo, hay un botón **"Síntesis"**. Al pulsarlo se abre un panel que destila todas las uvas del racimo en un texto cuidado — temas dominantes, decisiones clave, preguntas abiertas. En este modo standalone se muestra un mensaje de fallback en lugar de la síntesis real (la generación necesita modelo conectado). La operación, en cualquier caso, es esa.

## Una nota

El icono del ojo, junto a la barra de búsqueda, alterna entre lectura limpia y resaltada. Si los marcadores distraen, apágalos — la prosa queda neutral y la selección manual sigue funcionando. Esa elección entre marcas y limpio es deliberada: el lector mantiene control sobre cuánto le sugiere la IA.

---

# Visit guide

*Five minutes through the prototype, one piece at a time.*

---

You've opened a self-contained HTML file. It works without login, without internet, with nothing to install — state lives in your browser's localStorage, so you can close it, come back later, and find everything where you left it.

It ships with 27 sample conversations pre-loaded, grouped into three clusters: Trabajo, Personal, Aprendizaje (Work, Personal, Learning). They're invented; they exist to demonstrate the shape. Live responses are not generated in standalone mode — the model connects when the prototype runs inside an environment with a Claude bridge. The pre-loaded content is enough to understand the proposal.

Three things worth trying, in order.

## 1. Navigate the cluster

Look at the whole canvas. Three clusters hanging like real grapes, one per theme. Hover without clicking — grapes react gently. Now click any grape (I recommend **"Música clásica"** in the pink cluster at the bottom). The conversation opens below: a question, an answer. In the answer, three words are highlighted — Bach, Chopin, Stravinsky. That's what comes next.

## 2. Branch a sub-conversation

Click any of the highlighted words — say **Bach**. A modal opens, pre-filled to create a sub-branch focused on that concept. Adjust whatever you like and click "Bifurcar y preguntar". A smaller grape appears, hanging from the parent, connected by a thin stem. That's your sub-branch: it inherits the parent's full context.

You can also **select any fragment of text** inside the response with your cursor. A floating "Bifurcar selección" button appears, and the flow is the same. Conceptual difference: highlighted terms are model suggestions; manual selection is your own reader's intuition. Both paths coexist.

## 3. Distill the cluster

In the chip bar above the canvas, every cluster has a **"Síntesis"** button. Click it and a panel opens that distills all the grapes in the cluster into a careful piece of text — dominant themes, key decisions, open questions. In standalone mode you'll see a fallback message instead of the actual synthesis (live generation requires a connected model). The operation, in either case, is that.

## A note

The eye icon next to the search bar toggles between clean reading and highlighted modes. If the markers distract, turn them off — the prose stays neutral and manual selection keeps working. The choice between marked and clean is deliberate: the reader keeps control over how much the AI suggests.

# Racimo

*A UX proposal for conversations with Claude.*

---

## My conversations with Claude have a geometry the product doesn't show me

Every useful conversation I have with Claude looks more like a tree than a line. I start with a question, Claude answers by mentioning four concepts, I dig into one, that branches into three others, I come back to the first, and within fifteen minutes I've built a map of small decisions in my head. But the chat presents all of it as a vertical scroll, and when I close the window, the map is lost.

I've been prototyping a different way to navigate these conversations, and I wanted to share it with whoever designs the product. The core idea, in one sentence: **a conversation is not a thread, it's a cluster.**

Three concrete proposals follow from it.

---

## 1. Spatial navigation instead of linear scroll

Each conversation is a grape. Grapes are grouped into clusters by topic — the user defines them, not the product. Seeing all your conversations at once isn't just faster: it changes your relationship to your own history. What today feels like an "old chat folder" starts to feel like a body of thinking. Human spatial memory is powerful; scroll doesn't activate it, a cluster does.

## 2. Branching with context inheritance

When Claude responds with something dense — five ideas in a single paragraph — today there are two bad options: ignore four of them and dig into one, polluting the main thread, or open a new chat and re-explain all the context from scratch. A third path is missing: branching. Any Claude response should be fork-able into a sub-branch that inherits the full context of its parent. The sub-branch explores the tangent without contaminating the main thread. And for finer granularity: any *fragment* of a response should be able to seed its own sub-branch. This turns a dense response into something navigable. **It's git for thinking.**

## 3. Distillation as a first-class output

After three or four conversations on the same theme, what I have is scattered value. Today that value stays inside the chat, and unless I extract it by hand, it's lost. A "distillation" should be an operation that takes all the grapes in a cluster and returns a careful piece of text — dominant themes, decisions made, open questions, connections between conversations that weren't visible before — downloadable and persistent. The user leaves Claude with something they can read outside of Claude. That turns conversation into preparation for thinking, not consumption of answers.

---

## A note on the three ideas

Each works on its own, but together they sketch a coherent pattern: they treat the user as someone who **builds** knowledge, not someone who queries a database. The grape metaphor is a wrapper — you can call them topics, branches, synthesis — but the structure underneath holds up with or without the metaphor.

## The prototype

I built a navigable prototype that embodies the three ideas. It's a single self-contained HTML file, persistent via localStorage, with no login, backend, or API key required. It works as a demonstration in any browser. Attaching it, along with a 90-second screen recording that shows the three movements in action.

## Let's work on this

If any of the three movements resonates with something you were already thinking about, or if it opens a useful conversation inside the team, I'd like to be part of it. The prototype is working, and I'm open to adapting the idea to whatever fits your context — under this name, another name, or integrated into something larger you're already building.

I hope you'll consider it. And if it moves anywhere — count me in.

— Pedro

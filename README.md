# Vibe Coding For Journalists
*Build Real AI-Powered Tools Without Writing Code*

A workshop for [ONA25](https://ona25.journalists.org/) by [Liam Andrew](https://www.github.com/mailbackwards/) and [Ryan Restivo](https://www.github.com/ryanrestivo/).

## Introduction

### What you need

- A chat LLM or two – [ChatGPT](https://chatgpt.com/), [Claude](https://claude.ai/), and/or [Google AI Studio](https://aistudio.google.com/)
- [Firebase Studio](https://firebase.studio/) – a browser-based sandbox for AI-assisted coding (free; requires a Google account)
- Your computer

### Agenda/Timeline

Here's (roughly) how we'll spend the next 90 minutes.

- **Account onboarding** (10 mins)
- [**Presentation**](#presentation) (10 mins)
- [**Scenario demos**](#scenarios) and tool introductions** (10 mins)
- **Hands-on building!** (60 mins)
  - Scenario enactment
  - Scenario enhancement
- [**Sharing**](#show-and-tell), **brainstorm** and **next steps** (30 mins)

That's *not a lot of build time*. If you leave with a copy of a scenario and a half-baked idea of what to try next, **that's success**.

_________

## Presentation

*Icebreaker question:*  Ask your neighbor: what do you think about when you think of vibe coding? What ideas come to mind? What associations do you have with it?

### Vibe coding: a definition

Coined by [Andrej Karpathy](https://x.com/karpathy/status/1886192184808149383):

> There's a new kind of coding I call **"vibe coding"**, where you fully give in to the vibes, embrace exponentials, and forget that the code even exists. ...
>
> It's not too bad for **throwaway weekend projects**, but still quite amusing. I'm building a project or webapp, but it's not really coding - I just see stuff, say stuff, run stuff, and copy paste stuff, and it mostly works.

And in a follow-up...

> Personally I use "vibe coding" when I feel like this dog.

![I have no idea what I'm doing dog](https://static.simonwillison.net/static/2025/vibe-coding.gif)

### What is it good for?

Let's start with what it's *not* good for:

- You probably can't make a 7-figure business off of "vibe coding". *If someone says they have, that's LLM-assisted software development, not vibe coding.*
- You can't build the app to save local news in the next 90 minutes, sorry everyone.

But it's good for...

#### Low-stakes, creative projects

- Lightweight games, quizzes and other interactives
- Bringing designs and illustrations to life
- Clones or light variations on standard games (e.g. Wordle).

They are also excellent creative partners; *ask for ideas while you're building*.

#### Prototypes/facades of functioning tools

- Get first impressions about a project idea.
- Pitch your idea to your team, boss, or investor (maybe you *can* make a 7-figure business?)
- Make sure you're going in the right direction before asking a developer to build it for real.

Where you used to make scribbles and sketches to show off a concept, you can now **make a blueprint** and get **real feedback**.

#### Automating specific, tedious tasks

- A very defined, small problem (e.g. tinkering with images, retooling some data in a spreadsheet or JSON file, grabbing something from a website)
- A variation of a tool you use a ton (hello [WordCounter](https://wordcounter.net/), [EmojiCopy](https://emojicopy.com/), [Image Cropper](https://www.canva.com/features/crop-image/)), customized for you, and without clunky interfaces, distracting ads, or sketchy data policies.

*This is one of my favorite uses of LLMs!*. They are not reliable for standard computational tasks, but they can write traditional code that *is* reliable.

### What should we watch out for?

*A necessary disclaimer to absolve us of responsibility.*

See Simon Willison's [when is it OK to vibe code?](https://simonwillison.net/2025/Mar/19/vibe-coding/#when-is-it-ok-to-vibe-code-):

- Keep it low stakes
- Beware of secrets (passwords/keys, private data)
- Be a good network citizen (don't scrape willy-nilly or make API requests with abandon)
- Be careful with services that charge money based on usage

If you're building something that someone else might use, **ask an adult**. *(We're here to help!)*

- LLMs are **never** 100% accurate, with facts *or* code. Accuracy is the _highest standard_.
- If you feel like that dog, you're not practicing basic journalistic (or engineering) values. That's ok, but only to a point!

### Tech Tips

Some things we've learned along the way to help you with your journey:

#### Prompting is the name of the game

It's the same with all LLM usage: more than the model or tool you use, you need to talk to it right.

- Be iterative
- Keep prompts short
- Ask for step-by-step
- Paste back errors

#### Network requests are a pain

Many services don't allow scraping, or make it hard to interact with APIs in real time.

One imperfect but useful solution is to vibe-code in two phases:

1. Make a script that downloads the data
2. Make an app that can upload that data and work with it

*Bonus tip:* Ask your chat thread from job #1 to draft the prompt that creates #2!

#### Debugging is either trivial or impossible

If you run into an error:

- Just paste the error back in and see it magically fixed
- ...but if it doesn't magically fix, you're in for a hard time.

Worst case, you might need to dive into the code, or roll back to a version that worked and keep vibing.

> Debugging with AI is like trying to tune a piano by yelling at it. \- [Brandon Braswell, AMP Local](https://medium.com/@brandonbraswell_54631/how-i-built-a-60k-mvp-for-200-using-ai-and-finally-brought-an-8-year-vision-to-life-70c3fb386be4)

#### Be smart with your workflows

- Save versions as you go. Once you like what you've got, make a copy before you keep building.
- Constrain complexity. Pick one thing to get working at a time, then add polish.

_______

## Scenarios

We've taken what we've learned and built some example projects. Pick any one to start with, then take it in new directions (or try another one).

| Scenario | Description | Skills / Concepts | Technologies |
|----------|-------------|-------------------|--------------|
| [Weather data](weather_data) | Turn a PDF report on Louisiana's history of hurricanes into a story, graphics, and even a game. | Data extraction, visualization, light interactivity | Firebase Studio |
| [Nonprofit querier](990_querier) | Download data about nonprofits and explore them through an interactive dashboard. | APIs, dashboards, data exploration | ChatGPT, Google Sheets, Firebase Studio |
| [High schools](high_schools) | Transform US News & World Report’s top high schools data into interactive graphics and games. | Web scraping, interactive charts, gamification | Firebase Studio |
| [ONA Quest](ona_quest) | Build a choose-your-own-adventure game using Claude Artifacts. | Narrative design, branching logic, text generation | Claude |

Or think of your own ideas with these in mind.

### Show and Tell

Let's share out:

- Did you get anywhere?
- What worked about these scenarios?
- How would you do them differently?

And let's brainstorm:

- What is something you want to try next week? Think of a problem or data or something you want to explore further.
- If you leave with an idea to try, **that's a win!**
- If you leave with a 7-figure investment, **give us a cut!**

### Other tools to try

While we used Firebase Studio (and a dash of vanilla LLMs) today, here is a non-exhaustive list of other tools in this space that you could try next:

#### No-code / Low-code App Builders
- [**Bubble**](https://bubble.io/) – Drag-and-drop web app builder with database + logic.
- [**Glide**](https://www.glideapps.com/) – Build mobile/web apps directly from spreadsheets.
- [**Phoenix**](https://phcode.dev/) – Emerging low-code platform with AI integrations.
- [**Airtable (Omni)**](https://airtable.com/) – Make interfaces and integrations out of your data.

*Best for non-coders who want working apps quickly.*

#### Design & Prototyping
- [**Figma Make**](https://www.figma.com/make/) – Experimental AI-powered design/prototyping tool.
- [**Framer**](https://www.framer.com/) – Web design + publishing tool with strong AI features.
- [**Lovable**](https://lovable.dev/) – AI-driven product builder for quick landing pages and prototypes.

*Best for design-first workflows and pitches.*

#### AI Coding & IDEs
- [**Replit**](https://replit.com/) – Online coding environment with instant deploys.  
- [**Cursor**](https://cursor.sh/) – Code editor with built-in AI support.  
- [**Claude Code**](https://www.anthropic.com/news/claude-code) – Anthropic’s coding assistant (optimized for larger codebases).  
- [**Codex**](https://openai.com/research/codex) – OpenAI’s code-generation model.

*Best for coders who want AI copilots and control.*
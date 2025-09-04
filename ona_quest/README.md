# ONA Quest

My goal here was to experiment with a longer-form game, as well as to try making a [Claude Artifact](https://madewithclaude.com/) with the help of a CLAUDE.md file.

CLAUDE.md is a persistent resource intended for use with Claude Code, but it's a trick that can work anywhere: like a style guide for code, you can instruct it to "Research and plan before implementing" or "Don't spiral into complex solutions". I kept it simple and found a decent-looking [CLAUDE.md file](CLAUDE.md) on the web.

Since we're all going to New Orleans, I decided to make a game out of attending ONA:

- [The project](https://claude.ai/public/artifacts/59fc25f7-10e2-4882-8c52-5ae9dbc9f824)
- [The source code](ona25-itinerary-builder.tsx)

My original prompt:

> Help me make an app that takes the schedule of the ONA program at https://ona25.journalists.org/schedule/ and helps you create an itinerary for your days at the conference. It should be interactive and fun and ask you questions about the type of sessions you might be most interested in. It should be a step-by-step experience rather than an all-at-once dashboard or review. Add visuals where appropriate. When there is a break in the programming, give the user a celebration. Make sure you build in a couple of breaks for users to network, explore the venue and sponsors, or rest.
>
> Please always refer to the attached CLAUDE.md Markdown file as you are building and making edits. First off, make sure the code adheres to these best practices.

The game started well by asking more about me, but then it just spat out a long, standard schedule page. I went back and forth for a while from there:

> This should be a sort of choose-your-own-adventure in conference session form. Make it fun and zany.

Every time it finished, I would give it a try and even in its failures, it gave me some new ideas:

> Let's add some more gamified elements. Let's also call it "ONA quest." Your goal is to maximize your knowledge and you get knowledge points at every session you attend and high quality networking opportunity you have.
>
> At some points in the conference process, you'll be sidetracked by things like a networking conversation that has gone too long, a lunch that makes you too tired to attend a session, or Slack messages from your boss who expects you to be working today.
>
> The goal of the game is to maximize the number of knowledge points by the end of the conference.

The result is not a complete game, but a fun proof-of-concept, with more fun enhancements:

> Let's add some more complexity now. Make sure it's going across multiple days (kickoff is on Wednesday evening, and it should go through all day Thursday and Friday). Include lunch, networking opportunities, evening dinners and mixers, and getting a good night's rest. All of this is important in order to win the quest!

And one key addition:

> Is there anything else you would suggest before we move forward with this?

It gave me some great ideas: including New Orleans-specific elements, enhancing risk/reward mechanics, and more.

At all points, I kept saying:

> Keep referring to the CLAUDE.md file attached here for best practices on building.

I can't tell how much this helped without doing deeper evaluations, but I'm confident that it didn't hurt! Especially as a project gets bigger and bigger, such a "code style guide" makes sure that it stays on track. [Try the game here](https://claude.ai/public/artifacts/59fc25f7-10e2-4882-8c52-5ae9dbc9f824).
# Weather Data!

At first I wanted to reflect some smilar projects I've done in the past


Then I found this study of Louisiana hurricane history and thought this might be more relevant since (A) we are in New Orleans (B) the conference dates are the exact peak of Hurricane Season.

By all means read this 70 page paper, but lets take this and try to make a story out of it.

**NOAA Climatology Report - Hurricanes in Louisiana**
https://www.weather.gov/media/lch/events/lahurricanehistory.pdf

*Think about this:* 5 years ago you would have to read this and then write a story, maybe an interview or two, find some other sources. *Now* we can try to create something out of this that serves our users using LLMs.

To get the data from this PDF, I punched it into ChatGPT to generate three CSVs, one for the historical data, and then the highest wind totals, storms by decades because they seemed the most useful. You could go a step further and ask an LLM to read this data and try to pull all the measurements (rainfall inches, wind speeds) out of it by finding dates, times, measurements and that should also work.

## Now Let's Vibe Code!

We can build a lot of stuff with this


Added this story to tell more narrative 
* https://ready.nola.gov/hazard-mitigation/hazards/tropical-cyclones/
then this report from NPR from August 24
* https://www.npr.org/2025/08/24/nx-s1-5469888/hurricane-katrina-20-years-new-orleans
resources on preparedness 
* https://www.doa.la.gov/media/djnlatxm/hurricane-preparedness.pdf
* https://www.brla.gov/2180/Hurricane-Preparedness



### Then I told it to write this like the Weather Channel 
This is what I had as I was building the story and graphics 
![alt text](1_before_weather_channel_prompt.png "As I'm building the story, this evolves")

> Me: ok this is all great... now rewrite it all like you work at the weather channel, wihch means that every tiny alert is a high treat and disaster is about to happen despite the fact it might be sunny out tomorrow.

> Gemini: Understood. It's time to sound the alarm. I will rewrite the entire narrative to adopt the urgent, high-stakes tone of a meteorologist tracking a monster storm. Every chart will reveal a new danger, every historical event will become a chilling prophecy of what's to come. This will transform the page from a calm historical retrospective into an urgent call to action, highlighting the ever-present threat these storms pose.
> I am rewriting the text on the story page to adopt a more dramatic and urgent "Weather Channel" tone, emphasizing the imminent danger and historical devastation caused by hurricanes.

![alt text](2_weather_channel_prompt.png "Now written like the weather channel")

### Then we thought, let's take the survival parts and make a quiz to help people learn preparedness
It also is written in a way that is more threatening, but trying to present an interactive game way.
![alt text](beat_the_clock.png "Our game, beat the clock!")

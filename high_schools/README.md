# Top High Schools Interactive

This was an idea to show off how you can create new and unique experiences, doing reporting like you may already do, using LLMs and Vibe Coding.

All states have top schools in the country, so using some methods you may know about, plus some vibe coding, you can build this experience.

## Resources that inspire this that are worth knowing about

* https://www.usnews.com/education/best-high-schools/new-york/rankings - This is the source data, change the state name based on their rules ('new-hampshire', 'south-dakota', 'mississippi') and you can generate data...
* https://2023.srccon.org/schedule/#_session-scraping-dev-tools - I missed this one at SRCCON 2023, but I do come back to it a lot, how to find hidden APIs on the internet I'm sure there are plenty of good resources on this as well
* With that you find that THIS URL
```https://www.usnews.com/education/best-high-schools/search?format=json&state-urlname=new-york&page=1```
powers the top items in the feed... and see how there's page 1? I can paginate through and just add more data to make my own file
* IF you're a national outlet, just remove the *`&state-urlname=new-york`* you have all the US 🇺🇸
* *Which is actually the next thing I did was paginate through the top 10 and pull the top 200 schools which is what you'll see today!*

## Think about how you want your experience
1. At first I thought, maybe it can *generate a table* of all the top schools - *this worked out fine*
2. I thought maybe I can get it to *make a map* - this *did not work* and mostly because the data did not give enough geographic information. City and state will typically not be enough to do that. 
```"school": {
            "location": "Tucson, AZ",
            "profile_url": "https://www.usnews.com/education/best-high-schools/arizona/districts/basis-charter-schools-inc/basis-tucson-north-140137",
            "district_page_url": "https://www.usnews.com/education/best-high-schools/arizona/districts/basis-charter-schools-inc-100663",
            "district": "BASIS Charter Schools Inc.",
            "school_id": 140137
        },
```
3. I tried asking for a heatmap of the US, counting map, all of them failed miserably.
4. Then I asked for a brief article writing about "describing the consistencies with the top 50 high schools and then broadly around the top 200 and what correlate to their sucess". The article reads very much like an LLM wrote it after many tries to reformat it. Does it give some useful information? Maybe.

## What you should learn
- Think of a problem you want to solve. 
- Look at pages on the internet for stories and look deeper at data sources.
- Think about interactivity.

## What you can do with this next?
* There are endpoints to find the top colleges, business schools, law schools, etc.
* Go find them and build your own thing 🙂
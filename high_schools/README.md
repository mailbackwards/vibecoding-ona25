# Hello

This was an idea to show off how you can create new and unique experiences, doing reporting like you may already do, using LLMs and Vibe Coding.

All states have top schools in the country, so using some methods you may know about, plus some vibe coding, you can build this experience.

# Resources that inspire this that are worth reading

* https://www.usnews.com/education/best-high-schools/new-york/rankings - This is the source data, change the state name based on their rules ('new-hampshire', 'south-dakota', 'mississippi') and you can generate data...
* https://2023.srccon.org/schedule/#_session-scraping-dev-tools - I missed this one at SRCCON 2023, but I do come back to it a lot, how to find hidden APIs on the internet I'm sure there are plenty of good resources on this as well
* With that you find that THIS URL (https://www.usnews.com/education/best-high-schools/search?format=json&state-urlname=new-york&page=1) powers the top items in the feed... and see how there's page 1? I can paginate through and just add more data to make my own file


## Think about how you want your experience
1. At first I thought, maybe it can *generate a table* of all the top schools - *this worked out fine*
2. I thought maybe I can get it to *make a map* - this *did not work* and mostly because the data did not give enough geographic information 
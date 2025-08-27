OpenChatGPT and type Prompt A
Create a new Google Sheet, go to Extensions > Apps Script
Paste the code from Prompt A into your script block
Refresh the Google Sheet
Get a sample nonprofit EIN (e.g. 53-0196605 for the Red Cross) and put it in Column A
Go to 990 Tools > Fill from EIN
Note: first time, give permissions, then re-run


Prompt A
Write me a Google Apps Script that takes in a column value, uses that as the EIN, and queries the ProPublica Nonprofit Explorer API to get the latest 990 tax year and total contributions from that form.

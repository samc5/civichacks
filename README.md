## Inspiration
With the current Trump administration, the need for transparency over ICE's activities is greater than ever. Immigrants live in fear of raids and advocates often lack enough information to understand trends or identify illegal tactics. The current system advocates use to track ICE activities requires manual entry of information. With the speed ICE can move at, immigrants and advocates need a faster way to communicate information with each other and the public. Our project addresses this by creating a live map of Massachusetts that can be easily updated with new arrests such that this information is more readily available to all.

## What it does
Our website contains an interactive map with live updates of ICE activities. Users can submit forms to report unverified ICE activity. These forms are stored in mongoDB and used by the map to plot activity based on longitude and latitude. 
In addition, our website contains a page with statistics on recent ICE arrests. 

## How we built it
We created the website and a form through next.js. Then, we created the live map using through ArcGIS Javascript SDK and used mongoDB to store information submitted through the form. We implemented geocode to verify addresses and get the longitude and latitude of the map. Throughout the development process, we tested our project on a vercel server.

## Challenges we ran into
None of us have ever worked with next.js, so there was a learning curve. ArcGIS was also unfamiliar to us. Because of this, it took hours to get the map working. We ran into issues when we had the program attempting to create the map before the points from reports were initialized, but we solved this by changing the structure of the map rendering process. 
Another issue we ran into was the lack of data. Currently, there is only a small data set to work with, so we needed to create synthetic data for more proof-of-concept. However, generating synthetic data was not easy. We had to find a way to generate real addresses in Massachusetts and then fetch their longitude and latitude. 
 
## Accomplishments that we're proud of
We are extremely proud of our map with live updates due to the difficulty of wrangling the data and getting ArcGIS to work. 

## What we learned
We learned how to use next.js, ArcGIS, and mongoDB. We also learned how to generate random addresses in Massachusetts and find their latitude and longitude using Google Maps API.

## What's next for ICE Tracker
In the future, ICE Tracker will add a secure login for administrators who can add verified reports, which will be distinguished from the unverified reports of other users to create a greater degree or trust and veracity. We also would aim to incorporate an LLM to summarize news regarding ICE and immigration. 

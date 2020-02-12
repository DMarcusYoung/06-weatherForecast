# Weather Forcast

## Description
Weather forcast application that shows the temperature, humidity, wind speed and UV Index of a given city. The cities that have been searched are saved to a menu even if the page is reloaded.

## Technologies
HTML was used for the basic page layout. JS was used to make the API requests, add button reponses, display all of the data to the screen, and to store/get the names of the cities into local storage. JQuery used to make life easier, bootstrap for simple formatting, and the Open Weather Map API to get the data for the weather.

## Challenges
Getting the API to work was a big hassle, I had one really annoying issue where the API link wasn't working because the sample call that they have on the documentation doesn't actual work. It had the word sample in the URL which prevented the call from going through and gave me a weird CORS error, this was fixed by just deleting the word sample from the URL. I also tried to put the ajax call in a function, however, the data from the response object wasn't recognized so I coudn't put it in a function. Lastly, JQuery was being super derpy, and sometimes the HTML wouldn't respond appropriately. I never found out the reason for this, I just had to change the way I got the HTML elements. 


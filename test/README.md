# noaa_solcalc_test.js
`noaa_solcalc_test.js` is a node based program to test 
the noaa_solcalc module which calculates next sunrise or sunset given a date/time.  

The `noaa_solcalc_test.js` program uses [minimist module](https://github.com/minimistjs/minimist)
for command line option parsing.

#### The program accepts the following command line options:
```
-d, --date   Print next sunset/sunrise after given date/time.
                  date/time format: YYYY-MM-DD[Thh:mm[:ss]] .
--long       Longitude of observer in decimal form, South is negative.
                  Default value is longitude of Hammerfest (-23.5°).
--lat        Latitude of observer in decimal form, East is negative.
                  Default value is latitude of Hammerfest (70.5°).
```
                  



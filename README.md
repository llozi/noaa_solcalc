# noaa_solcalc
A node module which calculates next sunrise or sunset given a date/time.  
Based on code from view-source: [https://gml.noaa.gov/grad/solcalc/sunrise.html](https://gml.noaa.gov/grad/solcalc/sunrise.html)

Install locally using npm:<br>
`npm install <local/path_to_noaa_solcalc_module_directory>`

Exported functions include:

**findNextSunrise(julianday, latitude, longitude)**:
> Calculates the julian day of the next sunrise
starting from the given day at the given location on earth.  
Returns julian day of the next sunrise.

**findNextSunriseFromDate(jsDate, latitude, longitude)**:
> Calculates the javascript date object of the next sunrise
starting from the given Date object at the given location on earth.  
Returns javascript Date object.

**findNextSunset(julianday, latitude, longitude)**:
> Calculates the julian day of the next sunset
starting from the given day at the given location on earth.  
Returns julian day of the next sunset.

**findNextSunsetFromDate(jsDate, latitude, longitude)**:
> Calculates the date/time of the next sunset
starting from the given Date object at the given location on earth.  
Returns javascript Date object.

**calcDateFromJD(julianday)**:
> Calculates calendar date from julian day.  
Returns date as a javascript Date object.

**calcJD(year, month, day)**:
> Calculates julian day from calendar day.  
Return julian day.

---

Latitudes are positive for the northern hemisphere, negative for southern.  
Longitudes  are positive west of Null meridian, negative east of it.

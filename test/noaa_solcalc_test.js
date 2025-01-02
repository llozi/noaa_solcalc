#!/usr/bin/node
  
// Tests the usage of my noaa_solcalc.js node.js module 

const LAT = 70.5;       // Test latitude
const LON = -23.5;      // Test longitude
const ALT = 20;         // Test altitude
  
  
function usage() {
  var scriptname = process.argv[1];
  //console.log("process.argv[1]: " + scriptname);
  var regrps = scriptname.match(/([^/]+)$/);
  scriptname = regrps[1];
  console.log('Usage: node ' + scriptname + ' [options]');
  console.log('Options:');
  console.log('  -h, --help       Display this help message');
  console.log('  -v, --version    Display the version number');
  console.log('  -d, --date       Print next sunset/sunrise after given date/time.');
  console.log('                     date/time format: YYYY-MM-DD[Thh:mm[:ss]] .');
  console.log('      --long       Longitude of observer in decimal form, South is negative.');
  console.log('                     Default value is longitude of Hammerfest.');
  console.log('      --lat        Latitude of observer in decimal form, East is negative.');
  console.log('                     Default value is latitude of Hammerfest.');
  process.exit(0);
}   
  
function option_unknown() {
  console.log('Unknown option, ..aborting');
  process.exit(1);
}

//***********************************************************************/
// main()
//***********************************************************************/

var minimist = require('minimist');
var solcalc = require('noaa_solcalc');

var args = minimist(process.argv.slice(2), {
  string:  ['date', 'long', 'lat' ],   // --date "YYYY-MM-DD", --long "7.5", --lat "47.5"
  boolean: ['version', 'help'],        // --version, --help
  alias:   {v: 'version', h: 'help', d: 'date'}, // short options
  unknown: option_unknown
});

//console.log(args);

if (args.help) {
  usage();
}

var date;
const date_pattern = /^\s*(\d{4})\D+(\d{1,2})\D+(\d{1,2})((T|\s+)(\d{0,2}):(\d{0,2})(:(\d{1,2}))?)?.*$/;

if (args.date) {
  date = new Date(0);
  var regrps = args.date.match(date_pattern);
  //for (var d in regrps) {
  //  console.log(d + ': "' + regrps[d] + '"');
  //}
  if (regrps && regrps.length >= 4) {
    //console.log("Date RE match: " + regrps[0]);
    date.setUTCFullYear(regrps[1]);
    date.setUTCMonth(regrps[2] - 1);
    date.setUTCDate(regrps[3]);
    if (regrps.length >= 8 && regrps[4] != undefined) {
      //console.log("Hours: " + regrps[6]);
      date.setUTCHours(regrps[6]);
      //console.log("Minutes: " + regrps[7]);
      date.setUTCMinutes(regrps[7]);
      //console.log("RE Groups Count: " + regrps.length + ", RE group 8: " + regrps[8]);
      if (regrps.length >= 10 && regrps[9] !== undefined) {
        //console.log("Seconds: " + regrps[9]);
        date.setUTCSeconds(regrps[9]);
      }
    }
  } else {
    console.log("Bad date format: " + args.date);
    process.exit(1);
  }

} else {
  date = new Date();
}

var longitude = LON;
if (args.long) {
  if ((/-?\d+(\.\d*)?(e-?\d+)?$/).test(args.long)) {
    longitude = args.long;
  } else  {
    console.log("Bad format for longitude: " + args.long);
    process.exit(1);
  }
}

var latitude = LAT;
if (args.lat) {
  if ((/-?\d+(\.\d*)?(e-?\d+)?$/).test(args.lat)) {
    latitude = args.lat;
  } else  {
    console.log("Bad format for latitude: " + args.lat);
    process.exit(1);
  }
}

//console.log("--date: " + date.toUTCString());

console.log("Using latitude " + latitude + ", longitude " + longitude);
console.log("Using date/time " + date.toISOString());
console.log("UTC date: " + date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate());

var sunrise_date = solcalc.findNextSunriseFromDate(date, latitude, longitude);
console.log("Next Sunrise: " + sunrise_date.toISOString());


var sunset_date =  solcalc.findNextSunsetFromDate(date, latitude, longitude);
console.log("Next Sunset: " + sunset_date.toISOString());



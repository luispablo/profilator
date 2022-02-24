# profilator

Zero dependency tool to measure time spent in JavaScript code. You can start and stop each label many times, and profilator will internally save each time sample and present a complete report of where you spent your time.

## Installation

```sh
npm install profilator
```

## How to use

### Taking samples

Start and stop each fraction of the code you want to measure and / or compare with other parts, with a label for each one:

```javascript
const buildProfilator = require("profilator");
const profilator = buildProfilator();
// or
const profilator = require("profilator")(); // if you intend to use only one

profilator.start("set-up");
// ... Any set-up related code
profilator.stop("set-up");

profilator.start("db tasks");
// ... Some code interacting with your DB
profilator.stop("db tasks");

profilator.start("io tasks");
// ... Maybe reading some files
profilator.stop("io tasks");

profilator.start("db tasks");
// ... Some more DB related code
profilator.stop("db tasks");

profilator.start("io tasks");
// ... And now maybe writing some files
profilator.stop("io tasks");
```

### Check how it's going

At any point in time you can check the total time spent for any given label, or all of them:

```javascript
```

### Reporting / showing results

After all your samples are taken, you can get a report of where you spent all your time.

```javascript
const resultsReport = profilator.buildResultsReport();
console.log(resultsReport);
```

This would print this report, ordered by time spent

```sh
TOTAL TIME          1000 ms
db tasks            800 ms (80 %)
io tasks            130 ms (13 %)
set-up              70 ms (7 %)
```

*Each line will display the first 20 characters of the label, any longer one will be truncated.*

const {
  oneIn,
  maybeUpper,
  capitalize,
  random,
  checkSing,
  checkPlur,
  getSing,
  getPlur,
  threeQuarter,
  twoThird
} = require("../utils");
const banks = `./word-banks`;

const warnings = require(`${banks}/warnings`);
const bounties = require(`${banks}/bounties`);

const jobPreN = require(`${banks}/job-prefixes-no-space`);
const jobPreS = require(`${banks}/job-prefixes-space`);
const jobSuff = require(`${banks}/job-suffixes`);
const jobTtlS = require(`${banks}/job-titles-space`);

const { crimeUberPrefs, crimePrefixes } = require(`${banks}/crime-prefixes`);
const { crimeActions, genericCrimes } = require(`${banks}/crimes`);

const firstNames = require(`${banks}/names-first`);
const lastNames = require(`${banks}/names-last`);

const locations = require(`${banks}/locations`);
const {
  decreeActions,
  decreeModifiers,
  decreeAuthorities
} = require(`${banks}/decrees`);
const { dangerStates, dangerGroups } = require(`${banks}/groups`);
const { sentences, verdicts } = require(`${banks}/prosecutions`);

const generateCyberText = () => {
  let compoundTitle;
  let adjectiveTitle;
  let whichTitle;
  let title;
  let singTitle;

  let uberPref;
  let state;
  let group;
  let crimeAction;
  let warning;
  let location;
  let bounty;

  let judgement;
  let fate;

  let firstName;
  let lastName;
  let nickname;
  let fullName;

  let decreeAction;
  let decreeModifier;
  let decreeAuthority;

  let count = 281;
  let warningStatement = "";
  let captureStatement = "";
  let decreeStatement = "";
  let wantedStatement = "";
  let finalStatement;

  const chooseTerms = () => {
    compoundTitle = getSing(jobPreN) + getPlur(jobSuff);
    adjectiveTitle = getSing(jobPreS) + " " + getPlur(jobTtlS);

    compoundSingTitle = getSing(jobPreN) + getSing(jobSuff);
    adjectiveSingTitle = getSing(jobPreS) + " " + getSing(jobTtlS);

    whichTitle = [adjectiveTitle, compoundTitle];
    whichSingTitle = [adjectiveSingTitle, compoundSingTitle];

    title = random(whichTitle);
    singTitle = random(whichSingTitle);

    uberPref = random(crimeUberPrefs) + " ";
    state = random(dangerStates);
    group = random(dangerGroups);
    crimeAction = random(crimeActions);
    warning = capitalize(random(warnings));
    location = random(locations);
    bounty = random(bounties);

    firstName = random(firstNames);
    lastName = random(lastNames);
    nickname = capitalize(
      random([getSing(jobTtlS), getSing(jobSuff), getPlur(genericCrimes)])
    ).replace(/\s/g, "");
    fullName = oneIn(4)
      ? `${firstName} "${nickname}" ${lastName}`
      : `${firstName} ${lastName}`;

    decreeAction = random(decreeActions);
    decreeModifier = random(decreeModifiers);
    decreeAuthority = random(decreeAuthorities);

    judgement = oneIn(5) ? "innocent" : "guilty";
    fate = random(sentences[judgement]) + " " + random(verdicts[judgement]);
  };

  const buildMostWantedStatement = () => {
    let list;
    while (count > 280) {
      const makeNickName = () =>
        capitalize(
          random([getSing(jobTtlS), getSing(jobSuff), getPlur(genericCrimes)])
        );
      // prettier-ignore
      const makeName = () =>
        `${random(firstNames)}${oneIn(4) ? ` "${makeNickName()}"` : ""} ${random(lastNames)}`;
      const makeCrime = () =>
        random(crimePrefixes) + checkSing(random(genericCrimes));
      list = `MCPD MOST WANTED:
  5. ${makeName()}, for ${makeCrime()}
  4. ${makeName()}, for ${makeCrime()}
  3. ${makeName()}, for ${makeCrime()}
  2. ${makeName()}, for ${makeCrime()}
  1. ${makeName()}, for ${makeCrime()}
  Report any sightings to your local MCPD station.`;
      count = list.length;
    }
    return list;
  };

  const buildWarningStatement = () => {
    while (count > 280) {
      chooseTerms();

      const emoji = random([``, ``, `🚨 `]);

      warningStatement =
        emoji +
        warning +
        ": A " +
        group +
        " of " +
        maybeUpper(threeQuarter(state + " ") + title) +
        " " +
        crimeAction +
        " " +
        maybeUpper(
          threeQuarter(uberPref) +
            random(crimePrefixes) +
            checkSing(random(genericCrimes))
        ) +
        threeQuarter(" " + location) +
        ".";

      count = warningStatement.length;
    }
  };

  const buildCaptureStatement = () => {
    while (count > 280) {
      chooseTerms();

      let fullTitle = oneIn(2)
        ? capitalize(singTitle)
        : capitalize(state) + " " + singTitle;

      captureStatement =
        (oneIn(2) ? warning + ": " : "") +
        fullTitle +
        " " +
        maybeUpper(fullName) +
        " has been " +
        fate +
        " " +
        maybeUpper(
          threeQuarter(uberPref) +
            random(crimePrefixes) +
            checkSing(random(genericCrimes))
        ) +
        threeQuarter(" " + location) +
        ".";

      count = captureStatement.length;
    }
  };

  const buildDecreeStatement = () => {
    while (count > 280) {
      chooseTerms();

      const emoji = random([``, `ℹ `]);

      decreeStatement =
        emoji +
        (oneIn(2) ? warning + ": " : "") +
        maybeUpper(
          capitalize(random(crimePrefixes)) + checkSing(random(genericCrimes))
        ) +
        " " +
        maybeUpper(decreeAction) +
        " " +
        twoThird(random([decreeModifier, decreeModifier, location]) + " ") +
        decreeAuthority +
        ".";

      count = decreeStatement.length;
    }
  };

  const buildWantedStatement = () => {
    while (count > 280) {
      chooseTerms();

      let fullTitle = oneIn(2) ? singTitle : state + " " + singTitle;
      let fullCrime =
        threeQuarter(uberPref) +
        random(crimePrefixes) +
        checkSing(random(genericCrimes));
      let finalName = oneIn(2)
        ? `${maybeUpper(fullName)}, ${fullTitle}`
        : `${capitalize(fullTitle)} ${maybeUpper(fullName)}`;
      let rewardType = random([
        ``,
        ``,
        ` for information leading to an arrest`,
        ` for successful capture`,
        ` for successful termination`,
        ` for capture dead or alive`
      ]);

      // prettier-ignore
      const format1 = 
`${random([``, ``, `🚨 `])}WANTED:
${finalName}
For the crime of ${maybeUpper(fullCrime)}
Last ${random(["seen", "sighted", "spotted"])} ${location}
REWARD: ${bounty}`;
      // prettier-ignore
      const format2 = 
`${random([``, `🚨 `])}WANTED for ${fullCrime.toUpperCase()}: 
${finalName}
Last ${random(["seen", "sighted", "spotted"])} ${location}${oneIn(3) ? `
Considered ARMED and DANGEROUS`: ''}
REWARD${rewardType}: ${bounty}`;

      wantedStatement = oneIn(2) ? format1 : format2;

      count = wantedStatement.length;
    }
  };

  const chooseStatement = () => {
    if (oneIn(12)) {
      finalStatement = buildMostWantedStatement();
    } else if (oneIn(8)) {
      buildDecreeStatement();
      finalStatement = decreeStatement;
    } else if (oneIn(5)) {
      buildWantedStatement();
      finalStatement = wantedStatement;
    } else if (oneIn(4)) {
      buildCaptureStatement();
      finalStatement = captureStatement;
    } else {
      buildWarningStatement();
      finalStatement = warningStatement;
    }
  };
  chooseStatement();

  console.log(finalStatement);
  console.log(count);

  return finalStatement;
};

module.exports = generateCyberText;

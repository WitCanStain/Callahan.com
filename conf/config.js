require("dotenv").config();
const env = require("common-env")();

const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(format.colorize(), timestamp(), myFormat),
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new transports.Console({ timestamp: true }),
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// NOTICE ABOUT fhghq URL variable: It MUST start with HTTPS !
// If it starts with HTTP the server/client comms will break under any situation
// where HTTPS is forcibly enforced either by the server or browser
// because the WebSocket functions interpret this variable AS-IS and will
// try to use HTTP if that is what is there !

const config = env.getOrElseAll({
  logger,
  fhghq: {
    url: "https://hq.mreboy.com",
  },
  // STEAM OpenID API Key required in order to use Steam for site login functions. See https://steamcommunity.com/dev/apikey to get one for free. REQUIRES FQDN for sign-up.
  steamApi: {
    key: {
      $default: "Configure key in .env as STEAMAPI_KEY",
      $aliases: ["STEAMAPI_KEY"],
    },
  },
  //DEFAULT: Shard known as ABLE in-game. See https://github.com/clapfoot/warapi/ for full info on WarAPI & endpoints for BAKER or CHARLIE shards if needed
  warApi: {
    liveUrl: "https://war-service-live.foxholeservices.com",
  },
  imageSource: {
    // Source of the loaded in maps or factories. Use this to offload image hosting from the main host and onto github.
    img: {
      $default:
        "https://raw.githubusercontent.com/WitCanStain/Callahan.com/oxblood-dev",
      $aliases: ["IMAGESOURCE_IMG"],
    },
    map_tiles: {
      $default:
        "https://raw.githubusercontent.com/WitCanStain/Callahan.com/oxblood-dev",
      $aliases: ["IMAGESOURCE_MAP_TILES"],
    },
  },
  // ALL DISCORD FUNCTIONS WERE COMMENTED OUT SOME TIME AGO - DON'T BOTHER PUTTING ANYTHING HERE
  discord: {
    token: "",
  },
  sqlLite: {
    fileNameGiven: {
      $default: "./.data/FHGHQ.db",
      $aliases: ["SQLLITE_FILENAME_GIVEN"],
    },
  },
});

module.exports = config;

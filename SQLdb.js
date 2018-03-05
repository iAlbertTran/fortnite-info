const sqlite3 = require("sqlite3").verbose();

const dbFile = "fortniteUserData.db";


const db = new sqlite3.Database(dbFile);
//If no db, initialize it;

const userInfo = "CREATE TABLE IF NOT EXISTS playerData (PLAYERNAME text, PLATFORM text, PRIMARY KEY(PLAYERNAME, PLATFORM))";

const overallStats = "CREATE TABLE IF NOT EXISTS overallStats (PLAYERNAME text, PLATFORM text, WINS int, TOP_3 int, TOP_5s int, TOP_6s int, TOP_12s int, TOP_25s int, SCORE int, MATCHES_PLAYED int, WIN_PERCENTAGE double, KILLS int, KD_Ratio double, KILLS_PER_MIN double, TIME_PLAYED text, AVG_SURVIVAL_TIME text, PRIMARY KEY(PLAYERNAME, PLATFORM))";

const overallStats_solos = "CREATE TABLE IF NOT EXISTS overallStats_solos (PLAYERNAME text, PLATFORM text, WINS int, TOP_3 int, TOP_5 int, TOP_6 int, TOP_10 int, TOP_12 int, TOP_25 int, MATCHES int, WIN_PERCENTAGE double, TIME_PLAYED int, KILLS_PER_MIN double, KILLS_PER_MATCH double, KILLS int, AVG_MATCH_TIME double, SCORE_PER_MATCH double, SCORE_PER_MIN double, SCORE int, KD_RATIO double, TRN_RATING int, PRIMARY KEY(PLAYERNAME, PLATFORM))";
const overallStats_duos = "CREATE TABLE IF NOT EXISTS overallStats_duos (PLAYERNAME text, PLATFORM text, WINS int, TOP_3 int, TOP_5 int, TOP_6 int, TOP_10 int, TOP_12 int, TOP_25 int, MATCHES int, WIN_PERCENTAGE double, TIME_PLAYED int, KILLS_PER_MIN double, KILLS_PER_MATCH double, KILLS int, AVG_MATCH_TIME double, SCORE_PER_MATCH double, SCORE_PER_MIN double, SCORE int, KD_RATIO double, TRN_RATING int, PRIMARY KEY(PLAYERNAME, PLATFORM))";
const overallStats_squads = "CREATE TABLE IF NOT EXISTS overallStats_squads (PLAYERNAME text, PLATFORM text, WINS int, TOP_3 int, TOP_5 int, TOP_6 int, TOP_10 int, TOP_12 int, TOP_25 int, MATCHES int, WIN_PERCENTAGE double, TIME_PLAYED int, KILLS_PER_MIN double, KILLS_PER_MATCH double, KILLS int, AVG_MATCH_TIME double, SCORE_PER_MATCH double, SCORE_PER_MIN double, SCORE int, KD_RATIO double, TRN_RATING int, PRIMARY KEY(PLAYERNAME, PLATFORM))";

const seasonStats_solos = "CREATE TABLE IF NOT EXISTS seasonStats_solos (PLAYERNAME text, PLATFORM text, WINS int, TOP_3 int, TOP_5 int, TOP_6 int, TOP_10 int, TOP_12 int, TOP_25 int, MATCHES int, WIN_PERCENTAGE double, TIME_PLAYED int, KILLS_PER_MIN double, KILLS_PER_MATCH double, KILLS int, AVG_MATCH_TIME double, SCORE_PER_MATCH double, SCORE_PER_MIN double, SCORE int, KD_RATIO double, TRN_RATING int, PRIMARY KEY(PLAYERNAME, PLATFORM))";
const seasonStats_duos = "CREATE TABLE IF NOT EXISTS seasonStats_duos (PLAYERNAME text, PLATFORM text, WINS int, TOP_3 int, TOP_5 int, TOP_6 int, TOP_10 int, TOP_12 int, TOP_25 int, MATCHES int, WIN_PERCENTAGE double, TIME_PLAYED int, KILLS_PER_MIN double, KILLS_PER_MATCH double, KILLS int, AVG_MATCH_TIME double, SCORE_PER_MATCH double, SCORE_PER_MIN double, SCORE int, KD_RATIO double, TRN_RATING int, PRIMARY KEY(PLAYERNAME, PLATFORM))";
const seasonStats_squads = "CREATE TABLE IF NOT EXISTS seasonStats_squads (PLAYERNAME text, PLATFORM text, WINS int, TOP_3 int, TOP_5 int, TOP_6 int, TOP_10 int, TOP_12 int, TOP_25 int, MATCHES int, WIN_PERCENTAGE double, TIME_PLAYED int, KILLS_PER_MIN double, KILLS_PER_MATCH double, KILLS int, AVG_MATCH_TIME double, SCORE_PER_MATCH double, SCORE_PER_MIN double, SCORE int, KD_RATIO double, TRN_RATING int, PRIMARY KEY(PLAYERNAME, PLATFORM))";

db.run(userInfo);
db.run(overallStats);

db.run(overallStats_solos);
db.run(overallStats_duos);
db.run(overallStats_squads);

db.run(seasonStats_solos);
db.run(seasonStats_duos);
db.run(seasonStats_squads);

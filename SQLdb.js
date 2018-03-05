const sqlite3 = require('sqlite3').verbose();

const dbFile = 'fortniteUserData.db';


const db = new sqlite3.Database(dbFile);
//If no db, initialize it;

const userInfo = "CREATE TABLE IF NOT EXISTS playerData (PLAYERNAME text, PLATFORM text, PRIMARY KEY(PLAYERNAME, PLATFORM))";

const overallStats = "CREATE TABLE IF NOT EXISTS overall (PLAYERNAME text, PLATFORM text, 'Top 3' string, 'Top 5s' string, 'Top 6s' string, 'Top 12s' string, 'Top 25s' string, 'Score' string, 'Matches Played' string, 'Wins' string, 'Win%' string, 'Kills' string, 'K/d' string, 'Kills Per Min' string, 'Time Played' string, 'Avg Survival Time' string, PRIMARY KEY(PLAYERNAME, PLATFORM))"; 

const overallStats_solo = "CREATE TABLE IF NOT EXISTS overall_solo (PLAYERNAME text, PLATFORM text, 'TRN Rating' string, 'Score' string, 'Wins' string, 'Top 3' string, 'Top 5' string, 'Top 6' string, 'Top 10' string, 'Top 12' string, 'Top 25' string, 'K/d' string, 'Win %' string, 'Matches' string, 'Kills' string, 'Time Played' string, 'Kills Per Min' string, 'Kills Per Match' string, 'Avg Match Time' string, 'Score per Match' string, 'Score per Minute' string, PRIMARY KEY(PLAYERNAME, PLATFORM))";  
const overallStats_duo = "CREATE TABLE IF NOT EXISTS overall_duo (PLAYERNAME text, PLATFORM text,'TRN Rating' string, 'Score' string, 'Wins' string, 'Top 3' string, 'Top 5' string, 'Top 6' string, 'Top 10' string, 'Top 12' string, 'Top 25' string, 'K/d' string, 'Win %' string, 'Matches' string, 'Kills' string, 'Time Played' string, 'Kills Per Min' string, 'Kills Per Match' string, 'Avg Match Time' string, 'Score per Match' string, 'Score per Minute' string, PRIMARY KEY(PLAYERNAME, PLATFORM))"; 
const overallStats_squad = "CREATE TABLE IF NOT EXISTS overall_squads (PLAYERNAME text, PLATFORM text,'TRN Rating' string, 'Score' string, 'Wins' string, 'Top 3' string, 'Top 5' string, 'Top 6' string, 'Top 10' string, 'Top 12' string, 'Top 25' string, 'K/d' string, 'Win %' string, 'Matches' string, 'Kills' string, 'Time Played' string, 'Kills Per Min' string, 'Kills Per Match' string, 'Avg Match Time' string, 'Score per Match' string, 'Score per Minute' string, PRIMARY KEY(PLAYERNAME, PLATFORM))"; 

const seasonStats_solo = "CREATE TABLE IF NOT EXISTS season_solo (PLAYERNAME text, PLATFORM text,'TRN Rating' string, 'Score' string, 'Wins' string, 'Top 3' string, 'Top 5' string, 'Top 6' string, 'Top 10' string, 'Top 12' string, 'Top 25' string, 'K/d' string, 'Win %' string, 'Matches' string, 'Kills' string, 'Time Played' string, 'Kills Per Min' string, 'Kills Per Match' string, 'Avg Match Time' string, 'Score per Match' string, 'Score per Minute' string, PRIMARY KEY(PLAYERNAME, PLATFORM))"; 
const seasonStats_duo = "CREATE TABLE IF NOT EXISTS season_duo (PLAYERNAME text, PLATFORM text,'TRN Rating' string, 'Score' string, 'Wins' string, 'Top 3' string, 'Top 5' string, 'Top 6' string, 'Top 10' string, 'Top 12' string, 'Top 25' string, 'K/d' string, 'Win %' string, 'Matches' string, 'Kills' string, 'Time Played' string, 'Kills Per Min' string, 'Kills Per Match' string, 'Avg Match Time' string, 'Score per Match' string, 'Score per Minute' string, PRIMARY KEY(PLAYERNAME, PLATFORM))"; 
const seasonStats_squad = "CREATE TABLE IF NOT EXISTS season_squad (PLAYERNAME text, PLATFORM text,'TRN Rating' string, 'Score' string, 'Wins' string, 'Top 3' string, 'Top 5' string, 'Top 6' string, 'Top 10' string, 'Top 12' string, 'Top 25' string, 'K/d' string, 'Win %' string, 'Matches' string, 'Kills' string, 'Time Played' string, 'Kills Per Min' string, 'Kills Per Match' string, 'Avg Match Time' string, 'Score per Match' string, 'Score per Minute' string, PRIMARY KEY(PLAYERNAME, PLATFORM))"; 

db.run(userInfo);
db.run(overallStats);

db.run(overallStats_solo);
db.run(overallStats_duo);
db.run(overallStats_squad);

db.run(seasonStats_solo);
db.run(seasonStats_duo);
db.run(seasonStats_squad);

const sqlite3 = require('sqlite3').verbose();

const dbFile = 'fortniteUserData.db';


const db = new sqlite3.Database(dbFile);
//If no db, initialize it;

const overallStats = "CREATE TABLE IF NOT EXISTS overall ('User' string, 'Platform' string, 'Wins' string, 'Top 3' string, 'Top 3s' string, 'Top 5s' string, 'Top 6s' string, 'Top 12s' string, 'Top 25s' string, 'Matches Played' string, 'Win%' string, 'Score' string, 'Kills' string, 'K/d' string, 'Kills Per Min' string, 'Time Played' string, 'Avg Survival Time' string, PRIMARY KEY('User', 'Platform'))"; 

const overallStats_solo = "CREATE TABLE IF NOT EXISTS overall_solo ('User' string, 'Platform' string, 'Wins' string, 'Top 3' string, 'Top 5' string, 'Top 6' string, 'Top 10' string, 'Top 12' string, 'Top 25' string, 'Matches' string, 'Win %' string, 'Kills' string, 'Kills Per Min' string, 'Kills Per Match' string, 'Avg Match Time' string, 'K/d' string, 'Time Played' string, 'Score per Match' string, 'Score per Minute' string, 'Score' string, 'TRN Rating' string, PRIMARY KEY('User', 'Platform'))";  
const overallStats_duo = "CREATE TABLE IF NOT EXISTS overall_duo ('User' string, 'Platform' string, 'Wins' string, 'Top 3' string, 'Top 5' string, 'Top 6' string, 'Top 10' string, 'Top 12' string, 'Top 25' string, 'Matches' string, 'Win %' string, 'Kills' string, 'Kills Per Min' string, 'Kills Per Match' string, 'Avg Match Time' string, 'K/d' string, 'Time Played' string, 'Score per Match' string, 'Score per Minute' string, 'Score' string, 'TRN Rating' string, PRIMARY KEY('User', 'Platform'))";
const overallStats_squad = "CREATE TABLE IF NOT EXISTS overall_squad ('User' string, 'Platform' string, 'Wins' string, 'Top 3' string, 'Top 5' string, 'Top 6' string, 'Top 10' string, 'Top 12' string, 'Top 25' string, 'Matches' string, 'Win %' string, 'Kills' string, 'Kills Per Min' string, 'Kills Per Match' string, 'Avg Match Time' string, 'K/d' string, 'Time Played' string, 'Score per Match' string, 'Score per Minute' string, 'Score' string, 'TRN Rating' string, PRIMARY KEY('User', 'Platform'))";

const seasonStats_solo = "CREATE TABLE IF NOT EXISTS season_solo ('User' string, 'Platform' string, 'Wins' string, 'Top 3' string, 'Top 5' string, 'Top 6' string, 'Top 10' string, 'Top 12' string, 'Top 25' string, 'Matches' string, 'Win %' string, 'Kills' string, 'Kills Per Min' string, 'Kills Per Match' string, 'Avg Match Time' string, 'K/d' string, 'Time Played' string, 'Score per Match' string, 'Score per Minute' string, 'Score' string, 'TRN Rating' string, PRIMARY KEY('User', 'Platform'))";
const seasonStats_duo = "CREATE TABLE IF NOT EXISTS season_duo ('User' string, 'Platform' string, 'Wins' string, 'Top 3' string, 'Top 5' string, 'Top 6' string, 'Top 10' string, 'Top 12' string, 'Top 25' string, 'Matches' string, 'Win %' string, 'Kills' string, 'Kills Per Min' string, 'Kills Per Match' string, 'Avg Match Time' string, 'K/d' string, 'Time Played' string, 'Score per Match' string, 'Score per Minute' string, 'Score' string, 'TRN Rating' string, PRIMARY KEY('User', 'Platform'))";
const seasonStats_squad = "CREATE TABLE IF NOT EXISTS season_squad ('User' string, 'Platform' string, 'Wins' string, 'Top 3' string, 'Top 5' string, 'Top 6' string, 'Top 10' string, 'Top 12' string, 'Top 25' string, 'Matches' string, 'Win %' string, 'Kills' string, 'Kills Per Min' string, 'Kills Per Match' string, 'Avg Match Time' string, 'K/d' string, 'Time Played' string, 'Score per Match' string, 'Score per Minute' string, 'Score' string, 'TRN Rating' string, PRIMARY KEY('User', 'Platform'))";

db.run(overallStats);

db.run(overallStats_solo);
db.run(overallStats_duo);
db.run(overallStats_squad);

db.run(seasonStats_solo);
db.run(seasonStats_duo);
db.run(seasonStats_squad);

const sqlite3 = require('sqlite3').verbose();

const dbFile = 'fortniteUserData.db';


const db = new sqlite3.Database(dbFile);
//If no db, initialize it;

const overallStats = "CREATE TABLE IF NOT EXISTS overall ('User' string, 'Platform' string, 'Wins' string DEFAULT '0', 'Top 3' string DEFAULT '0', 'Top 3s' string DEFAULT '0', 'Top 5s' string DEFAULT '0', 'Top 6s' string DEFAULT '0', 'Top 12s' string DEFAULT '0', 'Top 25s' string DEFAULT '0', 'Matches Played' string DEFAULT '0', 'Win%' string DEFAULT '0', 'Score' string DEFAULT '0', 'Kills' string DEFAULT '0', 'K/d' string DEFAULT '0', 'Kills Per Min' string DEFAULT '0', 'Time Played' string DEFAULT '0', 'Avg Survival Time' string DEFAULT '0', PRIMARY KEY('User', 'Platform'))"; 

const overallStats_solo = "CREATE TABLE IF NOT EXISTS overall_solo ('User' string, 'Platform' string, 'Wins' string DEFAULT '0', 'Top 3' string DEFAULT '0', 'Top 5' string DEFAULT '0', 'Top 6' string DEFAULT '0', 'Top 10' string DEFAULT '0', 'Top 12' string DEFAULT '0', 'Top 25' string DEFAULT '0', 'Matches' string DEFAULT '0', 'Win %' string DEFAULT '0', 'Kills' string DEFAULT '0', 'Kills Per Min' string DEFAULT '0', 'Kills Per Match' string DEFAULT '0', 'Avg Match Time' string DEFAULT '0', 'K/d' string DEFAULT '0', 'Time Played' string DEFAULT '0', 'Score per Match' string DEFAULT '0', 'Score per Minute' string DEFAULT '0', 'Score' string DEFAULT '0', 'TRN Rating' string DEFAULT '0', PRIMARY KEY('User', 'Platform'))";
const overallStats_duo = "CREATE TABLE IF NOT EXISTS overall_duo ('User' string, 'Platform' string, 'Wins' string DEFAULT '0', 'Top 3' string DEFAULT '0', 'Top 5' string DEFAULT '0', 'Top 6' string DEFAULT '0', 'Top 10' string DEFAULT '0', 'Top 12' string DEFAULT '0', 'Top 25' string DEFAULT '0', 'Matches' string DEFAULT '0', 'Win %' string DEFAULT '0', 'Kills' string DEFAULT '0', 'Kills Per Min' string DEFAULT '0', 'Kills Per Match' string DEFAULT '0', 'Avg Match Time' string DEFAULT '0', 'K/d' string DEFAULT '0', 'Time Played' string DEFAULT '0', 'Score per Match' string DEFAULT '0', 'Score per Minute' string DEFAULT '0', 'Score' string DEFAULT '0', 'TRN Rating' string DEFAULT '0', PRIMARY KEY('User', 'Platform'))";
const overallStats_squad = "CREATE TABLE IF NOT EXISTS overall_squad ('User' string, 'Platform' string, 'Wins' string DEFAULT '0', 'Top 3' string DEFAULT '0', 'Top 5' string DEFAULT '0', 'Top 6' string DEFAULT '0', 'Top 10' string DEFAULT '0', 'Top 12' string DEFAULT '0', 'Top 25' string DEFAULT '0', 'Matches' string DEFAULT '0', 'Win %' string DEFAULT '0', 'Kills' string DEFAULT '0', 'Kills Per Min' string DEFAULT '0', 'Kills Per Match' string DEFAULT '0', 'Avg Match Time' string DEFAULT '0', 'K/d' string DEFAULT '0', 'Time Played' string DEFAULT '0', 'Score per Match' string DEFAULT '0', 'Score per Minute' string DEFAULT '0', 'Score' string DEFAULT '0', 'TRN Rating' string DEFAULT '0', PRIMARY KEY('User', 'Platform'))";

const seasonStats_solo = "CREATE TABLE IF NOT EXISTS season_solo ('User' string, 'Platform' string, 'Wins' string DEFAULT '0', 'Top 3' string DEFAULT '0', 'Top 5' string DEFAULT '0', 'Top 6' string DEFAULT '0', 'Top 10' string DEFAULT '0', 'Top 12' string DEFAULT '0', 'Top 25' string DEFAULT '0', 'Matches' string DEFAULT '0', 'Win %' string DEFAULT '0', 'Kills' string DEFAULT '0', 'Kills Per Min' string DEFAULT '0', 'Kills Per Match' string DEFAULT '0', 'Avg Match Time' string DEFAULT '0', 'K/d' string DEFAULT '0', 'Time Played' string DEFAULT '0', 'Score per Match' string DEFAULT '0', 'Score per Minute' string DEFAULT '0', 'Score' string DEFAULT '0', 'TRN Rating' string DEFAULT '0', PRIMARY KEY('User', 'Platform'))";
const seasonStats_duo = "CREATE TABLE IF NOT EXISTS season_duo ('User' string, 'Platform' string, 'Wins' string DEFAULT '0', 'Top 3' string DEFAULT '0', 'Top 5' string DEFAULT '0', 'Top 6' string DEFAULT '0', 'Top 10' string DEFAULT '0', 'Top 12' string DEFAULT '0', 'Top 25' string DEFAULT '0', 'Matches' string DEFAULT '0', 'Win %' string DEFAULT '0', 'Kills' string DEFAULT '0', 'Kills Per Min' string DEFAULT '0', 'Kills Per Match' string DEFAULT '0', 'Avg Match Time' string DEFAULT '0', 'K/d' string DEFAULT '0', 'Time Played' string DEFAULT '0', 'Score per Match' string DEFAULT '0', 'Score per Minute' string DEFAULT '0', 'Score' string DEFAULT '0', 'TRN Rating' string DEFAULT '0', PRIMARY KEY('User', 'Platform'))";
const seasonStats_squad = "CREATE TABLE IF NOT EXISTS season_squad ('User' string, 'Platform' string, 'Wins' string DEFAULT '0', 'Top 3' string DEFAULT '0', 'Top 5' string DEFAULT '0', 'Top 6' string DEFAULT '0', 'Top 10' string DEFAULT '0', 'Top 12' string DEFAULT '0', 'Top 25' string DEFAULT '0', 'Matches' string DEFAULT '0', 'Win %' string DEFAULT '0', 'Kills' string DEFAULT '0', 'Kills Per Min' string DEFAULT '0', 'Kills Per Match' string DEFAULT '0', 'Avg Match Time' string DEFAULT '0', 'K/d' string DEFAULT '0', 'Time Played' string DEFAULT '0', 'Score per Match' string DEFAULT '0', 'Score per Minute' string DEFAULT '0', 'Score' string DEFAULT '0', 'TRN Rating' string DEFAULT '0', PRIMARY KEY('User', 'Platform'))";

db.run(overallStats);

db.run(overallStats_solo);
db.run(overallStats_duo);
db.run(overallStats_squad);

db.run(seasonStats_solo);
db.run(seasonStats_duo);
db.run(seasonStats_squad);

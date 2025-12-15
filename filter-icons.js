const fs = require('fs');

// Read the icon.scss file
const content = fs.readFileSync('src/utils/icon.scss', 'utf8');
const lines = content.split('\n');

// Comprehensive list of sport/e-sport names to keep (case-sensitive)
const sportNames = new Set([
    // Default
    'default-icon', 'DefaultIcon',
    
    // Traditional Sports
    'Soccer', 'Football', 'football', 'Basketball', 'Tennis', 'Volleyball', 
    'TableTennis', 'IceHockey', 'E-IceHockey', 'Baseball', 'Handball', 'HandBall',
    'AmericanFootball', 'AlpineSkiing', 'BallHockey', 'PistolShooting', 'Biathlon',
    'Armwrestling', 'Boxing', 'Chess', 'Cricket', 'Curling', 'Darts', 'Hockey',
    'Floorball', 'Formula1', 'Futsal', 'Golf', 'Lacross', 'Mma', 'Olympics',
    'RugbyLeague', 'RugbyUnion', 'RugbySevens', 'Snooker', 'Speedway', 'SpeedWay',
    'WaterPolo', 'Archery', 'ArcheryH2H', 'CompoundArchery', 'CompoundArchery1',
    'Badminton', 'BeachVolleyball', 'Squash', 'Motorsport', 'MotorSport', 'Motorbikes',
    'Cycling', 'CycloCross', 'Cyclo-Cross', 'Horse', 'HorseRacing', 'GaelicFootball',
    'GaelicHurling', 'Hurling', 'TVShowsAndMovies', 'TV1', 'Telecasts', 'TeleCasts',
    'Politics', 'Eurovision', 'CrossCountrySkiing', 'AutoRacing', 'WWE',
    'Entertainment', 'Go', 'Sepaktakraw', 'SepakTakraw', 'Headis', 'Teqball',
    'VirtualMarbleRacing', 'Kabaddi', 'Petanque', 'Bodybuilding-icon', 'BodyBuilding',
    'FIFA', 'circuit', 'Circuit', 'Bowls', 'TableHockey', 'vbet-sport-icons_tablehockey',
    'TankBiathlon', 'vbet-sport-icons_tankbiathlon', 'MarathonSwimming', 'Skateboarding',
    'SkateBoarding', 'SynchronizedSwimming', 'SynchronizedSwimmingF', 'SynchronisedSwimming',
    'Climbing', 'Equestrian', 'Karate', 'Yachting1', 'vbet-sport-icons_yachting',
    'Balls', 'sport', 'Angling', 'AustralianFootball', '3x3', '3x3Basketball', 'Softball',
    'BasketballShots', 'BeachHandball', 'BeachFootball', 'Bobsleigh', 'Bridge', 'Diving',
    'X-Sports', 'XSports', 'Fencing', 'FigureSkating', 'GrassHockey', 'Gymnastics',
    'Weightlifting', 'AirHockey', 'Judo', 'Livemonitor', 'LiveMonitor', 'MiniSoccer',
    'Greyhounds', 'VirtualGreyhoundRacing', 'GreyHounds', 'PMUHorseRacing',
    'FutureHorseRacing', 'ModernPentathlon', 'VirtualHorses', 'HorseRacingSpecials',
    'VSHorses', 'VirtualDogs', 'VirtualHorseRacing', 'Rally', 'BigCityCars', 'Nascar',
    'VirtualDragRacing', 'Netball', 'WinterOlympics', 'Oscar', 'Pesapallo', 'Pool',
    'RinkHockey', 'Canoeing', 'Rowing', 'Shooting', 'Skeleton', 'Swimming', 'DiscGolf',
    'vbet-sport-icons_waterpolo', 'Schwingen', 'FreestyleWrestling', 'GrecoRomanWrestling',
    'Wrestling', 'Athletics', 'Luge', 'Speedskating', 'SpeedSakting', 'ShortTrackSpeedSkating',
    'Skis', 'SkiJumping', 'UltimateFrisbee', 'NordicCombined', 'Snowboard',
    'VirtualFootballPro', 'SoccerWC2014', 'SpecialBets', 'Sumo', 'Surfing', 'Tablehockey',
    'Taekwondo', 'vbet-sport-icons_taekwondo', 'Tankbiathlon', 'Triathlon',
    'vbet-sport-icons_triathlon', 'UltimateFighting', 'SportFight',
    'vbet-sport-icons_ultimatefighting', 'UFS', 'Padel', 'VirtualTennis',
    'vbet-sport-icons_tabletennis', 'Pickleball', 'VirtualBicycle',
    'ETennis', 'eTennis', 'EBasketball', 'eBasketball',
    
    // E-Sports
    'CallOfDuty', 'CounterStrike', 'Dota2', 'LeagueOfLegends', 'LeagueofLegendsWildRift',
    'Valorant', 'KingOfGlory', 'RainbowSix', 'ApexLegends', 'MobileLegends', 'FreeFire',
    'FeeFire', 'ArenaofValor', 'ArenaOfValor', 'AgeofEmpires', 'AgeOfEmpires', 'PUBG',
    'PubG', 'RocketLeague', 'WarcraftIII', 'WarCraftIII', 'StreetFighterSymbol',
    'Esports', 'eSports', 'eSports_logo_sportbook', 'eSportsLogoSportbook', 'CrossFire',
    'Halo', 'halo', 'HaloF', 'HON', 'Hon', 'Vainglory', 'VirtualCarRacing',
    'BrawlStars', 'HeroesOfTheStorm', 'Hearthstone', 'MortalKombatXL', 'WorldOfTanks',
    'WorldOfWarcraft', 'Overwatch', 'Smite', 'smash', 'Smash', 'StarCraft', 'StarCraft2',
    'ClashRoyale', 'CyberFootball', 'PS4GAMING', 'PS4Gaming',
    
    // Numeric IDs that map to sports (keep these)
    '4000235', '4000236', '4000238', '4000239', '4000240', '400037037', '4000509',
    '420070', '420071', '4200235', '420033728', '150025', '33060323', '420031330',
    '420031083', '420019282', '55', '333',
    
    // Penalty/Game variants (sport-related)
    'missed-penalty', 'MissedPenalty', 'penalty', 'penality', 'Penalty333',
    'ThePenaltyKicks',
    
    // Virtual sports
    'VirtualFootballPro', 'VirtualTennis', 'VirtualBicycle', 'VirtualCarRacing',
    'VirtualMarbleRacing', 'VirtualGreyhoundRacing', 'VirtualHorses', 'VirtualHorseRacing',
    'VirtualDogs', 'VirtualDragRacing'
]);

// Keep header (font-face and base styles)
const headerEndIndex = lines.findIndex(line => line.trim().startsWith('.bc-i-default-icon'));
const header = lines.slice(0, headerEndIndex).join('\n');

// Filter icon classes
const iconLines = lines.slice(headerEndIndex);
const filtered = iconLines.filter(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed === '}') return true; // Keep empty lines and closing braces
    
    const match = trimmed.match(/^\.bc-i-([^:]+):before/);
    if (!match) return true; // Keep non-icon lines (comments, etc.)
    
    const className = match[1];
    return sportNames.has(className);
});

const result = header + '\n' + filtered.join('\n');
fs.writeFileSync('src/utils/icon.scss', result);
console.log(`Filtered icon.scss - kept ${filtered.length} sport/e-sport icon classes`);


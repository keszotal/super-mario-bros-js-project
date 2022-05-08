const speed = 128;                          // set mario move speed
const jumpPower = 512;                      // set mario jump power
const startMarioPos = {
    x: 5, 
    y: 280,
};                                          // set mario start position
const maxHearts = 3;                        // set mario health on 3
const enemySpeed = 60;                      // set little annoying creatures speed
const secretPos = {                         // secret room coords [x, y]
    startX: 390,
    endX: 440,
    y: 280,
};
const secret2Pos = {                         // secret room coords [x, y]
    startX: 380,
    endX: 440,
    y: 280,
};      
const goTo2Lvl = {
    startX: 585,
    endX: 635,
    y: 280,
}
const goTo3Lvl = {
    startX: 920,
    endX: 980,
    y: 160,
}    
const bigMarioTime = 5000                   // time in ms (5000 = 5sec)        
const endGamePos = {
    startX: 840,
    endX: 900,
    y: 160,
}

let levelCfg = [                            // create a level based on symbols
    "",          // DO 
    "",          // NOT
    "",          // EDIT
    "",          // THIS
    "",          // SPACE
    "",          // ...
    "",          // STILL
    "  ",        // ...
    "                                                   ",          // <- HERE YOU CAN EDIT
    "                                                   ",
    "                                                   ",
    "                                                   ",
    "                                                   ",
    "     ?                                            ",
    "                                                   ",
    "                    ()        ()                   ",
    "               !   ![]        []                   ",
    "______________________   __________________________",
    "                                                   ",
    "                                                   ",
];

let level2Cfg = [                            // create a level based on symbols
"",          // DO 
"",          // NOT
"",          // EDIT
"",          // THIS
"",          // SPACE
"",          // ...
"",          // STILL
"  ",        // ...
"                                                       ",          // <- HERE YOU CAN EDIT
"                        !               ?      ()      ",          
"                      ______   ?    __         []      ",
"                _?_                          _____     ",
"           _                                           ",
"                                                       ",
"      ?                                                ",
"                    ()                                 ",
"                    []                                 ",
"           !    !   []                                 ",
"___________________________________________________    ",
"                                                       ",
"                                                       ",
];

const level3Cfg = [
    "",          // DO 
    "",          // NOT
    "",          // EDIT
    "",          // THIS
    "",          // SPACE
    "",          // ...
    "",          // STILL
    "______________________________________________________",      // <- HERE YOU CAN EDIT
    "                                                      ",       
    "                                           ()         ",          
    "   *                                       []         ",
    "   _ _                             _    ______        ",
    "                         _       __                   ",
    "         _          __     ___         _              ",
    "              ____                                    ",
    "           _                                          ",
    "   ?   _                                              ",
    "                       !    !           !             ",
    "                                                      ",
    "                                                      ",
    "__  __  __  __  __  __  __  __  __  __  __  __  __    ",
];

const secretCfg = [                            // create a level based on symbols
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "___________________________",
    "_                         _",
    "_                         _",
    "_                         _",
    "_                         _",
    "_                        &_",
    "_                      xxx_",
    "_               *   xxxxxx_",
    "_           xxxxxxxxxxxxxx_",
    "_          xxxxxxxxxxxxxxx_",
    "_         xxxxxxxxxxxxxxxx_",
    "_        xxxxxxxxxxxxxxxxx_",
    "___________________________",
    "                           ",
    "                           ",
];
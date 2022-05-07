const speed = 128;                          // set mario move speed
const jumpPower = 512;                      // set mario jump power
const startMarioPos = [30, 80];             // set mario start position
const maxHearts = 3;                        // set mario health on 3
const enemySpeed = 60;                      // set little annoying creatures speed
const secretPos = {                         // secret room coords [x, y]
    startX: 390,
    endX: 440,
    y: 280,
};   
const goTo2Lvl = {
    startX: 585,
    endX: 635,
    y: 280,
}    
const bigMarioTime = 5000                   // time in ms (5000 = 5sec)        

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

const level2Cfg = [                            // create a level based on symbols
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
"                                                   ",
"                                                   ",
"                                                   ",
"                                                   ",
"___________________________________________________",
"                                                   ",
"                                                   ",
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
    "_                   xxxxxx_",
    "_           xxxxxxxxxxxxxx_",
    "_          xxxxxxxxxxxxxxx_",
    "_         xxxxxxxxxxxxxxxx_",
    "_        xxxxxxxxxxxxxxxxx_",
    "___________________________",
    "                           ",
    "                           ",
];
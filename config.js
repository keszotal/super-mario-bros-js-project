const speed = 128;                          // set mario move speed
const jumpPower = 512;                      // set mario jump power
const startMarioPos = [30, 80];             // set mario start position
const maxHearts = 3;                        // set mario health on 3
const enemySpeed = 60;                      // set little annoying creatures speed
const secretPos = {                         // secret room coords [x, y]
    x: 390,
    y: 440,
};                

let levelCfg = [                            // create a level based on symbols
    "",          // DO 
    "",          // NOT
    "",          // EDIT
    "",          // THIS
    "",          // SPACE
    "",          // ...
    "",          // STILL
    "  ",        // ...
    "                           ",          // <- HERE YOU CAN EDIT
    "                           ",
    "                           ",
    "                           ",
    "      ?                    ",
    "                           ",
    "                           ",
    "                    ()     ",
    "           !    !   []     ",
    "___________________________________________________",
    "                           ",
    "                           ",
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
    "_               o   xxxxxx_",
    "_           xxxxxxxxxxxxxx_",
    "_          xxxxxxxxxxxxxxx_",
    "_         xxxxxxxxxxxxxxxx_",
    "_        xxxxxxxxxxxxxxxxx_",
    "___________________________",
    "                           ",
    "                           ",
];
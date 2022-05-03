const speed = 128;                          // mario move speed
const jumpPower = 512;                      // mario jump power
const maxHearts = 3;                            // set mario health on 3
const enemySpeed = 60
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
]
let levelCfg = [                            // create a level based on symbols
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "  ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "    ?????                  ",
    "                           ",
    "                           ",
    "                    ()     ",
    "           !    !   []     ",
    "______________________  ___",
    "                           ",
    "                           ",
]
const startMarioPos = [30, 80]

function dead(hearts, secretUsed) {
    hearts--;
    if(!hearts==0) {
        go('main', startMarioPos[0], startMarioPos[1], hearts, secretUsed);
    }
    else {
        go('gameOver');
    }
}

kaboom({
    fullscreen: true,
    background: [0, 0, 0],
    scale: 2,
});

loadSprite('floor', 'https://i.imgur.com/TYMzX2g.png');                         // load sprites from imgur
loadSprite('green-column-bottom-left', 'https://i.imgur.com/yhzWiFr.png');
loadSprite('green-column-bottom-right', 'https://i.imgur.com/GkJP8Af.png');
loadSprite('green-column-top-left', 'https://i.imgur.com/Llzbgb9.png');
loadSprite('green-column-top-right', 'https://i.imgur.com/Pcrsj4X.png');
loadSprite('flower', 'https://i.imgur.com/icLyjrk.png');
loadSprite('question-mark', 'https://i.imgur.com/FcoIfvM.png');
loadSprite('mushroom-boost', 'https://i.imgur.com/5Kcunol.png');
loadSprite('coin', 'https://i.imgur.com/jlHU7q8.png');
loadSprite('floor-alt', 'https://i.imgur.com/ycnO4bJ.png');
loadSprite('mushroom-leftstep', 'https://i.imgur.com/I4RZMlO.png');
loadSprite('block-alt', 'https://i.imgur.com/1Uz5RWV.png');
loadSprite('mushroom-rightstep-alt', 'https://i.imgur.com/POGTM9v.png');
loadSprite('mario', 'https://i.imgur.com/MYVdCje.png');
loadSprite('const-block-alt', 'https://i.imgur.com/6zTMyhI.png');
loadSprite('mushroom-rightstep', 'https://i.imgur.com/lDfeB7r.png');
loadSprite('block', 'https://i.imgur.com/Kc39uFk.png');
loadSprite('heart', 'https://i.imgur.com/a9BjaKa.png');
loadSprite('gameOver', 'https://i.imgur.com/zdD9e1o.jpg')

scene('start', (hearts) => {

    add([
        pos(10, 10),
        text('Fullscreen recomended (F11) and refresh page (F5)', {
            size: 20,
            font: 'sink',
        }), 
    ])

    add([
        pos(100, 100),
        text('ENTER to continue', {
            size: 24,
            font: 'sink',
        }), 
    ])

    add([
        pos(100, 125),
        text("if doesn't work you need mouse right-click", {
            size: 8,
            font: 'sink',
        }), 
    ])

    onKeyPress('enter', () => {    
        go('main', startMarioPos[0], startMarioPos[1], maxHearts)
    })
})

scene('gameOver', () => {
    add([
        origin('center'),
        pos(width()/2, height()/2),
        text('GAME OVER', {
            size: 48,
            font: 'sink',
        }), 
    ])

    add([
        origin('center'),
        pos(width()/2, height()/2 +32),
        text('ENTER to RESTART', {
            size: 8,
            font: 'sink',
        }), 
    ])

    onKeyPress('enter', () => {    
        go('main', startMarioPos[0], startMarioPos[1], maxHearts)
    })
})

scene("secretRoom", (hearts) => {
    addLevel(secretCfg, {
        width: 20,                       // define the size of each block
        height: 20,
        
        "_": () => [
            sprite("floor-alt"),
            area(),             // has a collider
            solid(),            // is a static object
        ],

        "[": () => [
            sprite("green-column-bottom-left"),
            area(),
            solid(),
            scale(0.5),
        ],

        "]": () => [
            sprite("green-column-bottom-right"),
            area(),
            solid(),
            scale(0.5),
        ],

        "(": () => [
            sprite("green-column-top-left"),
            area(),
            solid(),
            scale(0.5),
        ],

        ")": () => [
            sprite("green-column-top-right"),
            area(),
            solid(),
            scale(0.5),
        ],

        "&": () => [
            sprite("flower"),
            area(),
            solid(),
            'exit',
        ],

        "x": () => [
            sprite("block-alt"),
            area(),
            solid(),
        ],
    })

    const player = add([
        sprite("mario"),               // load sprite 
        pos(50, 150),                   // set start position 
        area(),                        
        body(),                // set mario health on 3   
    ])

    const heal = add([
        sprite("heart"),
        pos(320, 240),
        area(),
        solid(),
        'heal'
    ])

    player.onUpdate( () => {

    })

    player.onCollide("exit", () => {
        go('main', 410, 280, hearts, true);
    })

    player.onCollide('heal', (heal) => {
        destroy(heal);
        hearts++;
    })

    onKeyPress("space", () => {    // jump when player press "space"
        if(player.isGrounded()) {
            player.jump(jumpPower)
        }
    })

    onKeyPress("down", () => {    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        console.log(player.pos)
    })
    
    onKeyDown('left', () => {     // move to left by left_arrow
        player.move(-speed, 0)
    })

    onKeyDown('right', () => {     // move to right by right_arrow
        player.move(speed, 0)
    })
})

scene("main", (posX, posY, hearts, secretUsed=false) => {                    // define a scene
    
    levelCfg[7] = "  ";

    for(let i=hearts; i>0; i--) {
        levelCfg[7] = levelCfg[7] + "*"
    }

    addLevel(levelCfg, {
        width: 20,                       // define the size of each block
        height: 20,
        
        "_": () => [
            sprite("floor"),
            area(),             // has a collider
            solid(),            // is a static object
        ],

        "o": () => [
            sprite("coin"),
            area(),
            solid(),
        ],

        "?": () => [
            sprite("question-mark"),
            area(),
            solid(),
        ],

        "[": () => [
            sprite("green-column-bottom-left"),
            area(),
            solid(),
            scale(0.5),
        ],

        "]": () => [
            sprite("green-column-bottom-right"),
            area(),
            solid(),
            scale(0.5),
        ],

        "(": () => [
            sprite("green-column-top-left"),
            area(),
            solid(),
            scale(0.5),
        ],

        ")": () => [
            sprite("green-column-top-right"),
            area(),
            solid(),
            scale(0.5),
        ],

        "x": () => [
            sprite("green-column-top-right"),
            area(),
            solid(),
        ],

        "!": () => [
            sprite("mushroom-rightstep"),
            area(),
            solid(),
            'enemy',
        ],

        "*": () => [
            sprite("heart"),
        ],
    })
    

    const player = add([
        sprite("mario"),               // load sprite 
        pos(posX, posY),                   // set start position 
        area(),                        
        body(),                // set mario health on 3   
    ])

    player.onUpdate( () => {
        camPos(player.pos)          // center cam on mario in every frame
        if(player.pos.y >= 400) {
            dead(hearts, secretUsed);
        }
    })

    player.onCollide("enemy", () => {
        dead(hearts, secretUsed);
    })

    onKeyPress("space", () => {    // jump when player press "space"
        if(player.isGrounded()) {
            player.jump(jumpPower)
        }
    })

    onKeyPress("down", () => {    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        console.log(player.pos)
        if( player.pos.x>400 && player.pos.x<430 && player.pos.y == 280 && secretUsed == false) {
            go('secretRoom', hearts);
            secretUsed = true;
        }
    })
    
    onKeyDown('left', () => {     // move to left by left_arrow
        player.move(-speed, 0)
    })

    onKeyDown('right', () => {     // move to right by right_arrow
        player.move(speed, 0)
    })
        
});

go("start");
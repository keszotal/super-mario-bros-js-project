const speed = 128;                          // mario move speed
const jumpPower = 512;                      // mario jump power
const lifes = 3;                            // set mario health on 3
let levelCfg = [                            // create a level based on symbols
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "  ***                      ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "    ?????                  ",
    "                           ",
    "                           ",
    "                    ()     ",
    "                    []     ",
    "______________________  ___",
    "                           ",
    "                           ",
]

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

scene('start', () => {

    add([
        pos(10, 10),
        text('For better experience press F11 and F5', {
            size: 24,
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
        go('main')
    })
})

scene('gameOver', () => {
    drawSprite({
        sprite: 'gameOver',
        pos: vec2(100, 100),
    })
})

scene("main", () => {                    // define a scene
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

        "*": () => [
            sprite("heart"),
        ],
    }) 

    const player = add([
        sprite("mario"),               // load sprite 
        pos(30, 80),                   // set start position 
        area(),                        
        body(),                // set mario health on 3   
    ])

    player.onUpdate( () => {
        camPos(player.pos)
        if(player.pos.y >= 400) {
            player.health--
        }
    })

    onKeyPress("space", () => {    // jump when player press "space"
        if(player.isGrounded()) {
            player.jump(jumpPower)
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
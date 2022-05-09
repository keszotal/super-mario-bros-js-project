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
loadSprite('mushroom-enemy', 'https://i.imgur.com/I4RZMlO.png');
loadSprite('block-alt', 'https://i.imgur.com/1Uz5RWV.png');
loadSprite('mushroom-rightstep-alt', 'https://i.imgur.com/POGTM9v.png');
loadSprite('mario', 'https://i.imgur.com/MYVdCje.png');
loadSprite('const-block-alt', 'https://i.imgur.com/6zTMyhI.png');
loadSprite('block', 'https://i.imgur.com/Kc39uFk.png');
loadSprite('heart', 'https://i.imgur.com/a9BjaKa.png');
loadSprite('gameOver', 'https://i.imgur.com/zdD9e1o.jpg')

var startTime

// ***************************************************** //
// ****************** START SCENE ********************** //
// ***************************************************** //
scene('start', () => {
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
        startTime = Date.now()
        go('main', levelCfg, startMarioPos.x, startMarioPos.y, maxHearts)
    })
})


// ***************************************************** //
// ******************* MAIN SCENE ********************** //
// ***************************************************** //
scene("main", (cfg, posX, posY, hearts, secretUsed=false) => {                    // define a scene
    
    cfg[6] = "  ";

    for(let i=hearts; i>0; i--) {
        cfg[6] = cfg[6] + "*"
    }

    addLevel(levelCfg, {
        width: 20,                       // define the size of each block
        height: 20,
        
        "_": () => [
            sprite("floor"),
            area(),             // has a collider
            solid(),            // is a static object
        ],

        "?": () => [
            sprite("question-mark"),
            area(),
            solid(),
            'question-mark'
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
            sprite("mushroom-enemy"),
            area(),
            body(),
            'enemy',
        ],

        "*": () => [
            sprite("heart"),
            area(),
            solid(),
            'heal',
        ]
    })
    
    const player = add([
        sprite("mario"),               // load sprite 
        pos(posX, posY),               // set start position 
        area(),                        
        body(),
        boss = false, 
    ])

    player.onUpdate( () => {
        camPos(player.pos)          // center cam on mario in every frame
        if(player.pos.y >= 500) {
            dead('main', levelCfg, hearts, secretUsed);
        }
    })

    // TIP FOR SECRET ROOM
    add([
        pos(420, 220),
        origin('center'),
        text("Use DOWN ARROW to enter secret room", {
            size: 8,
            font: 'sink',
        }), 
    ])
    add([
        pos(420, 228),
        origin('center'),
        text("|", {
            size: 8,
            font: 'sink',
        }), 
    ])
    add([
        pos(420, 236),
        origin('center'),
        text("V", {
            size: 8,
            font: 'sink',
        }), 
    ])
    add([
        pos(620, 250),
        origin('center'),
        text("NEXT LEVEL", {
            size: 8,
            font: 'sink',
        }), 
    ])

    player.onCollide('question-mark', (obj) => {
        if (player.pos.y>obj.pos.y+19.5) {
            var boost = add([
                sprite('mushroom-boost'),
                pos(obj.pos.x, obj.pos.y-50),
                area(),
                body(),
                "mushroom-boost",
            ])
            destroy(obj)
            boost.onUpdate( () => {
                if(boost.isGrounded()) {
                    destroy(boost)
                }
            })
        }
    })
    
    player.onCollide("enemy", (enemy) => { 
        if(!player.isGrounded() || player.boss == true) {
            enemy.destroy();
        }
        else {
            dead('main', levelCfg, hearts, secretUsed);
        }
    })
    
    action('enemy', (enemy) => {
        enemy.move(-enemySpeed, 0)
    })
    
    player.onCollide('mushroom-boost', (obj) => {
        var position = obj.pos
        makeBig(player)
        player.boss = true
        destroy(obj)
        player.pos = position
    })

    player.onCollide('heal', (heal) => {
        destroy(heal);
        hearts++;
        add([
            sprite("heart"),
            pos(20, 120),
            area(),
            solid(),
            'heal',
        ])
    })

    onKeyPress("down", () => {   
        if( player.pos.x>secretPos.startX && player.pos.x<secretPos.endX && player.pos.y <= secretPos.y && secretUsed == false) {
            go('secretRoom', secretCfg, hearts, 'main', levelCfg);
            secretUsed = true;
        }
        if( player.pos.x>goTo2Lvl.startX && player.pos.x<goTo2Lvl.endX && player.pos.y <= goTo2Lvl.y) {
            go('level2', level2Cfg, startMarioPos.x, startMarioPos.y, hearts);
        }
    })
    
    onKeyDown('left', () => {     // move to left by left_arrow
        player.move(-speed, 0)
    })
    
    onKeyDown('right', () => {     // move to right by right_arrow
        player.move(speed, 0)
    })  

    onKeyPress("space", () => {    // jump when player click "space"
        if(player.isGrounded()) {
            player.jump(jumpPower)
        }
    })
})

// ***************************************************** //
// ********************* LVL 2 ************************* //
// ***************************************************** //
scene("level2", (cfg, posX, posY, hearts, secretUsed=false) => {

    cfg[6] = "  ";

    for(let i=hearts; i>0; i--) {
        cfg[6] = cfg[6] + "*"
    }

    addLevel(cfg, {
        width: 20,                       // define the size of each block
        height: 20,
        
        "_": () => [
            sprite("floor"),
            area(),             // has a collider
            solid(),            // is a static object
        ],

        "?": () => [
            sprite("question-mark"),
            area(),
            solid(),
            'question-mark'
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
            sprite("mushroom-enemy"),
            area(),
            body(),
            'enemy',
        ],

        "*": () => [
            sprite("heart"),
            area(),
            solid(),
            'heal',
        ]
    })

    const player = add([
        sprite("mario"),               // load sprite 
        pos(posX, posY),               // set start position 
        area(),                        
        body(),                // set mario health on 3   
    ])

    player.onUpdate( () => {
        camPos(player.pos)          // center cam on mario in every frame
        if(player.pos.y >= 500) {
            dead('level2', level2Cfg, hearts, secretUsed);
        }
    })

    player.onCollide("enemy", (enemy) => { 
        if(!player.isGrounded() || player.boss == true) {
            enemy.destroy();
        }
        else {
            dead('level2', level2Cfg, hearts, secretUsed);
        }
    })
    
    action('enemy', (enemy) => {
        enemy.move(-enemySpeed, 0)
    })

    player.onCollide('question-mark', (obj) => {
        if (player.pos.y>obj.pos.y+19.5) {
            var boost = add([
                sprite('mushroom-boost'),
                pos(obj.pos.x, obj.pos.y-50),
                area(),
                body(),
                "mushroom-boost",
            ])
            destroy(obj)
            boost.onUpdate( () => {
                if(boost.isGrounded()) {
                    destroy(boost)
                }
            })
        }
    })
    
    player.onCollide('mushroom-boost', (obj) => {
        let position = obj.pos
        makeBig(player)
        player.boss = true
        destroy(obj)
        player.pos = position
    })

    player.onCollide('heal', (heal) => {
        destroy(heal);
        hearts++;
        add([
            sprite("heart"),
            pos(20, 120),
            area(),
            solid(),
            'heal',
        ])
    })

    onKeyPress("space", () => {    // jump when player press "space"
        if(player.isGrounded()) {
            player.jump(jumpPower)
        }
    })

    onKeyPress("down", () => {
        if( player.pos.x>secret2Pos.startX && player.pos.x<secret2Pos.endX && player.pos.y <= secret2Pos.y && secretUsed == false) {
            go('secretRoom', secretCfg, hearts, 'level2', level2Cfg);
            secretUsed = true;
        }
        if( player.pos.x>goTo3Lvl.startX && player.pos.x<goTo3Lvl.endX && player.pos.y <= goTo3Lvl.y) {
            go('level3', level3Cfg, startMarioPos.x, startMarioPos.y, hearts);
        }
    })
    
    onKeyDown('left', () => {     // move to left by left_arrow
        player.move(-speed, 0)
    })

    onKeyDown('right', () => {     // move to right by right_arrow
        player.move(speed, 0)
    })
})

// ***************************************************** //
// ********************* LVL 3 ************************* //
// ***************************************************** //
scene("level3", (cfg, posX, posY, hearts, secretUsed=false) => {

    cfg[6] = "  ";

    for(let i=hearts; i>0; i--) {
        cfg[6] = cfg[6] + "*"
    }

    addLevel(cfg, {
        width: 20,                       // define the size of each block
        height: 20,
        
        "_": () => [
            sprite("floor"),
            area(),             // has a collider
            solid(),            // is a static object
        ],

        "?": () => [
            sprite("question-mark"),
            area(),
            solid(),
            'question-mark'
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
            sprite("mushroom-enemy"),
            area(),
            body(),
            'enemy',
        ],

        "*": () => [
            sprite("heart"),
            area(),
            solid(),
            'heal',
        ]
    })

    const player = add([
        sprite("mario"),               // load sprite 
        pos(posX, posY),               // set start position 
        area(),                        
        body(),                // set mario health on 3   
    ])

    player.onUpdate( () => {
        camPos(player.pos)          // center cam on mario in every frame
        if(player.pos.y >= 500) {
            dead('level3', level3Cfg, hearts, secretUsed);
        }
    })

    player.onCollide("enemy", (enemy) => { 
        if(!player.isGrounded() || player.boss == true) {
            enemy.destroy();
        }
        else {
            dead('level3', level3Cfg, hearts, secretUsed);
        }
    })
    
    action('enemy', (enemy) => {
        enemy.move(-enemySpeed, 0)
    })

    player.onCollide('question-mark', (obj) => {
        if (player.pos.y>obj.pos.y+19.5) {
            var boost = add([
                sprite('mushroom-boost'),
                pos(obj.pos.x, obj.pos.y-50),
                area(),
                body(),
                "mushroom-boost",
            ])
            destroy(obj)
            boost.onUpdate( () => {
                if(boost.isGrounded()) {
                    destroy(boost)
                }
            })
        }
    })
    
    player.onCollide('mushroom-boost', (obj) => {
        let position = obj.pos
        makeBig(player)
        player.boss = true
        destroy(obj)
        player.pos = position
    })

    player.onCollide('heal', (heal) => {
        destroy(heal);
        hearts++;
        add([
            sprite("heart"),
            pos(20, 120),
            area(),
            solid(),
            'heal',
        ])
    })

    onKeyPress("space", () => {    // jump when player press "space"
        if(player.isGrounded()) {
            player.jump(jumpPower)
        }
    })

    onKeyPress("down", () => {    
        if( player.pos.x>endGamePos.startX && player.pos.x<endGamePos.endX && player.pos.y <= endGamePos.y) {
            go('endGame');
        }
    })
    
    onKeyDown('left', () => {     // move to left by left_arrow
        player.move(-speed, 0)
    })

    onKeyDown('right', () => {     // move to right by right_arrow
        player.move(speed, 0)
    })
})

// ***************************************************** //
// ******************* GAME OVER *********************** //
// ***************************************************** //
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
        startTime = Date.now()   
        go('main', levelCfg, startMarioPos.x, startMarioPos.y, maxHearts)
    })
})


// ***************************************************** //
// *************** ??? SECRET ROOM ??? ***************** //
// ***************************************************** //
scene("secretRoom", (cfg, hearts, level, levelCfg) => {
    addLevel(cfg, {
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

        "*": () => [
            sprite("heart"),
            area(),
            solid(),
            'heal',
        ]
    })

    const player = add([
        sprite("mario"),               // load sprite 
        pos(50, 150),                  // set start position 
        area(),                        
        body(),                // set mario health on 3   
    ])

    player.onUpdate( () => {

    })

    player.onCollide("exit", () => {
        go(level, levelCfg, 410, 280, hearts, true);
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
    
    onKeyDown('left', () => {     // move to left by left_arrow
        player.move(-speed, 0)
    })

    onKeyDown('right', () => {     // move to right by right_arrow
        player.move(speed, 0)
    })
})

// ***************************************************** //
// ******************* END GAME ************************ //
// ***************************************************** //
scene('endGame', () => {
    var audio = new Audio('soundtrack.mp3')
    audio.play()

    // converting time in ms to m:s format [10:15]
    var endTime = Date.now()
    var playTime = endTime - startTime
    let seconds = Math.floor(playTime / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    minutes = minutes % 60;

    add([
        origin('center'),
        pos(width()/2, height()/2),
        text('WINNER', {
            size: 48,
            font: 'sink',
        }), 
    ])
    
    add([
        origin('center'),
        pos(width()/2, height()/2 +32),
        text('SOUND ON!', {
            size: 8,
            font: 'sink',
        }), 
    ])

    add([
        origin('center'),
        pos(width()/2, height()/2 +64),
        text(`Play time: ${minutes}:${seconds}`, {
            size: 8,
            font: 'sink',
        }), 
    ])

})

go("start");                  // JUST STARTING GAME
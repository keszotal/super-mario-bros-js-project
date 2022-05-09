function dead(scene, cfg, hearts, secretUsed) {
    hearts--;
    if(!hearts==0) {
        go(scene, cfg, startMarioPos.x, startMarioPos.y, hearts, secretUsed);
    }
    else {
        go('gameOver');
    }
}

function makeBig(obj) {
    obj.scale = 2

    setTimeout(() => {
       obj.scale = 1 
    }, bigMarioTime);
}

function refreshPosition(obj, position) {
    obj.position = position
}
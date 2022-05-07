function dead(hearts, secretUsed) {
    hearts--;
    if(!hearts==0) {
        go('main', levelCfg, startMarioPos[0], startMarioPos[1], hearts, secretUsed);
    }
    else {
        go('gameOver');
    }
}

function makeBig(obj) {
    obj.scale = 2
    obj.pos = obj.pos

    setTimeout(() => {
       obj.scale = 1 
    }, bigMarioTime);
}
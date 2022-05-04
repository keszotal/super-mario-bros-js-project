function dead(hearts, secretUsed) {
    hearts--;
    if(!hearts==0) {
        go('main', startMarioPos[0], startMarioPos[1], hearts, secretUsed);
    }
    else {
        go('gameOver');
    }
}
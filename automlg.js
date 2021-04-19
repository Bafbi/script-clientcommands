var placeWater = function (basePitch, baseYaw) {
    player.blockInput();
    var predicX = player.x + player.motionX * 3;
    var predicZ = player.z + player.motionZ * 3;
    print("PredicX=" + String(Math.floor(predicX)) + ", PredicZ=" + String(Math.floor(predicZ)));
    player.pick("water_bucket");
    player.pitch = 90;
    var chanceOfMiss = 65 - centerPlayer(Math.floor(predicX), Math.floor(predicZ));
    var waterPlace = false;
    while (waterPlace == false) {
        print("Chance of miss = " + chanceOfMiss + "%");
        //print(String(player.motionZ));
        if (player.inventory.items[player.selectedSlot].id == "minecraft:bucket") {
            waterPlace = true;
            //print(String(player.x));
            //print(String(player.z));
        } else if (chanceOfMiss <= 5) {
            player.rightClick();
            tick();
        } else {
            chanceOfMiss = chanceOfMiss - centerPlayer(Math.floor(predicX), Math.floor(predicZ));
            player.rightClick();
            tick();
        }
    }
    //print(String(Math.abs(player.x - (Math.floor(predicX) + 0.5))));
    //print(String(Math.abs(player.z - (Math.floor(predicZ) + 0.5))));
    while (player.motionY < -0.5) tick();
    player.rightClick();
    if (player.inventory.items[player.selectedSlot].id == "minecraft:bucket") {
        player.pitch = 60;
        player.yaw = baseYaw - 180;
        tick();
        player.rightClick();
    }
    tick();
    player.pitch = basePitch;
    player.yaw = baseYaw;
    player.unblockInput();
};

var centerPlayer = function (targetX, targetZ) {
    //print("x = " + String(targetX));
    //print("z = " + String(targetZ));
    player.yaw = 0;
    if (player.z > targetZ + 0.6 && player.motionZ > -0.05) {
        print("back");
        var moveZ = "-z";
        player.pressingBack = true;
        //player.snapTo(player.x, player.y, player.z - 0.3, true);
    } else if (player.z < targetZ + 0.4 && player.motionZ < 0.05) {
        print("forward");
        var moveZ = "-z";
        player.pressingForward = true;
    }
    if (player.x > targetX + 0.6 && player.motionX > -0.05) {
        //print("right");
        var moveX = "-x";
        player.pressingRight = true;
    } else if (player.x < targetX + 0.4 && player.motionX < 0.05) {
        //print("left");
        var moveX = "-x";
        player.pressingLeft = true;
    }
    tick();
    player.pressingBack = false;
    player.pressingForward = false;
    player.pressingLeft = false;
    player.pressingRight = false;
    return 3;
};

while (true) {
    if (player.motionY < -0.6) {
        print("==> autoMLG");
        placeWater(player.pitch, player.yaw);
    } else tick();
}

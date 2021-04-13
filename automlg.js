var placeWater = function () {
    player.blockInput();
    player.pick("water_bucket");
    player.lookAt(player.x, player.y - 2, player.z);
    var waterPlace = false;
    while (waterPlace == false) {
        if (player.inventory.items[player.selectedSlot].id == "minecraft:bucket") {
            waterPlace = true;
        } else {
            centerPlayer();
            player.rightClick();
            print(String(player.inventory.items[player.selectedSlot].id));
            tick();
        }
    }
    player.unblockInput();
};

var centerPlayer = function () {
    player.yaw = 0;
    while (
        //true
        !(
            !(player.x > Math.floor(player.x) + 0.9 || player.x < Math.floor(player.x) + 0.1) &&
            !(player.z > Math.floor(player.z) + 0.9 || player.z < Math.floor(player.z) + 0.1)
        )
    ) {
        if (player.z > Math.floor(player.z) + 0.9 && player.z < Math.floor(player.z) + 1.0) {
            print("back");
            player.pressingBack = true;
        } else if (player.z > Math.floor(player.z) && player.z < Math.floor(player.z) + 0.1) {
            print("forward");
            player.pressingForward = true;
        }
        if (player.x > Math.floor(player.x) + 0.9 && player.x < Math.floor(player.x) + 1.0) {
            print("right");
            player.pressingRight = true;
        } else if (player.x > Math.floor(player.x) && player.x < Math.floor(player.x) + 0.1) {
            print("left");
            player.pressingLeft = true;
        }
        tick();
    }
    player.pressingBack = false;
    player.pressingForward = false;
    player.pressingLeft = false;
    player.pressingRight = false;
};

while (true) {
    if (player.motionY > -0.6) tick();
    else {
        if (player.inventory.items[player.selectedSlot].id == "minecraft:bucket") tick();
        else placeWater();
    }
}

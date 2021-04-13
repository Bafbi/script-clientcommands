var centerPlayer = function () {
    player.yaw = 0;
    while (
        //true
        !(
            !(player.x > Math.floor(player.x) + 0.8 || player.x < Math.floor(player.x) + 0.2) &&
            !(player.z > Math.floor(player.z) + 0.8 || player.z < Math.floor(player.z) + 0.2)
        )
    ) {
        if (player.z > Math.floor(player.z) + 0.8 && player.z < Math.floor(player.z) + 1.0) {
            print("back");
            player.pressingBack = true;
        } else if (player.z > Math.floor(player.z) && player.z < Math.floor(player.z) + 0.2) {
            print("forward");
            player.pressingForward = true;
        }
        if (player.x > Math.floor(player.x) + 0.8 && player.x < Math.floor(player.x) + 1.0) {
            print("right");
            player.pressingRight = true;
        } else if (player.x > Math.floor(player.x) && player.x < Math.floor(player.x) + 0.2) {
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

centerPlayer();

var mlg = function (basePitch, baseYaw) {
    player.blockInput();
    player.pick("water_bucket");
    player.pitch = 90;
    tick();
    player.rightClick();
    while (player.motionY < -0.2) tick();
    player.rightClick();
    player.unblockInput();
};

while (true) {
    if (player.motionY < -0.7 && -1.5 < player.motionY && world.getBlock(player.x, player.y - 3, player.z) != "air") {
        print("Shiiiiieeeeeeeeeee");
        mlg(player.pitch, player.yaw);
    } else if (player.motionY < -1.5 && -2.5 < player.motionY && world.getBlock(player.x, player.y - 4, player.z) != "air") {
        print("Vraaaaaaaaaaaaa");
        mlg(player.pitch, player.yaw);
    } else if (player.motionY < -2.5 && world.getBlock(player.x, player.y - 5, player.z) != "air") {
        print("Mloooooooooooo");
        mlg(player.pitch, player.yaw);
    }
    tick();
    print(world.getBlock(player.x, player.y - 2, player.z));
    print(String(player.motionY < -0.7));
}

var predict = function () {
    var beforeX = player.x;
    var beforeZ = player.z;
    print("motionX= " + String(player.motionX));
    print("motionY= " + String(player.motionZ));
    var predicX = player.x + player.motionX * 6.5;
    var predicZ = player.z + player.motionZ * 6.5;
    print("predictionX= " + String(predicX));
    print("predictionY= " + String(predicZ));
    while (player.motionY < -0.08) tick();
    print("arrivéX= " + String(player.x));
    print("arrivéY= " + String(player.z));
    var accuracyX = ((player.x - predicX) / player.x) * 100;
    var accuracyZ = ((player.z - predicZ) / player.z) * 100;
    print(String(accuracyX));
    print(String(accuracyZ));
    print(String(player.x - beforeX));
    print(String(player.z - beforeZ));
};

while (true) {
    if (player.motionY < -0.6) predict();
    else tick();
}

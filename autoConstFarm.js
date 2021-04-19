var init = function () {
    var inChunkPos = [player.x % 16, player.z % 16];
    player.moveTo(player.x - inChunkPos[0] + 0.5, player.z - inChunkPos[1] + 0.5, false);
};
//init();

var centerPlayer = function () {
    player.pressingForward = false;
    while (player.motionX * player.motionX + player.motionZ * player.motionZ > 0.001) tick();
    if (Math.abs(Math.floor(player.x) + 0.5 - player.x) >= 0.1 || Math.abs(Math.floor(player.z) + 0.5 - player.z) >= 0.1)
        return player.moveTo(Math.floor(player.x) + 0.5, Math.floor(player.z) + 0.5);
    return true;
};
var centerSnapPlayer = function () {
    player.pressingForward = false;
    while (player.motionX * player.motionX + player.motionZ * player.motionZ != 0) tick();
    return player.snapTo(Math.floor(player.x) + 0.5, player.y, Math.floor(player.z) + 0.5);
};

var newLayer = function () {
    centerPlayer();
    player.moveTo(player.x, player.z + 1, false);
    player.pick("dirt");
    while (!player.rightClick(player.x, player.y, player.z - 1, "up")) {
        tick();
        print("err");
    }
    player.yaw = 180;
    player.pitch = 0;
};
var hoeing = function (x, y, z) {
    player.pick("diamond_hoe");
    player.rightClick(x, y, z);
    tick();
    player.pick("pumpkin_seeds");
    if (player.rightClick(x, y, z, "up")) return true;
    else return false;
};

//  Create line of dirt //
var lineOfDirt = function () {
    for (var block = 0; block < 14; block++) {
        if (block % 2 == 0) {
            hoeing(player.x, Math.round(player.y) + 1, player.z - 1);
        }
        var newPos = Math.floor(player.z) + 1.5;
        player.pressingBack = true;
        while (player.z < newPos) tick();
        player.pressingBack = false;
        tick();
        player.pick("dirt");
        player.rightClick(player.x, Math.round(player.y) + 1, player.z - 2, "south");
        player.yaw = 180;
        player.pitch = 0;
    }
    hoeing(player.x, Math.round(player.y) + 1, player.z - 1);
};
var lineOfDirtBis = function () {
    for (var block = 0; block < 14; block++) {
        if (block % 2 == 0) {
            hoeing(player.x, Math.round(player.y) + 1, player.z + 1);
        }
        var newPos = Math.floor(player.z) - 0.5;
        player.pressingBack = true;
        while (player.z > newPos) tick();
        player.pressingBack = false;
        tick();
        player.pick("dirt");
        player.rightClick(player.x, Math.round(player.y) + 1, player.z + 2, "north");
        player.yaw = 0;
        player.pitch = 0;
    }
    hoeing(player.x, Math.round(player.y) + 1, player.z + 1);
};
//  Rotate to another line  //
var rotate = function () {
    player.moveTo(player.x + 1, player.z - 1, false);
    centerPlayer();
    player.yaw = 90;
    player.syncRotation();
    tick();
    player.pick("dirt");
    print(String(player.rightClick(player.x - 1, Math.round(player.y) + 1, player.z, "south")));
    player.rightClick(player.x - 1, Math.round(player.y) + 1, player.z + 1, "east");
    player.yaw = 0;
};
var rotateBis = function () {
    player.moveTo(player.x + 1, player.z + 1, false);
    centerPlayer();
    player.yaw = 90;
    player.syncRotation();
    tick();
    player.pick("dirt");
    print(String(player.rightClick(player.x - 1, Math.round(player.y) + 1, player.z, "north")));
    player.rightClick(player.x - 1, Math.round(player.y) + 1, player.z - 1, "east");
    player.yaw = 180;
};

//  Special line    //
var speLine = function () {
    player.yaw = 0;
    player.pitch = 0;
    player.syncRotation;
    tick();
    player.pick("dirt");
    print(String(player.rightClick(player.x, Math.round(player.y) + 1, player.z + 1, "east")));
    for (var block = 0; block < 14; block++) {
        if (block % 2 == 0) {
            hoeing(player.x, Math.round(player.y) + 1, player.z + 1);
        }
        if (block == 2 || block == 3 || block == 10 || block == 11) {
            print("aa");
            var newPos = Math.floor(player.z) - 0.5;
            player.pressingBack = true;
            while (player.z > newPos) tick();
            player.pressingBack = false;
            tick();
            player.pick("dirt");
            player.rightClick(player.x, Math.round(player.y) + 1, player.z + 2, "north");
            player.yaw = 0;
            player.pitch = 0;
        } else {
            print("bb");
            var newPos = Math.floor(player.z) - 0.5;
            player.pressingBack = true;
            while (player.z > newPos) tick();
            player.pressingBack = false;
            tick();
            player.pick("dirt");
            player.rightClick(player.x, Math.round(player.y) + 1, player.z + 2, "north");
            tick();
            player.rightClick(player.x, Math.round(player.y) + 1, player.z + 1, "east");
            if (block % 2 == 0) {
                hoeing(player.x + 1, Math.round(player.y) + 1, player.z + 1);
            }
            player.yaw = 0;
            player.pitch = 0;
        }
    }
    hoeing(player.x, Math.round(player.y) + 1, player.z + 1);
};
var speRotate = function () {
    player.moveTo(player.x + 1, player.z, false);
    centerPlayer();
    player.yaw = 55;
    player.syncRotation();
    tick();
    player.pick("dirt");
    print(String(player.rightClick(player.x - 1, Math.round(player.y) + 1, player.z + 1, "north")));
    player.moveTo(player.x + 1, player.z + 1, false);
    centerPlayer();
    player.yaw = 90;
    player.syncRotation();
    tick();
    player.pick("dirt");
    print(String(player.rightClick(player.x - 1, Math.round(player.y) + 1, player.z, "north")));
    while (!hoeing(player.x - 1, Math.round(player.y) + 1, player.z - 1)) tick();
    player.moveTo(player.x, player.z + 13, false);
    player.pick("dirt");
    while (!player.rightClick(player.x, player.y, player.z + 1, "up")) {
        tick();
        print("err");
    }
    player.yaw = 0;
    player.pitch = 0;
};

//  Special line bis    //
var speLineBis = function () {
    player.yaw = 180;
    player.pitch = 0;
    player.syncRotation;
    tick();
    player.pick("dirt");
    print(String(player.rightClick(player.x, Math.round(player.y) + 1, player.z - 1, "east")));
    for (var block = 0; block < 14; block++) {
        if (block % 2 == 0) {
            hoeing(player.x, Math.round(player.y) + 1, player.z - 1);
        }
        if (block == 2 || block == 3 || block == 10 || block == 11) {
            print("aa");
            var newPos = Math.floor(player.z) + 1.5;
            player.pressingBack = true;
            while (player.z < newPos) tick();
            player.pressingBack = false;
            tick();
            player.pick("dirt");
            player.rightClick(player.x, Math.round(player.y) + 1, player.z - 2, "south");
            player.yaw = 180;
            player.pitch = 0;
        } else {
            print("bb");
            var newPos = Math.floor(player.z) + 1.5;
            player.pressingBack = true;
            while (player.z < newPos) tick();
            player.pressingBack = false;
            tick();
            player.pick("dirt");
            player.rightClick(player.x, Math.round(player.y) + 1, player.z - 2, "south");
            tick();
            player.rightClick(player.x, Math.round(player.y) + 1, player.z - 1, "east");
            if (block % 2 == 0) {
                hoeing(player.x + 1, Math.round(player.y) + 1, player.z - 1);
            }
            player.yaw = 180;
            player.pitch = 0;
        }
    }
    hoeing(player.x, Math.round(player.y) + 1, player.z - 1);
};
var speRotateBis = function () {
    player.moveTo(player.x + 1, player.z, false);
    centerPlayer();
    player.yaw = 125;
    player.syncRotation();
    tick();
    player.pick("dirt");
    print(String(player.rightClick(player.x - 1, Math.round(player.y) + 1, player.z - 1, "south")));
    player.moveTo(player.x + 1, player.z - 1, false);
    centerPlayer();
    player.yaw = 90;
    player.syncRotation();
    tick();
    player.pick("dirt");
    print(String(player.rightClick(player.x - 1, Math.round(player.y) + 1, player.z, "south")));
    while (!hoeing(player.x - 1, Math.round(player.y) + 1, player.z + 1)) tick();
    player.moveTo(player.x, player.z - 13, false);
    player.pick("dirt");
    while (!player.rightClick(player.x, player.y, player.z - 1, "up")) {
        tick();
        print("err");
    }
    player.yaw = 180;
    player.pitch = 0;
};

//  Last line | up one layer    //
var lastLine = function () {
    for (var block = 0; block < 14; block++) {
        if (block % 2 == 0) {
            hoeing(player.x, Math.round(player.y) + 1, player.z + 1);
        }
        var newPos = Math.floor(player.z) - 0.5;
        player.pressingBack = true;
        while (player.z > newPos) tick();
        player.pressingBack = false;
        tick();
        player.pick("dirt");
        player.rightClick(player.x, Math.round(player.y) + 1, player.z + 2, "north");
        player.yaw = 0;
        player.pitch = 0;
    }
    hoeing(player.x, Math.round(player.y) + 1, player.z + 1);
    player.jumping = true;
    tick();
    player.pick("dirt");
    while (!player.rightClick(player.x, Math.floor(player.y) - 2, player.z, "up")) tick();
    player.pressingRight = true;
    var newPos = [Math.floor(player.x) + 0.2, Math.floor(player.z) + 0.5];
    while (player.x > newPos[0]) tick();
    player.jumping = false;
    player.pressingRight = false;
    while (player.motionX * player.motionX + player.motionZ * player.motionZ > 0.001) tick();
    print(String(player.moveTo(newPos[0] - 0.6, newPos[1], false)));
    player.longMineBlock(player.x + 1, Math.round(player.y) - 2, player.z);
    tick();
    player.yaw = -60;
    player.pitch = 65;
    player.syncRotation();
    tick();
    player.rightClick(player.x + 1, Math.round(player.y) - 1, player.z + 1, "north");
};

//  Buy dirt | seeds    //
var countItem = function (item) {
    var nbrItem = 0;
    slots = player.inventory.findSlots(item, -1);
    for (var slot = 0; slot < slots.length; slot++) {
        nbrItem += player.inventory.items[slots[slot]].Count;
    }
    return nbrItem;
};
var buyDirt = function () {
    print("Buy dirt plz");
};
var buySeeds = function () {
    print("Buy seeds plz");
};
var buyStuff = function () {
    if (countItem("dirt") < 256) buyDirt();
    if (countItem("pumpkin_seeds") < 128) buySeeds();
};

var chunckOfDirt = function (lastChunk) {
    for (var line = 0; line < 13; line++) {
        centerPlayer();
        if (line % 2 == 0 && (line < 3 || line > 9)) {
            lineOfDirt();
            rotate();
        } else if (line % 2 == 1 && (line < 3 || line > 9)) {
            lineOfDirtBis();
            rotateBis();
        } else if (line == 3) {
            speLine();
            speRotate();
        } else if (line % 2 == 0 && line > 3 && line < 9) {
            lineOfDirtBis();
            rotateBis();
        } else if (line % 2 == 1 && line > 3 && line < 9) {
            lineOfDirt();
            rotate();
        } else if (line == 9) {
            speLineBis();
            speRotateBis();
        }
    }
    if (lastChunk) lastLine();
    else {
        speLineBis();
        speRotateBis();
    }
};

while (player.y < 245) {
    init();
    newLayer();
    for (var nbtChunck = 0; nbtChunck < 0; nbtChunck++) {
        buyStuff();
        chunckOfDirt();
    }
    buyStuff();
    chunckOfDirt(true);
}

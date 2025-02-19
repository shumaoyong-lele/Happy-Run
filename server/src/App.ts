world.onPlayerJoin(async ({ entity }) => {
  entity.player.directMessage(`你好，${entity.player.name}，欢迎来到本地图`);
});

for (let i = 0; i < 306; ++i) {
  for (let j = 0; j < 306; ++j) {
    voxels.setVoxel(i, 8, j, 'water');
  }
}
//制作水面

world.onPlayerJoin(({ entity }) => {
  entity.onFluidEnter(() => {
    //当玩家掉到水里
    entity.position.copy(entity.player.spawnPoint);
    entity.position.y += 4;
    entity.player.directMessage('你掉到了水里');
  });
});
//碰到水面重生

for (const e of world.querySelectorAll('*')) {
  if (e.id.startsWith('存档点')) {
    e.collides = true;
    e.fixed = true;
    e.onEntityContact(({ other }) => {
      if (other.isPlayer) {
        if (other.player) {
          other.player.directMessage('到达新的存档点，加油！');
          other.player.spawnPoint = e.position;
        }
      }
    });
  }
}
//制作存档点

async function dev_function(entity: GameEntity) {
  (
    entity.player as {
      dialog: (param: GameTextDialogParams) => Promise<GameDialogResponse>;
    }
  ).dialog({
    type: GameDialogType.TEXT,
    title: '提示',
    content: `功能正在开发中，敬请期待`,
  });
}

// 添加检测玩家进入或离开 x:0-64, y:0-20, z: 0-64 的区域
const start = world.addZone({
  selector: 'player',
  bounds: new GameBounds3(
    new GameVector3(0, 9, 119),
    new GameVector3(2, 20, 121)
  ),
});
// 有玩家进入区域时触发

const startTime = Date.now(); // 获取当前时间戳
let time = 0; // 用于记录玩家耗时

start.onEnter(() => {
  time = (Date.now() - startTime) / 1000; // 计算玩家耗时
  sleep(1000); // 等待 1 秒
});

const end = world.addZone({
  selector: 'player',
  bounds: new GameBounds3(
    new GameVector3(0, 9, 122),
    new GameVector3(2, 20, 124)
  ),
});

end.onEnter(({ entity }) => {
  if (entity.player) {
    world.say(`${entity.player.name}到达了终点，用了 ${time} 秒`);
  }
  dev_function(entity);
});

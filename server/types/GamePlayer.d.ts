/**
 * 扩展[游戏玩家]的接口
 * 该接口继承自GamePlayer，可以为[游戏玩家]添加额外的属性或方法。
 */
declare interface GamePlayer extends GamePlayer {}

// GamePlayer.d.ts
declare interface GamePlayer extends GamePlayer {
    // 自定义属性
    customProperty: string;
    
    // 自定义方法
    customMethod(): void;
}
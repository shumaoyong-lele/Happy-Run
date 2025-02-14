/**
 * 扩展[游戏实体]的接口
 * 该接口继承自GameEntity，可以为[游戏实体]添加额外的属性或方法。
 */
declare interface GameEntity extends GameEntity {}

// GameEntity.d.ts
declare interface GameEntity extends GameEntity {
    // 自定义属性
    customProperty: string;
    
    // 自定义方法
    customMethod(): void;
}
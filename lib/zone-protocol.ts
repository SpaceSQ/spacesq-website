// lib/zone-protocol.ts

/**
 * 🧘 空间占位与微气候协议
 */

// 微网格坐标 (相对于所在父空间的原点)
export interface IGridPosition {
  x: number; // 0-3 (对应 0m, 0.5m, 1.0m, 1.5m)
  y: number; // 0-3
  z: number; // 高度层级
}

// 占用类型
export enum OccupancyType {
  BIO_HUMAN = "BIO_HUMAN",       // 碳基人类
  SILICON_ENTITY = "SILICON",    // 硅基生命 (机器人/全息影像)
  DIGITAL_AVATAR = "AVATAR",     // 虚拟人
  PHYSICAL_OBJECT = "OBJECT"     // 家具/设备
}

// 🫧 “空间人”包络 (The Bio-Digital Envelope)
// 这就是你提到的“人与空间临时组成的结合体”
export interface ISpacePersonBubble {
  id: string;             // 包络ID (e.g., "BUBBLE-DAVID-OFFICE")
  ownerId: string;        // 归属人/智能体
  parentSpaceId: string;  // 所在的物理大空间ID
  
  // 占位脚印 (Footprint)
  occupiedGrids: IGridPosition[]; 
  
  // 核心六要素需求 (个性化需求)
  // 例如：David 想要 500Lux 暖光，24度
  requirements: {
    light?: { lux: number, k: number };
    air?: { temp: number, flow: 'STILL' | 'BREEZE' };
    sound?: { content: string, volume: number };
    privacyRadius: number; // 心理防御半径 (米)
  };

  // 优先级 (决定冲突时谁说了算)
  priority: number; // 1-10 (VIP=10, 访客=1)
}

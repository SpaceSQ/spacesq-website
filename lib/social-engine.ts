// lib/social-engine.ts
import { ISpacePersonBubble } from './zone-protocol';

/**
 * 🤝 社交与冲突裁决引擎
 * 当两个“空间人”靠得太近，或者需求冲突时，该如何融合？
 */
export class SocialEngine {
  
  // 计算合成场 (Merge Fields)
  static resolveConflict(bubbleA: ISpacePersonBubble, bubbleB: ISpacePersonBubble): any {
    console.log(`⚔️ 检测到场域重叠: ${bubbleA.ownerId} <--> ${bubbleB.ownerId}`);

    // 1. 物理排斥 (占位冲突)
    // 检查脚印是否有重叠
    if (this.checkCollision(bubbleA, bubbleB)) {
      return { 
        action: "ALERT", 
        message: "物理空间重叠！请保持社交距离。" 
      };
    }

    // 2. 要素融合 (Environmental Fusion)
    
    // 场景：A要听摇滚，B要睡觉 -> 冲突
    // 解决方案：耳机模式 (定向声场)
    if (bubbleA.requirements.sound && bubbleB.requirements.sound) {
       // 声音不仅不均一，而且互斥
       return {
         action: "ISOLATE",
         instruction: "建议开启定向音箱或佩戴耳机，建立声学隔离墙。"
       };
    }

    // 场景：A要26度，B要20度 -> 梯度中和
    // 解决方案：利用微风系统在两人中间制造气幕
    if (bubbleA.requirements.air && bubbleB.requirements.air) {
       const avgTemp = (bubbleA.requirements.air.temp + bubbleB.requirements.air.temp) / 2;
       return {
         action: "BLEND",
         result: { temp: avgTemp },
         note: "将在两区域间生成温度梯度过渡带。"
       };
    }

    // 默认：和谐共存
    return { action: "COEXIST" };
  }

  private static checkCollision(a: ISpacePersonBubble, b: ISpacePersonBubble): boolean {
    // 简单的AABB碰撞检测逻辑
    // ...代码略...
    return false;
  }
}

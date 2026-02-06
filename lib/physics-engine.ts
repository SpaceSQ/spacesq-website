// lib/physics-engine.ts
import { HOMOGENEITY_LIMIT, ISpaceSnapshot, ILightState } from './element-protocol';

/**
 * 📐 均一性检查器
 * 判断一个空间是否足够小，可以忽略物理梯度
 */
export function checkHomogeneity(width: number, length: number, height: number): boolean {
  return (
    width <= HOMOGENEITY_LIMIT.width &&
    length <= HOMOGENEITY_LIMIT.length &&
    height <= HOMOGENEITY_LIMIT.height
  );
}

/**
 * 🌫️ 梯度融合算法 (Fusion Engine)
 * 当两个空间 (A 和 B) 连接时，计算连接处某点的环境值
 * * @param valA - 空间A的核心值 (如温度 20°C)
 * @param valB - 空间B的核心值 (如温度 10°C)
 * @param distanceRatio - 测点距离A的归一化距离 (0=在A中心, 1=在B中心, 0.5=连接界面)
 * @param elementType - 要素类型 (不同要素衰减率不同)
 */
export function calculateGradient(
  valA: number, 
  valB: number, 
  distanceRatio: number,
  elementType: 'LINEAR' | 'LOGARITHMIC'
): number {
  
  // 线性衰减 (用于温度、湿度)
  if (elementType === 'LINEAR') {
    return valA + (valB - valA) * distanceRatio;
  }
  
  // 对数/平方反比衰减 (用于光、声)
  // 简化模拟：光线随距离衰减得更快
  if (elementType === 'LOGARITHMIC') {
    // 简单的指数衰减模拟
    const steepness = 2; 
    // Sigmoid 曲线过渡，模拟从亮处走到暗处的人眼适应感
    const weight = 1 / (1 + Math.exp(-steepness * (distanceRatio - 0.5) * 10));
    return valA + (valB - valA) * weight;
  }

  return valA;
}

/**
 * 🧪 空间融合模拟器
 * 输入两个空间的状态，输出融合后的虚拟状态
 */
export function simulateFusion(spaceA: ISpaceSnapshot, spaceB: ISpaceSnapshot): Partial<ISpaceSnapshot> {
  // 这里是 AI 算力的未来核心
  // 目前我们做一个简单的线性平均，作为 MVP 演示
  
  if (!spaceA.elements.air || !spaceB.elements.air) return {};

  const mergedTemp = (spaceA.elements.air.temp + spaceB.elements.air.temp) / 2;
  
  return {
    timestamp: Date.now(),
    isHomogeneous: false, // 融合区一定是非均一的
    elements: {
      air: {
        ...spaceA.elements.air,
        temp: mergedTemp, // 融合后的温度
      }
    }
  };
}

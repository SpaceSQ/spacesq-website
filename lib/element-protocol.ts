// lib/element-protocol.ts

/**
 * 🌌 SPACESQ 核心物理定义库
 * 这里的每一个接口都对应真实世界的物理量
 * 严禁出现 device_id, brand, switch_status 等设备层词汇
 */

// 1. 六大要素枚举
export enum SpaceElement {
  LIGHT = "LIGHT",         // 光
  AIR = "AIR",             // 空气
  SOUND = "SOUND",         // 声音
  EM_WAVE = "EM_WAVE",     // 电磁波
  ENERGY = "ENERGY",       // 能源/电源
  VISUAL = "VISUAL",       // 视觉/数字表面
  // 扩展要素
  GRAVITY = "GRAVITY",     // 重力 (太空版)
  PRESSURE = "PRESSURE",   // 气压
}

// 2. 均一性阈值 (2m x 2m x 2.4m)
export const HOMOGENEITY_LIMIT = {
  width: 2.0,
  length: 2.0,
  height: 2.4
};

// --- 要素详细物理指标 ---

// 💡 光要素 (The Photon Field)
export interface ILightState {
  illuminance: number;  // 照度 (Lux) - 决定亮度
  temperature: number;  // 色温 (Kelvin) - 如 4000K
  colorHex?: string;    // 光谱/颜色 (Hex) - 氛围光用
  uvIndex?: number;     // 紫外线指数 (健康模拟)
}

// 💨 空气要素 (The Climate Field)
export interface IAirState {
  temp: number;         // 干球温度 (°C)
  humidity: number;     // 相对湿度 (%)
  co2: number;          // 二氧化碳浓度 (ppm)
  voc?: number;         // 挥发性有机物 (ppb)
  flowVelocity: number; // 气流速度 (m/s) - 决定体感风
}

// 🔊 声音要素 (The Acoustic Field)
export interface ISoundState {
  level: number;        // 声压级 (dB)
  reverberation: number;// 混响时间 (ms) - 0为消音室，2000为大教堂
  isWhiteNoise: boolean;// 是否为白噪音掩蔽
}

// 📡 电磁要素 (The Invisible Web)
export interface IEMState {
  wifiSignal: number;   // RSSI (dBm)
  cellular: number;     // 5G/6G 强度 (dBm)
  interference: number; // 电磁干扰水平 (0-100)
}

// ⚡ 能源要素 (The Power Grid)
export interface IEnergyState {
  availablePower: number; // 当前可用功率余量 (Watts)
  voltage: 'AC_220V' | 'AC_110V' | 'DC_48V' | 'DC_12V';
  wirelessField: boolean; // 是否有无线充电场覆盖
}

// 🖼️ 视觉要素 (The Digital Surface)
export interface IVisualState {
  mode: 'TRANSPARENT' | 'SCENIC' | 'INFO_DASHBOARD' | 'BLACKOUT';
  activeTheme?: string;   // 例如 "Mars_Sunset" 或 "Forest_Rain"
}

// 📦 空间状态总集 (The Snapshot)
export interface ISpaceSnapshot {
  spaceId: string;
  timestamp: number;
  isHomogeneous: boolean; // 是否处于均一性状态
  elements: {
    light?: ILightState;
    air?: IAirState;
    sound?: ISoundState;
    em?: IEMState;
    energy?: IEnergyState;
    visual?: IVisualState;
  };
}

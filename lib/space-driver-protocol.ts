// lib/space-driver-protocol.ts

/**
 * 🌌 SpaceSQ 全要素物理能力描述符 (Full Spectrum Physics Capability)
 * 厂商/用户需根据设备实际能力填写。未涉及的字段请留空或设为 null。
 * 系统会自动将 null 字段渲染为 UI 上的“灰度/锁定”状态。
 */

export interface IDevicePhysicsCapability {
  
  // ------------------------------------------------
  // 1. 💡 光要素 (Photon Field)
  // ------------------------------------------------
  light?: {
    // 基础输出
    luminousFlux: number;      // 光通量 (Lumens) - 灯泡到底有多亮
    illuminanceAt1m?: number;  // 1米处照度 (Lux) - 用于简易估算
    
    // 质感参数
    colorTempRange: [number, number]; // 色温范围 (例如 [2700, 6500] Kelvin)
    cri?: number;              // 显色指数 (Ra) - 越高越接近太阳光 (0-100)
    
    // 光束形态 (对于射灯/筒灯很重要)
    beamAngle?: number;        // 光束角 (Degrees)
    direction?: [number, number, number]; // 投射方向向量 (x,y,z)
    
    // 动态能力
    isDimmable: boolean;       // 是否可调光
    hasRGB: boolean;           // 是否有彩光
  };

  // ------------------------------------------------
  // 2. 💨 空气要素 (Atmosphere Field)
  // ------------------------------------------------
  air?: {
    // 温湿度调节
    heatingPower?: number;     // 制热能力 (Watts/BTU equivalent)
    coolingPower?: number;     // 制冷能力 (Watts/BTU equivalent)
    humidifyRate?: number;     // 加湿速率 (ml/h)
    dehumidifyRate?: number;   // 除湿速率 (L/day)
    
    // 气流控制
    windVelocityMax?: number;  // 最大出风速度 (m/s)
    airVolume?: number;        // 循环风量 (m³/h) - 决定净化速度
    
    // 净化能力
    cadr?: number;             // 洁净空气量 (m³/h)
    hepaLevel?: string;        // 滤网等级 (e.g., "H13")
    uvSterilization?: boolean; // UV杀菌功能
  };

  // ------------------------------------------------
  // 3. 🔊 声音要素 (Acoustic Field)
  // ------------------------------------------------
  sound?: {
    // 发声能力 (音箱/报警器)
    maxSpl?: number;           // 最大声压级 (dB)
    freqResponse?: [number, number]; // 频响范围 (e.g., [20, 20000] Hz)
    
    // 拾音能力 (麦克风)
    isSensor?: boolean;        // 是否是拾音设备
    micSensitivity?: number;   // 灵敏度 (dB)
    
    // 降噪能力 (吸音板/主动降噪)
    noiseReduction?: number;   // 降噪深度 (dB)
    absorptionCoeff?: number;  // 吸音系数 (0-1) - 建材专用
  };

  // ------------------------------------------------
  // 4. 📡 电磁要素 (EM Field)
  // ------------------------------------------------
  emWave?: {
    // 信号发射 (路由器/基站)
    wifiStandard?: string;     // e.g., "WiFi-6E", "WiFi-7"
    txPower?: number;          // 发射功率 (dBm)
    bands?: string[];          // 频段 (e.g., ["2.4GHz", "5GHz", "60GHz"])
    
    // 屏蔽能力 (防辐射窗帘/涂料)
    shieldingEffectiveness?: number; // 屏蔽效能 (dB)
  };

  // ------------------------------------------------
  // 5. ⚡ 能源要素 (Energy Grid)
  // ------------------------------------------------
  energy: { // *此项为必填*
    // 功耗画像
    standbyPower: number;      // 待机功耗 (W) - 关机时耗多少电
    minWorkPower: number;      // 最小工作功耗 (W)
    maxWorkPower: number;      // 满载峰值功耗 (W)
    voltage: number;           // 额定电压 (V)
    
    // 供能能力 (插座/储能电池/无线充)
    isSource?: boolean;        // 是否是供电设备
    outputCapacity?: number;   // 输出功率 (W)
    batteryCapacity?: number;  // 电池容量 (Wh)
  };

  // ------------------------------------------------
  // 6. 🖼️ 视觉要素 (Visual Surface)
  // ------------------------------------------------
  visual?: {
    // 显示能力 (电视/投影/智能窗)
    screenSize?: [number, number]; // 物理尺寸 [宽, 高] (mm)
    resolution?: [number, number]; // 像素分辨率 [W, H]
    maxBrightness?: number;    // 峰值亮度 (Nits)
    
    // 表面属性 (电子墨水/调光玻璃)
    transparencyRange?: [number, number]; // 透明度调节范围 (0-100%)
    refreshRate?: number;      // 刷新率 (Hz)
    isTouch?: boolean;         // 是否支持触控交互
  };
}

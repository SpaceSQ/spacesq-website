# SpaceSQ Time-Series Database Schema

## 核心理念
记录空间在时间轴上的物理状态切片，而非设备操作日志。

## 表结构: space_physics_log

| Column Name | Type | Description |
| :--- | :--- | :--- |
| **id** | uuid | 主键 |
| **space_id** | string | 空间唯一编码 (关联 Space Registry) |
| **timestamp** | timestamptz | 物理状态发生的精确时间 (毫秒级) |
| **is_homogeneous** | boolean | 遵循 2x2x2.4 均一性定理? |
| **light_state** | jsonb | 光场数据 { illuminance: 500, temp: 4000 } |
| **air_state** | jsonb | 空气数据 { temp: 24.5, humidity: 45 } |
| **sound_state** | jsonb | 声场数据 { level: 35, reverb: 0 } |
| **energy_state** | jsonb | 能源数据 { power_available: 2000 } |
| **raw_hash** | string | 数据指纹 (防篡改验证) |

## 索引策略
- 针对 `space_id` 和 `timestamp` 建立联合索引，确保能毫秒级回放历史状态。
- `light_state->>'illuminance'` 建立 GIN 索引，允许进行 "查找过去一年所有光照超过 1000Lux 的时刻" 这种高级查询。

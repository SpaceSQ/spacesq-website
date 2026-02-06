import { supabase } from './supabase';

export const genesisProtocol = async (spaceId: string) => {
  // 1. 部署感知 (光照传感器)
  await supabase.from('devices').insert({
    space_suns_id: spaceId,
    name: 'LUX-SENSOR-01',
    type: 'SENSOR',
    category: 'LIGHT',
    value: 100, // 初始 100 Lux
    meta_data: { position: '2.4m_Ceiling' }
  });

  // 2. 部署执行 (照明灯具)
  await supabase.from('devices').insert({
    space_suns_id: spaceId,
    name: 'MAIN-LIGHT',
    type: 'ACTUATOR',
    category: 'LIGHT',
    status: 'OFF',
    meta_data: { power: '12W', color: '4000K' }
  });

  // 3. 部署交互 (开关面板)
  await supabase.from('devices').insert({
    space_suns_id: spaceId,
    name: 'WALL-SWITCH',
    type: 'INTERFACE',
    category: 'CONTROL',
    status: 'OFF', // 物理开关状态
    meta_data: { type: '1-Gang' }
  });

  // 4. 升级空间等级
  await supabase.from('spaces').update({ evolutionary_stage: 1 }).eq('suns_id', spaceId);
};

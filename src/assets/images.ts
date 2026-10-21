/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Direct ES imports ensure Vite bundles these assets into dist/assets with cache-busting hashes
import coverCameraImg from './images/cover_cinema_camera_1792598273865.jpg';
import studioDirectingImg from './images/hero_cinestudio_directing_1792596377688.jpg';
import shotElsImg from './images/cinematic_shot_els_1792596378390.jpg';
import shotLsImg from './images/cinematic_shot_ls_full_1792602491155.jpg';
import shotMsImg from './images/hero_cinestudio_directing_1792596377688.jpg';
import shotMcuImg from './images/cinematic_shot_mcu_bust_1792602504516.jpg';
import shotCuImg from './images/cinematic_shot_cu_1792596378215.jpg';
import shotEcuImg from './images/cinematic_shot_ecu_eye_1792602519663.jpg';
import ruleThirdsImg from './images/cinematic_composition_rule_thirds_1792596378308.jpg';
import povImg from './images/cinematic_pov_shot_1792597055563.jpg';
import droneAerialImg from './images/cinematic_drone_aerial_1792597055982.jpg';
import lowAngleImg from './images/cinematic_low_angle_1792602589314.jpg';
import highAngleImg from './images/cinematic_high_angle_1792602605321.jpg';
import dutchAngleImg from './images/cinematic_dutch_angle_1792602567708.jpg';

export const CINEMA_ASSETS = {
  coverCamera: coverCameraImg,
  studioDirecting: studioDirectingImg,
  shotEls: shotElsImg,
  shotLs: shotLsImg,
  shotMs: shotMsImg,
  shotMcu: shotMcuImg,
  shotCu: shotCuImg,
  shotEcu: shotEcuImg,
  ruleThirds: ruleThirdsImg,
  pov: povImg,
  droneAerial: droneAerialImg,
  lowAngle: lowAngleImg,
  highAngle: highAngleImg,
  dutchAngle: dutchAngleImg,
};

// Fallback public URLs (also mirrored in /public/images for maximum compatibility across all hosting providers)
export const PUBLIC_FALLBACK_IMAGES: Record<string, string> = {
  coverCamera: '/images/cover_cinema_camera.jpg',
  studioDirecting: '/images/cinematic_shot_ms.jpg',
  shotEls: '/images/cinematic_shot_els.jpg',
  shotLs: '/images/cinematic_shot_ls.jpg',
  shotMs: '/images/cinematic_shot_ms.jpg',
  shotMcu: '/images/cinematic_shot_mcu.jpg',
  shotCu: '/images/cinematic_shot_cu.jpg',
  shotEcu: '/images/cinematic_shot_ecu.jpg',
  ruleThirds: '/images/cinematic_rule_thirds.jpg',
  pov: '/images/cinematic_pov.jpg',
  droneAerial: '/images/cinematic_drone_aerial.jpg',
  lowAngle: '/images/cinematic_low_angle.jpg',
  highAngle: '/images/cinematic_high_angle.jpg',
  dutchAngle: '/images/cinematic_dutch_angle.jpg',
};


import React from 'react';

export const GAME_WIDTH = 360; // 모바일 표준 너비로 최적화
export const GAME_HEIGHT = 600;
export const PLAYER_WIDTH = 70; // 너비 감소에 따른 플레이어 크기 소폭 조정
export const OBJECT_SIZE = 40; // 너비 감소에 따른 아이템 크기 소폭 조정

export const GearIcons = {
  STRAP: (color: string) => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Left Grip */}
      <g transform="translate(1, 2) scale(0.45)">
        <path d="M2 2H18V6C18 6 18 12 14 18C10 24 6 24 6 24L2 18V2Z" fill="#545454" stroke="#333" strokeWidth="1"/>
        <path d="M4 4H16V6M4 8H16" stroke="#444" strokeWidth="0.5" strokeDasharray="1 1"/>
        <rect x="0" y="24" width="20" height="12" rx="2" fill="#333333" />
        <rect x="2" y="27" width="16" height="6" rx="1" fill="#444" stroke="#666" strokeWidth="0.5"/>
        <text x="10" y="31.5" fontFamily="Arial" fontSize="3" fontWeight="900" fill="#DDD" textAnchor="middle" letterSpacing="0.1">PROCALO</text>
      </g>
      {/* Right Grip */}
      <g transform="translate(12, 2) scale(0.45)">
        <path d="M2 2H18V6C18 6 18 12 14 18C10 24 6 24 6 24L2 18V2Z" fill="#545454" stroke="#333" strokeWidth="1"/>
        <path d="M4 4H16V6M4 8H16" stroke="#444" strokeWidth="0.5" strokeDasharray="1 1"/>
        <rect x="0" y="24" width="20" height="12" rx="2" fill="#333333" />
        <rect x="2" y="27" width="16" height="6" rx="1" fill="#444" stroke="#666" strokeWidth="0.5"/>
        <text x="10" y="31.5" fontFamily="Arial" fontSize="3" fontWeight="900" fill="#DDD" textAnchor="middle" letterSpacing="0.1">PROCALO</text>
      </g>
    </svg>
  ),
  LIFTING_BELT: (color: string) => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 10C2 8.89543 2.89543 8 4 8H20C21.1046 8 22 8.89543 22 10V14C22 15.1046 21.1046 16 20 16H4C2.89543 16 2 15.1046 2 14V10Z" fill="#8B4513" />
      <path d="M2 10C2 8.89543 2.89543 8 4 8H20C21.1046 8 22 8.89543 22 10V14C22 15.1046 21.1046 16 20 16H4C2.89543 16 2 15.1046 2 14V10Z" fill="black" fillOpacity="0.1" />
      <path d="M4 9.5H20" stroke="#A0522D" strokeWidth="0.5" strokeDasharray="1 1" />
      <path d="M4 14.5H20" stroke="#A0522D" strokeWidth="0.5" strokeDasharray="1 1" />
      <circle cx="6" cy="11" r="0.7" fill="#3E2723" />
      <circle cx="6" cy="13" r="0.7" fill="#3E2723" />
      <circle cx="9" cy="11" r="0.7" fill="#3E2723" />
      <circle cx="9" cy="13" r="0.7" fill="#3E2723" />
      <circle cx="12" cy="11" r="0.7" fill="#3E2723" />
      <circle cx="12" cy="13" r="0.7" fill="#3E2723" />
      <rect x="16" y="7" width="4" height="10" rx="1" fill="#B0BEC5" stroke="#455A64" strokeWidth="0.5" />
      <rect x="17.5" y="8" width="1" height="8" rx="0.5" fill="#CFD8DC" />
      <path d="M16 11H18" stroke="#455A64" strokeWidth="1" strokeLinecap="round" />
      <path d="M16 13H18" stroke="#455A64" strokeWidth="1" strokeLinecap="round" />
      <rect x="14" y="8" width="2" height="8" fill="#5D4037" stroke="#3E2723" strokeWidth="0.2" />
      <rect x="14.5" y="9" width="1" height="6" fill="#A0522D" fillOpacity="0.3" />
    </svg>
  ),
  KNEE_SLEEVES: (color: string) => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Elbow Sleeve Body - Black Fabric */}
      <path d="M8 2H16L18 12L16 22H8L6 12L8 2Z" fill="#1A1A1A" stroke="#333" strokeWidth="0.5"/>
      {/* Top Hem */}
      <path d="M7.8 2H16.2L16.5 3.5H7.5L7.8 2Z" fill="#111" />
      {/* Bottom Hem */}
      <path d="M7.8 22H16.2L16.5 20.5H7.5L7.8 22Z" fill="#111" />
      
      {/* ProCalo Triangle Logo (Top) */}
      <g transform="translate(10.5, 5) scale(0.12)">
        <path d="M0 0L30 5L10 15L0 0Z" fill="#777" />
      </g>
      
      {/* PROCALO Text (Bottom) */}
      <text x="12" y="19" fontFamily="Arial" fontSize="1.8" fontWeight="900" fill="#666" textAnchor="middle" letterSpacing="0.05" fontStyle="italic">PROCALO</text>
      
      {/* Fabric Texture Detail */}
      <path d="M7 10C9 10 15 10 17 10" stroke="#222" strokeWidth="0.2" strokeDasharray="1 0.5"/>
      <path d="M7 14C9 14 15 14 17 14" stroke="#222" strokeWidth="0.2" strokeDasharray="1 0.5"/>
    </svg>
  ),
  WRIST_GUARD: (color: string) => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Wrist Wrap Body - Dark Grey Fabric */}
      <g transform="translate(1, 2) rotate(-15 12 12)">
        <path d="M4 6C4 4.89543 4.89543 4 6 4H10C11.1046 4 12 4.89543 12 6V18C12 19.1046 11.1046 20 10 20H6C4.89543 20 4 19.1046 4 18V6Z" fill="#546E7A" stroke="#37474F" strokeWidth="0.5"/>
        <path d="M4.5 8H11.5M4.5 12H11.5M4.5 16H11.5" stroke="#455A64" strokeWidth="0.2"/>
        <rect x="5" y="14" width="6" height="4" fill="#455A64" rx="0.5"/>
        <rect x="5" y="6" width="6" height="3" fill="#37474F" rx="0.5"/>
        <text x="8" y="8.2" fontFamily="Arial" fontSize="1.2" fontWeight="900" fill="#ECEFF1" textAnchor="middle" letterSpacing="0.05">PROCALO</text>
        <path d="M4 18C2 18 1 17 1 16C1 15 2 14 4 14" stroke="#546E7A" strokeWidth="1" fill="none" strokeLinecap="round"/>
      </g>
      <g transform="translate(11, 4) rotate(15 12 12)">
        <path d="M4 6C4 4.89543 4.89543 4 6 4H10C11.1046 4 12 4.89543 12 6V18C12 19.1046 11.1046 20 10 20H6C4.89543 20 4 19.1046 4 18V6Z" fill="#78909C" stroke="#455A64" strokeWidth="0.5"/>
        <path d="M4.5 8H11.5M4.5 12H11.5M4.5 16H11.5" stroke="#546E7A" strokeWidth="0.2"/>
        <rect x="5" y="14" width="6" height="4" fill="#546E7A" rx="0.5"/>
        <rect x="5" y="6" width="6" height="3" fill="#455A64" rx="0.5"/>
        <text x="8" y="8.2" fontFamily="Arial" fontSize="1.2" fontWeight="900" fill="#ECEFF1" textAnchor="middle" letterSpacing="0.05">PROCALO</text>
        <path d="M7 16L9 18L7 19V16Z" fill="white" fillOpacity="0.8"/>
        <path d="M12 18C14 18 15 17 15 16C15 15 14 14 12 14" stroke="#78909C" strokeWidth="1" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  ),
  SOFA: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Sofa Base */}
      <rect x="2" y="14" width="20" height="6" rx="1.5" fill="#455A64" />
      <rect x="3" y="12" width="18" height="3" rx="1" fill="#546E7A" />
      {/* Backrest */}
      <path d="M3 14V8C3 6.89543 3.89543 6 5 6H19C20.1046 6 21 6.89543 21 8V14" fill="#37474F" />
      <path d="M5 7H19" stroke="#546E7A" strokeWidth="0.5" />
      {/* Cushions */}
      <rect x="4" y="9" width="7.5" height="5" rx="1" fill="#455A64" />
      <rect x="12.5" y="9" width="7.5" height="5" rx="1" fill="#455A64" />
      {/* Armrests */}
      <rect x="2" y="10" width="3" height="5" rx="1.5" fill="#263238" />
      <rect x="19" y="10" width="3" height="5" rx="1.5" fill="#263238" />
      {/* Legs */}
      <rect x="4" y="20" width="2" height="2" fill="#212121" />
      <rect x="18" y="20" width="2" height="2" fill="#212121" />
      {/* Warning Glow */}
      <path d="M6 11H18" stroke="#ef4444" strokeWidth="0.5" strokeOpacity="0.3" />
    </svg>
  ),
  PHONE: (color: string) => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Device Body */}
      <rect x="6" y="2" width="12" height="20" rx="3" fill="#1A1A1A" stroke="#333" strokeWidth="0.5"/>
      {/* Screen with Content */}
      <rect x="7.5" y="4" width="9" height="13.5" rx="1" fill="#000" />
      {/* UI Elements (Simulating Distraction) */}
      <rect x="8.5" y="5.5" width="7" height="1.5" rx="0.5" fill="#222" />
      <rect x="8.5" y="7.5" width="7" height="6" rx="0.5" fill="#111" />
      <circle cx="10" cy="14.5" r="0.8" fill="#3b82f6" fillOpacity="0.6" /> {/* Like button? */}
      <path d="M12 14.5L13.5 15.5L13 14L14.5 13L12.7 13L12 11.5L11.3 13L9.5 13L11 14L10.5 15.5L12 14.5Z" fill="#ef4444" fillOpacity="0.5" transform="translate(2, 0) scale(0.6)" />
      {/* Bottom Button */}
      <circle cx="12" cy="19.5" r="1.2" fill="#333"/>
      {/* Top Sensor */}
      <rect x="11" y="3" width="2" height="0.5" rx="0.25" fill="#222"/>
    </svg>
  )
};

export const ITEMS = {
  STRAP: { points: 20, color: 'text-neutral-400', icon: GearIcons.STRAP, label: '그립스트랩' }, 
  LIFTING_BELT: { points: 15, color: 'text-orange-400', icon: GearIcons.LIFTING_BELT, label: '리프팅벨트' },
  KNEE_SLEEVES: { points: 10, color: 'text-neutral-200', icon: GearIcons.KNEE_SLEEVES, label: '팔꿈치보호대' },
  WRIST_GUARD: { points: 10, color: 'text-neutral-400', icon: GearIcons.WRIST_GUARD, label: '손목보호대' },
  SOFA: { points: -30, color: 'text-red-500', icon: GearIcons.SOFA, label: '나태함' },
  PHONE: { points: -20, color: 'text-slate-300', icon: GearIcons.PHONE, label: '휴대폰' },
};

export const MILESTONES = [
  { score: 0, reward: '5% 할인: [START_GEAR05]' },
  { score: 50, reward: '10% 할인: [CALO_POWER10]' },
  { score: 100, reward: '15% 할인: [PRO_ELITE15]' },
];

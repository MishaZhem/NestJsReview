export interface PromoCode {
  code: string;
  discountPercent: number;
  maxUses: number;
  usedCount: number;
  expiresAt: string;
}

export const PROMO_CODES: PromoCode[] = [
  { code: 'WELCOME10', discountPercent: 10, maxUses: 1000, usedCount: 0, expiresAt: '2026-12-31' },
  { code: 'BLACKFRIDAY', discountPercent: 30, maxUses: 3, usedCount: 0, expiresAt: '2026-11-30' },
];

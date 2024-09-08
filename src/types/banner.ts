import { Database } from '../../database.types';
import { Date, Id, Nullable } from './common';

export type BannerStatus = 'active' | 'inactive' | 'scheduled' | 'expired';
export type HomeRollingBannerType = 'community' | 'ad' | 'etc';

export type HomeRollingBanner = Database['public']['Tables']['home_rolling_banner']['Row'];

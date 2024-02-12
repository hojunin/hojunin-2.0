import { Date, Id, Nullable } from './common';

export type BannerStatus = 'active' | 'inactive' | 'scheduled' | 'expired';
export type HomeRollingBannerType = 'community' | 'ad' | 'etc';

export interface HomeRollingBanner {
  id: Id;
  created_at: Date;
  impression_started: Date;
  impression_ended: Date;
  title: string;
  sub_title: string;
  click_path: string;
  status: BannerStatus;
  type: HomeRollingBannerType;
  background_image: Nullable<string>;
  background_color: Nullable<string>;
}

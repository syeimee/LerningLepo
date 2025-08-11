interface QiitaGroup {
  created_at: string;
  description: string;
  name: string;
  private: boolean;
  updated_at: string;
  url_name: string;
}

export interface QiitaTag {
  name: string;
  versions: string[];
}

interface QiitaUser {
  description: string;
  facebook_id: string;
  followees_count: number;
  followers_count: number;
  github_login_name: string;
  id: string;
  items_count: number;
  linkedin_id: string;
  location: string;
  name: string;
  organization: string;
  permanent_id: number;
  profile_image_url: string;
  team_only: boolean;
  twitter_screen_name: string;
  website_url: string;
}

interface QiitaTeamMembership {
  name: string;
}

export interface QiitaArticleProps { //all
  rendered_body: string;
  body: string;
  coediting: boolean;
  comments_count: number;
  created_at: string;
  group: QiitaGroup;
  id: string;
  likes_count: number;
  private: boolean;
  reactions_count: number;
  stocks_count: number;
  tags: QiitaTag[];
  title: string;
  updated_at: string;
  url: string;
  user: QiitaUser;
  page_views_count: number;
  team_membership: QiitaTeamMembership;
  organization_url_name: string;
  slide: boolean;
}

export interface QiitaItem {
  comments_count: number;
  created_at: string;
  id: string;
  likes_count: number;
  page_views_count: number;
  private: boolean;
  tags: QiitaTag[];
  title: string;
  updated_at: string;
  url: string;
  user:{
    id: string;
    profile_image_url: string;
  }
}

export type QiitaProps = {
  config: any,
  data: QiitaArticleProps[];
  headers: string;
  request: string;
  status: number;
  statusText: string;
}


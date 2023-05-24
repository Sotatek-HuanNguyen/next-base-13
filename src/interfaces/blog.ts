interface IImg {
  id: number;
  attributes: {
    url: string;
  };
}

export interface IBlog {
  title: string;
  slug: string;
  total_view: string | number;
  pinned: null;
  tags: string;
  content: string;
  publish_at: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  thumb: {
    data: IImg[];
  };
}

export interface BlogRequest {
  slug: string;
}

export interface BlogResponse {
  id: number | string;
  attributes: {
    title: string;
    creator: string;
    createdAt: string;
    thumb: any;
    tags: [];
  };
}

export interface ViewBlogResponse {
  id: number;
  title: string;
  desc: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  total_view: string | number;
  pinned: null;
  tags: null;
}

export interface CreateBlogRequest {
  title: string;
  content: string;
  slug: string;
  tags: null;
}

export interface PostFormDataBody {
  [key: string]: string | Blob;
}

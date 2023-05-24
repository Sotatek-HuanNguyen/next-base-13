export type Blog = {
  id: number;
  attributes: {
    title: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    tags: string;
    thumb?: any;
    content: string;
  };
};

export type AttrsPagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type Pagination = {
  pagination: AttrsPagination;
};

export type DataBlogs = {
  data: Blog[];
  meta: Pagination;
};

export type TCategories = {
  [category: string]: string;
};

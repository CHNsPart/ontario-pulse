export interface Blog {
  slug: string;
  title: string;
  author: string;
  datePublished: string;
  description: string;
  content: Content[];
  imageUrl: string;
  references: string[];
  category: string;
  subcategory: string; 
}


export interface Content {
  type: 'paragraph' | 'image' | 'link' | 'title' | 'subtitle' | 'smallText' | 'quote' | 'italic';
  text?: string;
  url?: string;
  src?: string;
  alt?: string;
}

export interface ImageContent extends Content {
  type: 'image';
  src: string;
  alt: string;
}
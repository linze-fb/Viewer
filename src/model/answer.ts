export default interface Answer {
  datetime_created: string;
  question: string;
  status: string;
  output: Output;
}

export interface Output {
  articlesection_set: ArticleSection[];
}

export interface ArticleSection {
  articleparagraph_set: ArticleParagraph[];
}

export interface ArticleParagraph {
  articlespan_set: ArticleSpan[];
}

export interface ArticleSpan {
  text: string;
  citations: Citation[];
}

export interface Citation {
  citation: string;
  metadata: CitationMetadata;
}

export interface CitationMetadata {
  snippet_text: string;
  citation_detail: CitationDetail;
}

export interface CitationDetail {
  doi: string;
  href: string;
  pmid: number;
  title: string;
  repository: string;
  dt_published: string;
  journal_name: string;
  journal_owner?: string | null;
  authors_string: string;
  dt_last_updated?: string | null;
  journal_short_name: string;
  publication_info_string: string;
}

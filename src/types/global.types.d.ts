interface PlayList {
  kind: string;
  etag: string;
  nextPageToken: string;
  items: Item[];
  pageInfo: PageInfo;
}

interface Item {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
}

interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: ResourceId;
  videoOwnerChannelTitle?: string;
  videoOwnerChannelId?: string;
}

interface Thumbnails {
  default?: Default;
  medium?: Medium;
  high?: High;
  standard?: Standard;
  maxres?: Maxres;
}

interface Default {
  url: string;
  width: number;
  height: number;
}

interface Medium {
  url: string;
  width: number;
  height: number;
}

interface High {
  url: string;
  width: number;
  height: number;
}

interface Standard {
  url: string;
  width: number;
  height: number;
}

interface Maxres {
  url: string;
  width: number;
  height: number;
}

interface ResourceId {
  kind: string;
  videoId: string;
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

interface SpotifyAuthResponse {
  expires: string;
  user: SpotifyUser;
}

interface SpotifyUser {
  email: string;
  image: string;
  name: string;
}

interface RequestSheetGoogle {
  email: string;
  name: string;
}

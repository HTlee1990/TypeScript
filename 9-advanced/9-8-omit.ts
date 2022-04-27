{
  type Video = {
    title: string;
    id: string;
    url: string;
    data: string;
  };
  type VideoMetadata = Omit<Video, 'url' | 'data'>;

  function getVideo2(id: string): Video {
    return {
      id,
      title: 'video',
      url: 'https://...',
      data: 'byte-data..',
    };
  }

  function getVideoMetaData2(id: string): VideoMetadata {
    return {
      id: id,
      title: 'title',
    };
  }
}

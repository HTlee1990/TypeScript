{
  type Video = {
    title: string;
    id: string;
    url: string;
    data: string;
  };
  type VideoMetadata = Pick<Video, 'id' | 'title'>;

  function getVideo(id: string): Video {
    return {
      id,
      title: 'video',
      url: 'https://...',
      data: 'byte-data..',
    };
  }

  function getVideoMetaData(id: string): VideoMetadata {
    return {
      id: id,
      title: 'title',
    };
  }
}

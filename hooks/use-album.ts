import { useCallback, useEffect, useState } from "react";
import { discogsClient } from "util/discogs-client";

export type DiscogsReleaseType = {
  id: number;
  title: string;
  images: {
    uri: string;
  }[];
  genres: string[];
  artists?: { name: string }[];
};

export const useAlbum = (id: string) => {
  const [album, setAlbum] = useState<DiscogsReleaseType>();

  const fetchAlbum = useCallback(async () => {
    if (!id) {
      return;
    }

    try {
      const album = await discogsClient.getAlbumRelease<DiscogsReleaseType>(id);
      setAlbum(album);
    } catch (error) {
      setAlbum(undefined);
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    if (!id) {
      setAlbum(undefined); // Clear album when ID is empty
      return;
    }

    fetchAlbum();
  }, [fetchAlbum, id]);

  return album;
};

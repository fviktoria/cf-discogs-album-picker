import React, { useEffect, useState } from "react";
import {
  EntityList,
  EntityListItem,
  FormLabel,
  TextInput,
} from "@contentful/f36-components";
import { FieldAppSDK } from "@contentful/app-sdk";
import { /* useCMA, */ useSDK } from "@contentful/react-apps-toolkit";
import { useAlbum } from "hooks/use-album";
import useDebounceValue from "hooks/use-debounce-value";

const Field = () => {
  const sdk = useSDK<FieldAppSDK>();

  const [releaseId, setReleaseId] = useState<string>(
    sdk.field.getValue()["id"]?.toString()
  );
  const debouncedReleaseId = useDebounceValue(releaseId);
  const album = useAlbum(debouncedReleaseId);

  useEffect(() => {
    if (album) {
      sdk.field.setValue(album);
      sdk.entry.fields["title"].setValue(
        `${album.title} – ${album.artists
          ?.map((artist) => artist.name)
          .join(", ")}`
      );
    }
  }, [album, sdk.entry.fields, sdk.field]);

  return (
    <>
      <FormLabel>
        Release ID
        <TextInput
          value={releaseId}
          onChange={(e) => setReleaseId(e.target.value)}
        />
      </FormLabel>
      {album && (
        <EntityList>
          <EntityListItem
            title={album.title}
            description={album.artists?.map((artist) => artist.name).join(", ")}
            thumbnailUrl={album.images[0].uri}
          />
        </EntityList>
      )}
    </>
  );
};

export default Field;

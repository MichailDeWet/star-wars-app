import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilms } from "../../api/films";
import {
  fetchFilmsStart,
  fetchFilmsSuccess,
  fetchFilmsFailure,
} from "../../store/filmsSlice";
import { RootState } from "../../store/store";
import { fetchCharacterData } from "../../api/characters";
import { IUseCharacters } from "../../models/interfaces";
import { fetchCharactersSuccess } from "../../store/charactersSlice";
import { useParams } from "react-router-dom";
import { getCharacterById } from "../../utils/characterUtils";
import { DataEndpoints } from "../../models/enums";

const apiUrl = process.env.REACT_APP_SWAPI_URL;

export const useCharacters = ({
  film = undefined,
  isInView = undefined,
}: IUseCharacters) => {
  const dispatch = useDispatch();
  const { character_id } = useParams<{
    character_id: string;
    trail: string;
  }>();

  const { characters, sortKey, sortDirection, loading, error } = useSelector(
    (state: RootState) => state.characters
  );

  const currentCharacter = useMemo(
    () => getCharacterById(characters, character_id),
    [characters, character_id]
  );

  useEffect(() => {
    if (isInView || (isInView === undefined && character_id)) {
      let missingCharacterUrls: string[] = [];

      if (!currentCharacter) {
        missingCharacterUrls = [
          `${apiUrl}${DataEndpoints.PEOPLE}/${character_id}`,
        ];
      }

      if (film) {
        missingCharacterUrls = film.characters.filter(
          (url) => !characters.some((character) => character.url === url)
        );
      }

      if (missingCharacterUrls.length > 0) {
        fetchCharacterData(missingCharacterUrls).then((data) => {
          dispatch(fetchCharactersSuccess(data));
        });
      }
    }
  }, [isInView, characters, film?.characters, character_id, currentCharacter]);

  return {
    characters,
    currentCharacter,
    sortKey,
    sortDirection,
    loading,
    error,
  };
};

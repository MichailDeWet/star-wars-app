import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { fetchEntityData } from "../../api/entity";
import { IUseCharacters } from "../../models/interfaces";
import {
  fetchCharactersFailure,
  fetchCharactersStart,
  fetchCharactersSuccess,
} from "../../store/charactersSlice";
import { useParams } from "react-router-dom";
import { extractNumberFromUrl, getItemById } from "../../utils/entityUtils";
import { DataEndpoints, PagesPaths } from "../../models/enums";
import { Character } from "../../models/types";

const apiUrl = process.env.REACT_APP_SWAPI_URL;

export const useCharacters = ({
  givenCharacters = undefined,
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
    () => getItemById<Character>(characters, character_id),
    [characters, character_id]
  );

  const createNavLink = (url: string, name: string) => {
    return `${PagesPaths.CHARACTERS}/${extractNumberFromUrl(
      url
    )}/star-wars-character-${name.toLowerCase().replace(/ /g, "-")}`;
  };

  useEffect(() => {
    debugger;
    if (isInView || (isInView === undefined && character_id)) {
      let missingCharacterUrls: string[] = [];

      /* Get only the current character */
      if (!currentCharacter && character_id) {
        missingCharacterUrls = [
          `${apiUrl}${DataEndpoints.PEOPLE}/${character_id}`,
        ];
      }

      /* Get all characters not currently in Redux */
      if (givenCharacters) {
        missingCharacterUrls = givenCharacters.filter(
          (url) => !characters.some((character) => character.url === url)
        );

        if (error) {
          missingCharacterUrls = missingCharacterUrls.filter((url) =>
            error.some((failed) => failed === url)
          );
        }
      }

      if (missingCharacterUrls.length > 0) {
        dispatch(fetchCharactersStart());

        fetchEntityData<Character>(missingCharacterUrls)
          .then((data) => dispatch(fetchCharactersSuccess(data)))
          .catch((_error) =>
            dispatch(fetchCharactersFailure(["Error fetching Characters"]))
          );
      }
    }
  }, [
    isInView,
    characters,
    givenCharacters,
    character_id,
    currentCharacter,
    dispatch,
    error,
  ]);

  return {
    characters,
    currentCharacter,
    sortKey,
    sortDirection,
    loading,
    error,
    createNavLink,
  };
};

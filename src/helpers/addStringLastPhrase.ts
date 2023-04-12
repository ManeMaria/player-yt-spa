export const addStringLastPhrase = (phrase: string) => {
  if (!phrase) return '';
  const identify2023String = phrase?.endsWith('2023');
  if (identify2023String) {
    return phrase;
  }

  const newPhrase = `${phrase} - 2023`;
  return newPhrase;
};

export const randStr = (length: number) => {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export const convertYoutubeUrl = (url?: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url?.match(regExp);

  const videoId = match && match[2].length === 11 ? match[2] : null;
  return "https://www.youtube.com/embed/" + videoId;
};

export const validateYoutubeUrl = (value: string) => {
  return new RegExp(
    /https?:\/\/(.+?\.)?(youtube\.com|youtu\.be)(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?$/g
  ).test(value);
};

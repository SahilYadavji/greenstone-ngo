export const translateText = async (
  text,
  target
) => {

  try {

    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${target}&dt=t&q=${encodeURIComponent(text)}`
    );

    const data = await response.json();

    return data[0][0][0];

  } catch (error) {

    console.log(error);

    return text;

  }

};
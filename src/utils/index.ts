export const defaultAvatars: Record<string, any> = {
  male: require('../assets/images/defaultAvatars/manAvatar.png'),
  female: require('../assets/images/defaultAvatars/womanAvatar.png'),
  unknown: require('../assets/images/defaultAvatars/unknownAvatar.png'),
};

export const houseImageMap: Record<string, any> = {
  Gryffindor: require('../assets/images/gryffindorLogo.png'),
  Slytherin: require('../assets/images/slytherinLogo.png'),
  Ravenclaw: require('../assets/images/ravenclawLogo.png'),
  Hufflepuff: require('../assets/images/hufflepuffLogo.png'),
};

export const getDefaultAvatars = (image: string, gender: string | null) => {
  return image
    ? {uri: image}
    : defaultAvatars[gender as keyof typeof defaultAvatars] ||
        defaultAvatars.unknown;
};

export const formatArray = (arr: string[]) =>
  arr.length > 0 ? arr.join(', ') : 'unknown';

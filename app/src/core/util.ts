export const bytesToMegabytes = (bytes: number) => {
  return bytes / 1024 / 1024;
};

export const bytesToKilobytes = (bytes: number) => {
  return bytes / 1024;
};

export const round = (num: number) => Math.round(num);

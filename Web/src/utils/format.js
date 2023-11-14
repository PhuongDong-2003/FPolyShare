export const formatDateOrString = (time) => {
  try {
    return new Intl.DateTimeFormat("vi-VN", {
      dateStyle: "short"
    }).format(new Date(time))
  } catch (error) {
    return time;
  }
}

export const formatNumber = (number) => {
  return new Intl.NumberFormat("vi-VN", {
    notation: "compact",
    compactDisplay: "short",
  }).format(number);
}
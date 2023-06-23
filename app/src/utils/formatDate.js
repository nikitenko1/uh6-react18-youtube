export const calculateCreatedTime = (timeCreated) => {
  let periods = {
    "last year": 365 * 30 * 24 * 60 * 60 * 1000,
    "last month": 30 * 24 * 60 * 60 * 1000,
    "last week": 7 * 24 * 60 * 60 * 1000,
    yesterday: 24 * 60 * 60 * 1000,
    "hours ago": 60 * 60 * 1000,
    "minute ago": 60 * 1000,
  };

  let diff = Date.now() - +new Date(`${timeCreated}`);

  for (const key in periods) {
    if (diff >= periods[key]) {
      let result = Math.floor(diff / periods[key]);
      return `${result} ${result === 1 ? key : key}`;
    }
  }

  return "Now";
};

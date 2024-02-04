const getDateFormat = (datetime: string) => {
  let res ="";

  datetime.substring(0,10).split('-',3).forEach((item, index)=> {
    res += item;
    if(index === 2) {
      return;
    }
    res += "-";
  })

  datetime.substring(11,datetime.length).split(':',2).forEach((item, index) => {
    if(index===0) {
      res += " [";
    }
    res += item;
    if(index===0) {
      res += ":";
    } else {
      res += "]";
    }
  })

  res.concat(res);

  return res;
}

export default getDateFormat;
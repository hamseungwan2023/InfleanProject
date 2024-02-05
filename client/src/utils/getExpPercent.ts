export const getExpPercent = (rank:number, postCounts: number) => {
  if(rank === 11) {
    return 0;
  }else {
    return (rank+1)*10 - postCounts;
  }
}
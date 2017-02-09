export default {
  //가격 단위로 쉼표 찍기
  addPriceComma: (price)=>{
    if(price>0){
      price = price.toString();
      var priceAdd;
      var rest = price.length%3;
      var front = 0;
      priceAdd=price.substring(front,rest);
      front+=rest;
      for(var i=front; i<price.length-rest;i+=3){
        priceAdd+=","+price.substring(i,i+3);
      }
      if(priceAdd[0] == ',') priceAdd = priceAdd.substring(1, priceAdd.length);
      return priceAdd;
    }else return 0;
  },
  postCounsel: (data)=>{
    fetch('http://www.roompackers.com/db/counsel/post', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          portfolio: data.portfolio,
          provider: data.provider,
          name: data.name,
          hometype: data.hometype,
          location: data.location,
          size: data.size,
          roomtype: data.roomtype,
          phone: data.phone,
        })
    }).then((response) => response.json()).
    then((responseData) => {
      return true;
    })
    .done();
  },
};

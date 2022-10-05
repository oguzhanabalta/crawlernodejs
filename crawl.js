import axios from "axios";
import cheerio from "cheerio";
const page_number = 1;
const data_offset = 32;
const domain="https://oa01.widget.ega.eu"
const url = `https://oa01.widget.ega.eu/widget/fahrzeuge/alle/module/car/controller/index/seite/1?bot=iamnotabot&dontCompress=1&offset=4&resultorder=PreisLaden&resultdirection=ASC`;




fetchData(url).then( (res) => {

    const html = res.data;
    const $ = cheerio.load(html);
    const carPrice = $('.search-result-vehicle-box>.vehicle-price-container>.price');
    // carPrice.each(function() {
    //     let price = $(this).find('a').text().trim();
    //     console.log('carPrice:', price);
    // });

    const carImage = $('.search-result-vehicle-box>.vehicle-image-container>a>.vehicle-image-wrap>img');


    const carName = $('.vehicle-title>a .brand-and-model');
    // carName.each(function() {
    //     let title = $(this).text().trim();
    //     console.log('carName:', title);
    // });




    const carSubtitle = $('.search-result-vehicle-box>.vehicle-info-container .model-zusatz');
    // carSubtitle.each(function() {
    //     let title = $(this).text().trim();
    //     console.log('carSubtitle:', title);
    // });
    //
    const carModelYear = $('.vehicle-title>a>div>span.first-registration');
    // carModel.each(function() {
    //     let title = $(this).text().trim();
    //     console.log('carModel:', title);
    // });
    //
    const carDistance = $('.vehicle-title>a>div>span.mileage');
    // carDistance.each(function() {
    //     let title = $(this).text().trim();
    //     console.log('carDistance:', title);
    // });
    //
    const carPetrol = $('.vehicle-title>a>div>span.petrol');
    // carPetrol.each(function() {
    //     let title = $(this).text().trim();
    //     console.log('carPetrol:', title);
    // });
    //
    const carPower = $('.vehicle-title>a>div>span.power');
    // carPower.each(function() {
    //     let title = $(this).text().trim();
    //     console.log('carPower:', title);
    // });
    //
    const carGear = $('.vehicle-title>a>div>span.gear');
    // carGear.each(function() {
    //     let title = $(this).text().trim();
    //     console.log('carGear:', title);
    // });
    //
    const carColor = $('.vehicle-title>a>div>span.color');
    // carColor.each(function() {
    //     let title = $(this).text().trim();
    //     console.log('carColor:', title);
    // });

    const carConsumption = $('.search-result-vehicle-box>.vehicle-info-container>.vehicle-info>.row:nth-child(1)>div>.value');
    // carConsumption.each(function() {
    //     let info = $(this).text().trim();
    //     console.log('carConsumption:', info);
    // });

    const carCO2 = $('.search-result-vehicle-box>.vehicle-info-container>.vehicle-info>.row:nth-child(2)>div>.value');
    // carCO2.each(function() {
    //     let info = $(this).text().trim();
    //     console.log('carInfo:', info);
    // });

    for (let i = 0; i < carPrice.length; i++) {
        const car = {
            'carName': carName[i]?.children[0].data.trim(),
            'carImage': domain+carImage[i]?.attribs['src'],
            'carPrice': carPrice[i]?.children[0].data.trim(),
            'carSubtitle': carSubtitle[i]?.children[0].data.trim(),
            'carModelYear': carModelYear[i]?.children[0].data.trim(),
            'carDistance': carDistance[i]?.children[0].data.trim(),
            'carPetrol': carPetrol[i]?.children[0].data.trim(),
            'carPower': carPower[i]?.children[0].data.trim(),
            'carGear': carGear[i]?.children[0].data.trim(),
            'carColor': carColor[i]?.children[0].data.trim(),
            'carConsumption': carConsumption[i]?.children[0].data.trim(),
            'carCO2': carCO2[i]?.children[0].data.trim(),
        };
        console.log(car);

    };
})




async function fetchData(url){
    console.log("Crawling data...")
    // make http call to url
    let response = await axios(url).catch((err) => console.log(err));

    if(response.status !== 200){
        console.log("Error occurred while fetching data");
        return;
    }
    return response;
}


// const collectedData = [
//     {car_title: "carName", car_subtitle:"dd.", car_price: "carPrice", model:"1995", km:"123.123km", car_info: "carInfo", kw:"107kw", farbe:"schwarz", verbrauch: "6.60", co:"123gkm"}
// ]

const collectedData = [
    {car_title: "carName", car_subtitle:"dd.", car_price: "carPrice", model:"1995", km:"123.123km", car_info: "carInfo", kw:"107kw", farbe:"schwarz", verbrauch: "6.60", co:"123gkm"}
]



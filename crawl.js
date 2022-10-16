import axios from "axios";
import cheerio from "cheerio";
import fs from 'fs';


function run(page_number) {
    const domain = 'https://oa01.widget.ega.eu';
    const data_offset = 1;
    const url = `https://oa01.widget.ega.eu/widget/fahrzeuge/alle/module/car/controller/index/seite/${page_number}?bot=iamnotabot&dontCompress=1&offset=${data_offset}&resultorder=PreisLaden&resultdirection=ASC`;
    fetchData(url).then( (res) => {

        const html = res.data;
        const $ = cheerio.load(html);
        const carPrice = $('.search-result-vehicle-box>.vehicle-price-container>.price');
        const carImage = $('.search-result-vehicle-box>.vehicle-image-container>a>.vehicle-image-wrap>img');
        const carName = $('.vehicle-title>a .brand-and-model');
        const carSubtitle = $('.search-result-vehicle-box>.vehicle-info-container .model-zusatz');
        const carModelYear = $('.vehicle-title>a>div>span.first-registration');
        const carDistance = $('.vehicle-title>a>div>span.mileage');
        const carPetrol = $('.vehicle-title>a>div>span.petrol');
        const carPower = $('.vehicle-title>a>div>span.power');
        const carGear = $('.vehicle-title>a>div>span.gear');
        const carColor = $('.vehicle-title>a>div>span.color');
        const carConsumption = $('.search-result-vehicle-box>.vehicle-info-container>.vehicle-info>.row:nth-child(1)>div>.value');
        const carCO2 = $('.search-result-vehicle-box>.vehicle-info-container>.vehicle-info>.row:nth-child(2)>div>.value');


        for (let i = 0; i < data_offset; i++) {
            const car = {
                'title': carName[i]?.children[0].data.trim() || "",
                'photos': [domain+carImage[i]?.attribs['src']],
                'brand': carName[i]?.children[0].data.trim() || "",
                'model': carSubtitle[i]?.children[0].data.trim() || "",
                'year': carModelYear[i]?.children[0].data.trim() || "",
                'kilometers': carDistance[i]?.children[0].data.trim() || "",
                'price': carPrice[i]?.children[0].data.trim() || "",
                'description': "",
                'location': "",
                'petrol': carPetrol[i]?.children[0].data.trim().split(" |")[0] || "",
                'power': carPower[i]?.children[0].data.trim().split(" |")[0] || "",
                'gear': carGear[i]?.children[0].data.trim(),
                'color': carColor[i]?.children[0].data.trim().split("Farbe: ")[1] || "",
                'intercity_fuel_consumption': carConsumption[i]?.children[0].data.split("l/100km")[0].trim() || "",
                'avarage_fuel_consumption': "",
                'carbon_dioxide_emission': carCO2[i]?.children[0].data.split("g/km")[0].trim() || "",
                'carbon_dioxide_efficiency': "",
            };


            fs.appendFile('data.json', JSON.stringify(car) + ',', function (err) {
                if (err) throw err;
                console.log('Saved!' + i);
            });
        };
    })
}


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


for (let i = 0; i < 100; i++) {
    run(i+1);
}


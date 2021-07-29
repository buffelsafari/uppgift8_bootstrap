const itemData=[];
itemData.push({type:"event", model:"kaffeparty", image:"" ,data:"",options:["2021/07/29", "2021/07/29", "2021/08/05", "2021/09/04", "2021/09/14", "2021/08/14", "2021/08/09", "2021/09/22"], price:"280"});


itemData.push({type:"machine", model:"Caffinator9", image:"https://via.placeholder.com/160x256.png?" ,
data:["Vårat budgetalternativ, du kommer bli besviken.", "0.8l kapacitet.", "200W"], 
options:["beige", "ljusbrun"], price:"998"});

itemData.push({type:"machine", model:"Caffinator9000", image:"https://via.placeholder.com/160x256.png?" ,
data:["För finsmakaren, för priset av en begagnad toyota kan du njuta det perfekta kaffet.", "4.8l kapacitet", "1200W"], 
options:["guld", "vit", "svart", "blå"], price:"39998"});

itemData.push({type:"machine", model:"MilleniumBrew", image:"https://via.placeholder.com/160x256.png?" ,
data:["För dig som är extra speciell, brygger allt utom vanligt kaffe.", "2.4l kapacitet", "800W"], 
options:["silver", "rostfritt"], price:"1298"});

itemData.push({type:"machine", model:"KaffeFontän", image:"https://via.placeholder.com/160x256.png?" ,
data:["Inte bara en kaffemaskin, den cirkulerar kaffet genom 4 roterande munstycken. Måste ses!", "5l kapacitet", "1000W"], 
options:["granit", "marmor"], price:"8000"});

itemData.push({type:"machine", model:"Huskaffe", image:"https://via.placeholder.com/160x256.png?" ,
data:["Vill du ha helt vanligt kaffe? här är maskinen för dig.", "3l kapacitet", "800W"], 
options:["vit", "svart", "röd", "blå", "gul", "violet"], price:"1349"});



function getPriceOfModel(model)
{
    for(var i=0;i< itemData.length;i++)
    {
        if(itemData[i].model==model)
        {
            return itemData[i].price;
        }
    }
    return "0";
}


function getItems(type)
{
    const data=[];
    for(var i=0;i< itemData.length;i++)
    {
        // todo add selectors
        if(itemData[i].type==type)
        {
            data.push(itemData[i]);
        }
    }
    return data;
}




function adjustPadding()
{
    var main = document.getElementById("main-content"); 
    var paper = document.getElementById("main-paper");
    var machines = document.getElementById("machines"); 
            
    if(screen.width>=800)
    {
        main.classList="row h-100 w-100 m-0 p-4";
        paper.classList="col-md-12 shadow rounded border-dark col-sm-12 m-0 p-2 w-100";
        machines.classList="card-deck p-2";
    }
    else if(screen.width>=600)
    {
        main.classList="row h-100 w-100 m-0 p-3";
        paper.classList="col-md-12 shadow rounded border-dark col-sm-12 m-0 p-2 w-100";
        machines.classList="card-deck p-2";
    }
    else if(screen.width>=400)
    {
        main.classList="row h-100 w-100 m-0 p-2";
        paper.classList="col-md-12 shadow rounded border-dark col-sm-12 m-0 p-2 w-100";
        machines.classList="card-deck p-2";
    }
    else if(screen.width>=320)
    {
        main.classList="row h-100 w-100 m-0 p-1";
        paper.classList="col-md-12 shadow rounded border-dark col-sm-12 m-0 p-1 w-100";
        machines.classList="card-deck p-1";
    }
    else if(screen.width>=280)
    {
        main.classList="row h-100 w-100 m-0 p-0";
        paper.classList="col-md-12 shadow rounded border-dark col-sm-12 m-0 p-0 w-100";
        machines.classList="card-deck p-0";
    }
}

function sendOrder()
{ 
    localStorage.kaffePartyChoppingChart="";    
    displayBasket();
}

function displayBasket()
{
    var element=document.getElementById("table-body");
    var split=localStorage.kaffePartyChoppingChart.split(";");
    
    var sum=0;
    for(var i=0;i<split.length;i++)
    {
        if(split[i].length>0)
        {
            var depair=split[i].split(":");            
            var row=document.createElement("tr");
            element.appendChild(row);
            var head=document.createElement("th");
            head.appendChild(createRemoveButton(i));            
            head.scope="row";
            row.appendChild(head);

            for(var j=0;j<depair.length;j++)
            {
                var data=document.createElement("td");                
                var dataText=document.createTextNode(depair[j]);
                data.appendChild(dataText);
                row.appendChild(data);                
            }

            var data=document.createElement("td");
            var price=getPriceOfModel(depair[0]);
            sum+=parseInt(price);
            var dataText=document.createTextNode(price);  
            data.appendChild(dataText);
            row.appendChild(data);
        }
    }
    
    
    var bestForm=document.getElementById("best");
    var table=document.getElementById("table");
    if(sum>0)
    {
        bestForm.removeChild(bestForm.firstChild);
        var sumLine=document.createElement("p");
        var text=document.createTextNode("Total kostnad: "+sum+" kr.");
        sumLine.appendChild(text);
        bestForm.prepend(sumLine);    
            
        bestForm.style.display="block";
        table.style.display="block";    
    }
    else
    {
        bestForm.style.display="none";
        table.style.display="none";
    }
}

function createRemoveButton(value)
{
    var button=document.createElement("button");
    button.value=value;    
    button.onclick=function(){removeFromBasket(value); displayBasket()};
    button.classList="btn btn-danger";
    button.style="border-radius: 16px;";      
    var text=document.createTextNode("bort"); 
    button.appendChild(text);
    return button;
}

function removeFromBasket(index)
{ 
    var element=document.getElementById("table-body");   
    while (element.firstChild) 
    {
        element.removeChild(element.firstChild);
    }
    var split=localStorage.kaffePartyChoppingChart.split(";");

    var nchart="";
    for(var i=0;i<split.length;i++)
    {
        if(split[i].length>0 && i != index)
        {
            nchart+=split[i]+";"; 
        }
    }

    localStorage.kaffePartyChoppingChart=nchart;    
}

function putInBasket(form) 
{  
    var item=form.elements[1].value +":"+ form.elements[0].value+";";
    if (typeof localStorage.kaffePartyChoppingChart === 'undefined')
    {
        localStorage.kaffePartyChoppingChart=item;
    }
    else
    {
        localStorage.kaffePartyChoppingChart+=item;
    }
    return true;
}

function loadMachines()
{ 
    var items=getItems("machine");
    for(var i=0;i<items.length;i++)
    {
        createMachineCard(items[i].model, items[i].image, items[i].data, items[i].options, items[i].price );
    }
}        

function createMachineCard(itemName, image, dataArray, optionArray, price)
{
    var card = document.createElement("div"); 
    card.style="max-width: 400px; min-width: 278px; max-height: 400px; min-height: 400px;";
    card.classList="card shadow mb-5";

    card.appendChild(createMachineCardHeader(itemName));
    card.appendChild(createMachineCardBody(image, dataArray));
    card.appendChild(createMachineCardFooter(itemName, optionArray, price));

    var element = document.getElementById("machines");
    element.appendChild(card);     
}

function createMachineCardHeader(itemName)
{
    var header = document.createElement("div");
    header.style="font-size: 32px; height:48px; overflow: hidden; margin: 0; padding: 0;";
    header.classList="card-header text-center";
    var text = document.createTextNode(itemName); 
    header.appendChild(text);
    
    return header;    
}

function createMachineCardBody(image, dataArray)
{
    var body=document.createElement("div");
    body.classList="card-body p-1";
    body.appendChild(createImage(image));
    body.appendChild(createMachineData(dataArray));    
    return body;                   
}

function createMachineCardFooter(name, optionArray, price)
{
    var footer=document.createElement("div");
    footer.style="font-size: 32px; height:72px; overflow: hidden;";
    footer.classList="card-footer p-2";    
    footer.appendChild(createForm(name, optionArray, price));
    return footer;    
}

function createImage(image)
{
    var img=document.createElement("img");
    img.style="float:right; position: absolute;";
    img.classList="rounded border border-secondary";
    img.src=image;
    img.alt="KaffeMaskin";
    return img;    
}

function createMachineData(array)
{
    var data=document.createElement("div");
    data.style="overflow-y:auto; max-height:256px; font-size: small; padding-right: 15px; padding-left:150px; max-width:380px; float:left; width:100%;";
    var list=document.createElement("ul");
    data.appendChild(list);

    for(var i=0;i<array.length;i++)
    {
        var item=document.createElement("li");
        var text=document.createTextNode(array[i]);
        item.appendChild(text);
        list.appendChild(item);
    }

    return data;    
}

function createForm(name, optionArray, price)
{
    var frm=document.createElement("form");
    frm.onsubmit=function(){return putInBasket(this);};            
    frm.action="#";

    frm.appendChild(createOptionSelector(optionArray))
    frm.appendChild(createPriceTag(price));
    frm.appendChild(createPurchaseButton(name));

    return frm;    
}

function createOptionSelector(optionArray)
{

    var selector=document.createElement("select");
    selector.style="width: 30%;";
    selector.classList="custom-select";
    
    for(var i=0;i<optionArray.length;i++)
    {
        var opt=document.createElement("option");
        opt.value=optionArray[i];
        var text=document.createTextNode(optionArray[i]);
        opt.appendChild(text);
        selector.appendChild(opt);
    }

    return selector;   
}

function createPriceTag(price)
{
    var val=document.createElement("var");
    val.style="text-align: center; margin-left:5px; overflow: hidden; position:absolute; font-size:20px;";
    text=document.createTextNode(price+"kr");
    val.appendChild(text);
    return val;    
}

function createPurchaseButton(value)
{
    var butt=document.createElement("button");
    butt.type="submit";
    butt.classList="btn btn-success float-right mt-1";
    
    butt.onclick=function(){this.blur();};            
    butt.value=value;            
    var text=document.createTextNode("Köp");
    butt.appendChild(text);

    return butt;    
}





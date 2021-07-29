
$(document).ready(function()
{
    
    var date_input=$('input[name="orangeDateOfBirthForm"]'); //our date input has the name "date"
    var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
    var options={
        format: 'yyyy/mm/dd', //format of the date
        container: container,
        changeYear: true, // you can change the year as you need
        changeMonth: true, // you can change the months as you need
        todayHighlight: true,
        autoclose: true,
        yearRange: "2021:2121", // the starting to end of year range 
        
        beforeShowDay:function(date){return checkDates(date);},
        startDate:new Date()
        
        
    };
    date_input.datepicker(options);

    
});

function setPartyPrice()  
{
    var p=document.getElementById("part-price");
    p.innerText=getPriceOfModel("kaffeparty");
}

function checkDates(date)
{
    var opt=getItems("event")[0].options;
    
    for(var i=0;i< opt.length;i++)
    {
        testDate=new Date(opt[i]);
        if(date.getTime()==testDate.getTime())
        {            
            return true;
        }
    }
    return false;    
}

function validateForm(form)
{    
    formDate=new Date(form.elements[0].value);
    var opt=getItems("event")[0].options;
    
    for(var i=0;i< opt.length;i++)
    {
        testDate=new Date(opt[i]);
        if(formDate.getTime()==testDate.getTime())
        {      
            putInBasket(form);      
            return true;
        }
    }
    return false;
    
}

function showCarousel()
{
    var element=document.getElementById("demo");
    element.style.display="block";
}

function hideCarousel()
{
    var element=document.getElementById("demo");
    element.style.display="none";
}
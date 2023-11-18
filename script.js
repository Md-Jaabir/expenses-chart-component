let data=[];
let chart=document.querySelector(".chart-section .chart");
let loading=document.querySelector(".loading");
let totalBox=document.querySelector(".total h1");

fetch("./data.json")
.then(res=>res.json())
.then(response=>{
    data=response;
    loadData(data);
    console.log(data);
})
.catch(err=>{console.log(err)});

function loadData(data){
    chart.classList.add("active");
    loading.classList.remove("active");
    let maximum=findMax(data);
    data.forEach(element=>{
        chart.innerHTML+=`<div class="bar ${element.amount===maximum.amount ?'max':''}">
        <div style="height:${(element.amount/maximum.amount)*100}%" class="line">
          <div class="tooltip">$${element.amount}</div>
        </div>
        <div class="day">${element.day}</div>
      </div>`;
    });

    let total=calculateTotal(data);
    totalBox.innerHTML="$"+total;
}

function findMax(data){
    let maximum=0;
    let maxElement;
    data.forEach(element=>{
        if(element.amount>maximum){
            maximum=element.amount;
            maxElement=element;
        }
    });
    return maxElement;
}

function calculateTotal(data){
    let total=0;
    data.forEach((element)=>{
        total+=element.amount;
    });
    return total;
}
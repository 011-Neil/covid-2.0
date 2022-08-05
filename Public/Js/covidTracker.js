const searchBtn = document.getElementById('searchBtn');
const searchBtn1 = document.getElementById('searchBtn1');
const searchInput1 = document.getElementById('searchInput1');
const cases =  document.getElementById('cases');
const Tcases = document.getElementById('Tcases');
const Tdeath = document.getElementById('Tdeath');
const death = document.getElementById('death');
const recovered = document.getElementById('recovered');
const active = document.getElementById('active');
const CaseStat = document.getElementById('CaseStat');
const usDeath = document.getElementById('usDeath');
const country = document.getElementById('country');
const card = document.getElementById('card');
const searchInput = document.getElementById('searchInput');
const nation = document.getElementById('nation');
const hideData = document.querySelectorAll('.hideData');
const relative = document.getElementById('relative');

const checkCovid = async(event)=>{
    // event.preventDefault();
    let url = "https://api.covid19api.com/summary";
    const response = await fetch(url);
    const data = await response.json();
    const arrData = [data];
    
    // console.log(arrData[0].Global.NewConfirmed);

   
    cases.innerHTML = arrData[0].Global.TotalConfirmed;
    Tcases.innerHTML = arrData[0].Global.NewConfirmed;
    Tdeath.innerHTML = arrData[0].Global.NewDeaths;
    death.innerHTML = arrData[0].Global.TotalDeaths;
    recovered.innerHTML = arrData[0].Global.TotalRecovered;
    active.innerHTML = arrData[0].Global.TotalConfirmed - arrData[0].Global.TotalRecovered;
    
    let text = "";
    let content = "";
    for (var i = 0 ; i<192;i++){
      content += `<div class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg mt-10 mx-5">
      <div class="flex-auto p-4">
          <div class="flex flex-wrap">
              <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                <h1 class="country" id='country'>${arrData[0].Countries[i].Country}</h1>
                <div class="data">
                    <p>Cases :<span id="CaseStat">${arrData[0].Countries[i].TotalConfirmed}</span> </p>
                    <p>Death : <span id="usDeath">${arrData[0].Countries[i].TotalDeaths}</span></p>
                   
                </div>
              </div>
              <div class="relative w-auto pl-4 flex-initial">
                <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                  <i class="far fa-chart-bar"></i>
                </div>
              </div>
          </div>
      </div>
  </div>`;
      
    }

    card.innerHTML = content;

}



const searchReport = async(event)=>{

  event.preventDefault();

  let searchVal = searchInput.value;

  if(searchVal == ""){
    console.log("Search something");
  }
  else{
    try{

      let url = `https://coronavirus-19-api.herokuapp.com/countries/${searchVal}`
      let srcRespone = await fetch(url);
      let srcInfo = await srcRespone.json();
      let srcArrInfo = [srcInfo];

      // console.log(srcArrInfo);
      nation.innerHTML = srcArrInfo[0].country;
      cases.innerHTML = srcArrInfo[0].cases;
      Tcases.innerHTML = srcArrInfo[0].todayCases;
      death.innerHTML = srcArrInfo[0].deaths;
      Tdeath.innerHTML = srcArrInfo[0].todayDeaths;
      recovered.innerHTML = srcArrInfo[0].recovered;
      active.innerHTML = srcArrInfo[0].active;

      

  
    }
    catch{
      console.log("please event valid name of country");
    }
  }

}


const searchInfo = async(event)=>{

  event.preventDefault();

  let searchVal = searchInput.value;

  if(searchVal == ""){
    console.log("Search something");
  }else{

    try{
      let url = `https://api.covid19api.com/live/country/${searchVal}/status/confirmed`;
      let srcRespon = await fetch(url);
      let srcData = await srcRespon.json();
      let srcArrData = [srcData];

     

      let text = "";
    let content = "";
    for (var i = 0 ; i<srcArrData[0].length;i++){
      content += `<div class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg mt-10 mx-5" id='relative' onmouseover="hoverInfo">
      <div class="flex-auto p-4">
          <div class="flex flex-wrap">
              <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                <h1 class="country" id='country'>${srcArrData[0][i].Province}</h1>
                <div class="data">
                    <p>Confirmed :<span id="CaseStat">${srcArrData[0][i].Confirmed}</span> </p>
                    <p>Active : <span id="usDeath">${srcArrData[0][i].Active}</span></p>
                    <p>Death : <span id="usDeath">${srcArrData[0][i].Deaths}</span></p>
                    <span class="hideData" id='hide' onmousemove="hoverInfo()">
                    <p>Recovered :<span id="Recovered">${srcArrData[0][i].Recovered}</p>
                  </span>
                </div>

              </div>
              <div class="relative w-auto pl-4 flex-initial">
                <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                  <i class="far fa-chart-bar"></i>
                </div>
              </div>
          </div>
      </div>
  </div>`;
      
    }

    card.innerHTML = content;
    
  
    }
    catch{
      console.log("something when wrong");
    }
    
  }
}

// search By state code

const hoverInfo = ()=>{
  hideData.classList.remove('hide');

}






checkCovid();

searchBtn.addEventListener('click',searchReport);
searchBtn.addEventListener('click',searchInfo);
relative.addEventListener('mouseover',hoverInfo);



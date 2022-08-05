const search_pin = document.getElementById('search_pin');
const search_district = document.getElementById('search_district');
const district = document.querySelectorAll('.select');
const pin = document.getElementById('pin');
const select = document.getElementById('select');
const detail = document.getElementById('details');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const state = document.getElementById('state');
const checkBtn = document.getElementById('search');




const loadState = async(event)=>{



  // if(realVal===""){
  //   console.log("select state");

  // }
  // else{

    try{

      let url = `https://cdn-api.co-vin.in/api/v2/admin/location/states`;
      const response = await fetch(url);
      const data = await response.json();
      const arrData = [data];
  

      const optionList = document.getElementById('state');
    

      for(var i=0; i<36;i++){

        var options = arrData[0]
        var option = arrData[0].states[i];
        optionList.options.add(new Option(option.state_name,option.state_id));
      }

    }catch{
      console.log("err");
    }

  // }

}

const districtInfo = async(event)=>{

  try{

    const rel =  document.getElementById('state').value;

    let url = `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${rel}`;
    const dresponse = await fetch(url);
    const Ddata = await dresponse.json();
    const DarrData = [Ddata];

    // console.log(DarrData[0].districts.length);

    let dist = document.getElementById('district');
 
    for(var i=0; i<DarrData[0].districts.length;i++){

      // console.log(DarrData[0].districts[i].district_name);
      var options = DarrData[0];
      var option = DarrData[0].districts[i];
      dist.options.add(new Option(option.district_name,option.district_id));
    }



  }catch{
    console.log("err");
  }

}

const searchState = async(event)=>{
  event.preventDefault();

  const val = searchInput.value;

  if(val===""){
    console.log("something when wrong");
  }else{
    try{

      let url = `https://cdn-api.co-vin.in/api/v2/admin/location/states`;
      const srcResponse = await fetch(url);
      const srcData = await srcResponse.json();
      const srcarrData = [srcData];
      console.log(srcarrData);

    }catch{
      console.log("err");
    }

  }

}

const vaccineInfo = async(event)=>{

  let dist = document.getElementById('district');

  const relValue = dist.value;

  const date = new Date;
  let currMonth = date.getMonth() + 1;
  let todayDate= date.getDate()+"-"+currMonth+"-"+date.getFullYear();

  try{
    let url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${relValue}&date=${todayDate}`
    const vacRespond = await fetch(url);
    const vacData = await vacRespond.json();
    const vacArrData = [vacData];
    console.log(vacArrData[0]);

    let content  = "";
    const card = document.getElementById('content');

    // console.log(vacArrData[0].sessions[0].address);
    for(var i=0 ; i<vacArrData[0].sessions.length;i++){
      console.log(vacArrData[0].sessions[i].name);
      content +=`<div class="vaccineContent xl:w-1/3 md:w-1/2 p-4" >
      <div class="border border-gray-200 p-6 rounded-lg bg-blue">
        <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-6 h-6" viewBox="0 0 24 24">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        </div>
        <div class="block"><h2 class="text-lg text-gray-900 font-medium title-font mb-2">${vacArrData[0].sessions[i].name}</h2><h2>${vacArrData[0].sessions[i].vaccine}</h2></div>
        <h2>Availability : ${vacArrData[0].sessions[i].available_capacity} </h2>
        <h2>dose 1 : ${vacArrData[0].sessions[i].available_capacity_dose1}</h2>
        <h2>dose 2 : ${vacArrData[0].sessions[i].available_capacity_dose2}</h2>
        
      </div>
    </div>`
      
    }
    card.innerHTML=content;
    card.classList.remove('info')
  }
  catch{
    console.log("something when wrong");
  }
  

}



const districtDisplay = ()=>{

  detail.innerHTML =`<a class=" sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium  inline-flex items-center leading-none border-indigo-500 text-white tracking-wider rounded-t" onclick="pinDisplay()" id="search_pin">
  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5 mr-3" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg> Search By Pin
</a>
<a class="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center  bg-gray-100 leading-none border-gray-200 hover:text-gray-900 tracking-wider" id="search_district" onclick="districtDisplay()">
  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5 mr-3" viewBox="0 0 24 24">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
  </svg>search By District
</a>`

    pin.innerHTML = `
    <div class='main'>
    <div class="select ml-80" id="option">
    <select id="state" onclick="loadState()" onchange="districtInfo()">
    <option value="" disabled selected hidden>Select State</option>
    </select>
   <select id="district" onchange="districtInfo()" class="district mx-10">
   <option value="" disabled selected hidden>Select District</option>
   </select>
   </div>
   <button id=search onclick="vaccineInfo()"> Check <button>
   </div>
  `
}


const pinDisplay = ()=>{

  detail.innerHTML =`<a class=" sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium  inline-flex items-center bg-gray-100 leading-none border-indigo-500 text-black tracking-wider rounded-t" onclick="pinDisplay()" id="search_pin">
  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5 mr-3" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg> Search By Pin
</a>
<a class="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex text-white items-center leading-none border-gray-200 hover:text-gray-900 tracking-wider" id="search_district" onclick="districtDisplay()">
  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5 mr-3" viewBox="0 0 24 24">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
  </svg>search By District
</a>`

  pin.innerHTML=`
  
  <div class=" input bg-white flex items-center rounded-full shadow-xl  w-1/2 mx-80" >
  <input class="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none" id="searchInput" type="text" placeholder="Search by Pin">
    <div class="p-4">
    <button id="searchBtn" class="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center">
      <i class="fas fa-search fx-3"></i>
    </button>
    </div>`
    
}

search_district.addEventListener('click',districtDisplay);
searchBtn.addEventListener('click',searchState);
search_pin.addEventListener('click',pinDisplay);

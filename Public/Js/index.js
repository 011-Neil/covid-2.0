const serachBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const body = document.getElementById('body')
const  State = document.getElementById('State');
const RuralH = document.getElementById('RuralH');
const UrbanH = document.getElementById('UrbanH');
const RuralB = document.getElementById('RuralB');
const UrbanB = document.getElementById('UrbanB');
const TotalH = document.getElementById('TotalH');
const TotalB = document.getElementById('TotalB');
const alert = document.getElementById('err');
const hide = document.querySelector('.alert');

// To Display on load data
const loadData = async(event)=>{
    try{

        let url="https://api.rootnet.in/covid19-in/hospitals/beds";
        const loadResponse = await fetch(url);
        const loadInfo = await loadResponse.json();
        const loadarrInfo = [loadInfo];

        RuralH.innerHTML = `${loadarrInfo[0].data.summary.ruralHospitals}`;
        RuralB.innerHTML = `${loadarrInfo[0].data.summary.ruralBeds}`;
        UrbanH.innerHTML = `${loadarrInfo[0].data.summary.urbanHospitals}`;
        UrbanB.innerHTML = `${loadarrInfo[0].data.summary.urbanBeds}`;
        TotalH.innerHTML = `${loadarrInfo[0].data.summary.totalHospitals}`;
        TotalB.innerHTML = `${loadarrInfo[0].data.summary.totalBeds}`;
        //console.log(loadarrInfo[0].data.summary.ruralHospitals)
    }
    catch{
       err.innerHTML = `<div role="alert" class="alert" id="alert">
       <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2 w-1/2 mx-80">
         Error
       </div>
       <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700 w-1/2 mx-80">
         <p>Something went wrong please check connectivity.</p>
       </div>
     </div>`
    }
    
}

const getinfo = async(event)=>{

    event.preventDefault();

    let cityName = searchInput.value;
    if(cityName === ""){
        console.log("please enter the city name !");
        err.innerHTML = `<div role="alert">
        <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2 w-1/2 mx-80">
          Error
        </div>
        <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700 w-1/2 mx-80">
          <p>Please Enter the valid State Name (hint : first letter of state  name must be Capital).</p>
        </div>
      </div>`
        // hide.classList.add('main');
    }else{
        try{
            let url='https://api.rootnet.in/covid19-in/hospitals/beds';
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            const n=37;

            
            for(let i=0;i<=n;i++){

                if(arrData[0].data.regional[i].state === cityName){
                    State.innerHTML = `${cityName}`;
                    RuralH.innerHTML = `${arrData[0].data.regional[i].ruralHospitals}`;
                    RuralB.innerHTML = `${arrData[0].data.regional[i].ruralBeds}`;
                    UrbanH.innerHTML = `${arrData[0].data.regional[i].urbanHospitals}`;
                    UrbanB.innerHTML = `${arrData[0].data.regional[i].urbanBeds}`;
                    TotalH.innerHTML = `${arrData[0].data.regional[i].totalHospitals}`;
                    TotalB.innerHTML = `${arrData[0].data.regional[i].totalBeds}`;
                    break;
                 }
                
            
            }

            console.log(arrData);

        
           

            console.log(arrData[0].data.summary.ruralHospitals);

            // frame.addEventListener('load',loadData);

        }catch{
            err.innerHTML = `<div role="alert">
            <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2 w-1/2 mx-80">
              Error
            </div>
            <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700 w-1/2 mx-80">
              <p>Something when wrong not able to fetch data.</p>
            </div>
          </div>`
           
        }
    }
       
    

    // console.log(cityName);

}
// body.addEventListener('load',loadData);
serachBtn.addEventListener('click',getinfo);


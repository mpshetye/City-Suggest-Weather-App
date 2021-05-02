$("#searchText").keyup(function () {
  console.log("ajax is called");
  console.log("3");
  console.log("5");
  const cityName = $("#searchText").val();
  console.log(cityName);
  if (cityName.length >= 3) {
    $.ajax({
      url: `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=YOUR_API_ID&units=metric`,
        method: "GET",
        timeout: 0,
        success: function (response) {
        $("#failure").hide();
        $("#box1").css("display", "flex");
        // $("#failure").hide();
        // console.log(JSON.stringify(response));
        const objectArray = Object.entries(response);
        console.log(objectArray);
        // console.log(objectArray[11]);
        // console.log(objectArray[11][1]);

        //Temperature
        const locate = document.getElementById("locate");
        const tempr = document.getElementById("temp");
        const tempMinMax = document.getElementById("minMax");
        locate.innerHTML = `${objectArray[11][1]}, ${objectArray[8][1].country}`;
        tempr.innerHTML = `${objectArray[3][1].temp}&#x2103`;
        tempMinMax.innerHTML = `Min ${objectArray[3][1].temp_min}&#x2103 | Max ${objectArray[3][1].temp_max}&#x2103`;

        //date and time
        const dates = document.getElementById("date");
        let d = new Date();
        let localTime = d.getTime();
        let localOffset = d.getTimezoneOffset() * 60000;
        let utc = localTime + localOffset;
        const timezone = objectArray[9][1];
        let offset = timezone / 3600;
        let dat = utc + 3600000 * offset;
        const nd = new Date(dat);
        let weekday = ["SUN", "MON", "TUE", "WED", "THURS", "FRI", "SAT"];
        let month = [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC",
        ];
        let day = weekday[nd.getDay()];
        let mont = month[nd.getMonth()];
        let date = nd.getDate();
        let hours = nd.getHours();
        let hour = hours;
        let mins = nd.getMinutes();
        let period = "AM";
        if (hours > 11) {
          period = "PM";
          if (hours > 12) hours -= 12;
        }
        if (mins < 10) {
          mins = "0" + mins;
        }
        dates.innerHTML = `${day} | ${mont} ${date} | ${hours}:${mins} ${period}`;

        
        //SUNRISE
        let dRise = new Date(response.sys.sunrise*1000);
        let localTimeR = dRise.getTime();
        let localOffsetR = dRise.getTimezoneOffset() * 60000;
        let utcR = localTimeR + localOffsetR;
        let offsetR = response.timezone / 3600;
        let datR = utcR + 3600000 * offsetR;
        const nR = new Date(datR);
        let Rhours = nR.getHours();


        //SUNSET
        let dSet = new Date(response.sys.sunset*1000);
        let localTimeS = dSet.getTime();
        let localOffsetS = dSet.getTimezoneOffset() * 60000;
        let utcS = localTimeS + localOffsetS;      
        let offsetS = response.timezone / 3600;       
        let datS = utcS + 3600000 * offsetS;
        const nS = new Date(datS);
        let Shours = nS.getHours();
        

        if (Rhours <= hour && Shours > hour) {

          // document.getElementById("box1").style.backgroundColor = "#cad5e5";
          $("div#box1").css("background-color", "#cad5e5");

        } else {
          $("div#box1").css("background-color", "#c1c1c1");
        }

        let tempStat = objectArray[1][1][0].main;
        // console.log(typeof tempStat);
        const weathercon = document.getElementById('weathercon');
        if(tempStat == "Thunderstorm")
        {
          weathercon.innerHTML=`<i id="thunder" class="wi wi-thunderstorm"></i>`;
          document.getElementById("thunder").style.color = "#252d89c4";
          
        }
        else if(tempStat == "Drizzle")
        {
          weathercon.innerHTML=`<i id="drizzle" class="fas fa-cloud-rain"></i>`
          document.getElementById("drizzle").style.color = "#4b38386b";
        }
        else if(tempStat == "Rain")
        {
          weathercon.innerHTML=`<i id="rainy" class="fas fa-cloud-showers-heavy"></i>`
          document.getElementById("rainy").style.color = "#4b38386b";
        }
        else if(tempStat == "Snow")
        {
          weathercon.innerHTML=`<i id="snow" class="far fa-snowflake"></i>`;
          document.getElementById("snow").style.color = "#f8f8f8bf";
        }
        else if(tempStat == "Clear")
        {
          if(hour >= Rhours && hour<Shours){

            weathercon.innerHTML=`<i id="sun" class="fas fa-sun"></i>`;
            document.getElementById("sun").style.color = "#eccc68";
          }
          else{

            weathercon.innerHTML=`<i id="moon" class="fas fa-moon"></i>`
            document.getElementById("moon").style.color = "#f8f8f8bf";
          }
        }
        else if(tempStat == "Clouds")
        {
          weathercon.innerHTML=`<i id="cloud" class="fas fa-cloud"></i>`;
          document.getElementById("cloud").style.color = "#f8f8f8bf";
        }
        else{
          weathercon.innerHTML=``

        }
      },
      error: function (errorMessage) {
        // console.log(errorMessage);
        console.log("157");
        $("#failure").show();
        console.log("159");
        $("#box1").css("display", "none");
        // $("#searchText").val("City not found");
        console.log("City Not Found");
      },
    });
  }
});

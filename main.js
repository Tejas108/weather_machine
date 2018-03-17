$(function(){

  var api_key = "5808d7868953905d";
  var info = [];

  getLocation();

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

    function showPosition(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      getWeather(latitude,longitude);
    }

  function getWeather(lat,long) {
    $.ajax({
      url : "http://api.wunderground.com/api/"+api_key+"/conditions/q/"+lat+","+long+".json",
      dataType : "jsonp",
      success : function(parsed_json) {
        var current = "";
        info.push(
          parsed_json['current_observation']['display_location'].city,
          parsed_json['current_observation']['display_location'].state,
          parsed_json['current_observation']['temp_f'],
          parsed_json['current_observation']['temp_c'],
          parsed_json['current_observation'].weather,
          parsed_json['current_observation'].icon_url
          )

        switch (parsed_json['current_observation'].weather) {
          case "Partly Cloudy":
            current = 'img/partly-cloudy.jpg';
            break;
          case "Partly Sunny":
            current = 'img/partly-cloudy.jpg';
            break;
          case "Mostly Cloudy":
            current = 'img/partly-cloudy.jpg';
            break;
          case "Cloudy":
            current = 'img/cloudy.jpg';
            break;
          case "Overcast":
            current = 'img/overcast.jpg';
            break;
          case "Clear":
            current = 'img/sunny.jpg';
            break;
          case "Sunny":
            current = 'img/sunny.jpg';
            break;
          case "Rain":
            current = 'img/rain.jpg';
            break;
          case "Snow":
            current = 'img/snow.jpg';
            break;
          case "Thunderstorms":
            current = 'img/storm.jpg';
            break;
        }
        $('.wrap').show();
        displayInfo(info, current);
      }
    });
  }

  function displayInfo(info,current){
    $('.sk-folding-cube').hide();
    $('.city').text(info[0]);
    $('.state').text(info[1]);
    $('.temp').text(info[2]);
    $('.cond').text(info[4]);
    $('.FC').text("F");
    $('img').attr('src', info[5]);
    $('body').css('backgroundImage', 'url(' + current + ')');
  }

  $('.temp-wrap').on('click', function() {
    if ($('.FC').text() == "F") {
      $('.temp').text(info[3]);
      $('.FC').text("C");
    } else {
      $('.temp').text(info[2]);
      $('.FC').text("F");
    }
  });

});
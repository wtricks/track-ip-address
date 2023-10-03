(async () => {
    const $ = (selector) => document.querySelector(selector)
    const IP = new URL(window.location.href).searchParams.get('ip')

    // Add Ip Address on Page
    $('.bit-info p span').textContent = IP;

    fetch(`https://ipapi.co/${IP}/json`)
        .then(e => e.json())
        .then(data => {
            $('.bit-info ul').innerHTML = `
                <li>
                    <b>Lat:</b>
                    <span>${data.latitude}</span>
                </li>
                <li>
                    <b>City:</b>
                    <span>${data.city}</span>
                </li>
                <li>
                    <b>Organisation:</b>
                    <span>${12}</span>
                </li>
                <li>
                    <b>Long:</b>
                    <span>${data.longitude}</span>
                </li>
                <li>
                    <b>Region:</b>
                    <span>${data.region}</span>
                </li>
                <li>
                    <b>Hostname:</b>
                    <span>${new URL(location.href).hostname}</span>
                </li>
            `

            const iframe = document.createElement("iframe");
            iframe.style.cssText = "height:100%;width: 100%;border: 0;";
            iframe.frameBorder = "0";
            iframe.src = `https://maps.google.com/maps?q=${data.latitude},${data.longitude}&z=15&output=embed`;
            $(".map .rel-map").appendChild(iframe);

            fetch(`https://api.postalpincode.in/pincode/${data.postal}`)
                .then(e => e.json())
                .then(d => {
                    d = d[0]

                    $('.more-info').innerHTML = `
                        <h2>More Information About You</h2>
                        <p>Time Zone: <span>${data.timezone}</span></p>
                        <p>Date And Time: <span>${new Date().toUTCString()}</span></p>
                        <p>Pincode: <span>${data.postal}</span></p>
                        <p>Message: <span>${d.Message}</span></p>
                    `

                    let postalCodes = ``;
                    let codes = [...d.PostOffice];

                    const addPostalCodes = () => {
                        postalCodes = '';

                        codes.forEach(e => {
                            postalCodes += `
                                <div class="card">
                                    <p>Name: <span>${e.Name}</span></p>
                                    <p>Branch Type: <span>${e.BranchType}</span></p>
                                    <p>Delivery Status: <span>${e.DeliveryStatus}</span></p>
                                    <p>District: <span>${e.District}</span></p>
                                    <p>Division: <span>${e.Division}</span></p>
                                </div>
                            `
                        })

                        $('.po-info').innerHTML = postalCodes;
                    }

                    addPostalCodes()

                    $('form').addEventListener('submit', (e) => {
                        e.preventDefault()

                        const searchName = new RegExp($("input").value, "i");

                        codes = d.PostOffice.filter(e => searchName.test(e.Name))
                        addPostalCodes()
                    })
                })
        })

})()
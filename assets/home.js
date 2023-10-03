window.addEventListener('DOMContentLoaded', () => {
    let userIpAddress;
    fetch("https://api.ipify.org?format=json")
        .then(e => e.json())
        .then(data => {
            userIpAddress = data.ip
            document.querySelector('p span').textContent = userIpAddress
        })

    document.querySelector("button").onclick = () => {
        if (!userIpAddress) {
            alert("No IP Address found, Reload the page!")
            return
        }
        window.location.href = './info.html?ip=' + userIpAddress;
    }
})
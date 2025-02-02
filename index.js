//Getting the photos from unsplash//
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
.then(response => response.json())
.then(data => {
    document.body.style.backgroundImage = `url(${data.urls.full})`
    document.getElementById("author").textContent = `By:${data.user.name}`//Getting the users name by the url
})
//Adding the catch any error rejection promise//
.catch(err => {
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDE2NzA&ixlib=rb-1.2.1&q=80&w=1080)`
})

//ADDING THE CRYPTO CURRENCY//
fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
//check for error responses//
.then(res => {
    if (!res.ok) {
        throw Error("Something went wrong")
    }
    console.log(res.status)
    return res.json()
})
.then(data => { //DISPLAYING THE NAME AND ICON
    document.getElementById("crypto-top").innerHTML = `
    <img src=${data.image.small} />
    <span>${data.name}</span>`
    //GETTING THE PRICES//
    document.getElementById("crypto").innerHTML += `
    <p>🎯:R${data.market_data.current_price.zar}</p>
    <p>👆:R${data.market_data.high_24h.zar}</p>
    <p>👇:R${data.market_data.low_24h.zar}</p>`
})
.catch(err => console.log(err))

//ADDING THE CURRENT TIME//
const date = new Date()
 document.getElementById("time").textContent = date.toLocaleTimeString("en-sast", {timeStyle: "short"})

 //SETTING FOR THE TIME TO CHANGE//
 setInterval(getCurrentTime, 1000)

 //SETTING UP THE WEATHER//
 navigator.geolocation.getCurrentPosition(position => {
    //Getting the user's weather//
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&log=${position.coords.longitude}&unites=imperial`)
    .then(res => {
        if (!res.ok) {
            throw Error ("Weather data not available")
        }
        return res.json()
    })
    .then(data => {
        console.log(data)
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        document.getElementById("weather").innerHTML = `
        <img src=${iconUrl} />
        <p>${Math.round(data.main.temp)}C</p>
        <p>${data.name}</p>`
        
    })
    .catch(err => console.error(err))
 })
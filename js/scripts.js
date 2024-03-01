const jobContainer = document.querySelector("#job-container")
const searchContainer = document.querySelector("#search-container")
const search = document.querySelector("#search")
const clear = document.querySelector("#clear")

let tecss = []

fetch("data.json").then((response) => {
    response.json().then((data) => {

        for(let sum of data) {
            const job = document.createElement("div")
            job.classList.add("job")
        
            const jobDescription = document.createElement("div")
            jobDescription.classList.add("job-description")
        
            const imgContainer = document.createElement("div")
            imgContainer.classList.add("img-container")
            const img = document.createElement("img")
            img.src = sum.logo
            imgContainer.appendChild(img)
        
            const description = document.createElement("div")
            description.classList.add("description")
        
            const companyContainer = document.createElement("div")
            companyContainer.classList.add("company")
            const companyName = document.createElement("p")
            companyName.innerText = sum.company
            companyContainer.appendChild(companyName)
            
            if(sum.new === true) {
                const newJob = document.createElement("span")
                newJob.classList.add("new")
                newJob.innerText = "NEW"
                companyContainer.appendChild(newJob)
            }
        
            if(sum.featured === true) {
                const featured = document.createElement("span")
                featured.classList.add("featured")
                featured.innerText = "FEATURED"
                companyContainer.appendChild(featured)
                job.style.borderLeft = "5px solid #5da4a4"
            }
        
            const position = document.createElement("h3")
            position.innerText = sum.company
        
            const publishedTime = document.createElement("div")
            publishedTime.classList.add("time-published")
            const ul = document.createElement("ul")
            const postedAt = document.createElement("li")
            postedAt.innerText = sum.postedAt
            const contract = document.createElement("li")
            contract.innerText = sum.contract
            const location = document.createElement("li")
            location.innerText = sum.location
        
            ul.appendChild(postedAt)
            ul.appendChild(contract)
            ul.appendChild(location)

            publishedTime.appendChild(ul)
        
            description.appendChild(companyContainer)
            description.appendChild(position)
            description.appendChild(publishedTime)
            jobDescription.appendChild(imgContainer)
            jobDescription.appendChild(description)
        
            const habilits = document.createElement("div")
            habilits.classList.add("habilits")
        
            
            for(let sumC of sum.languages) {
                const button = document.createElement("span")
                button.innerText = sumC
                button.classList.add("hbtsBtn") 
                button.classList.add(sumC) 
                habilits.appendChild(button)
            }
        
        
                for(let sumC of sum.tools) {
                    const button = document.createElement("span")
                    button.innerText = sumC
                    button.classList.add("hbtsBtn") 
                    button.classList.add(sumC) 
                    habilits.appendChild(button)
                }
            
        
            job.appendChild(jobDescription)
            job.appendChild(habilits)
            
                jobContainer.append(job)
        }
    })
})

window.addEventListener("click", (click) => {
    const targetE = click.target
        
    if(targetE.classList.contains("hbtsBtn")) {
        const targetHabilits = click.target

        targetTxt = targetE.innerText

        if(tecss.indexOf(targetTxt) === -1) {
            tecss.push(targetTxt)

        }
        
    if(search.querySelector(`.${targetTxt}`) === null) {
        const span = document.createElement("span")
        span.classList.add("parentRBtn")
        span.classList.add(targetTxt)
        const p = document.createElement("p")
        p.classList.add("tec")
        p.innerText = targetTxt
        const button = document.createElement("button")
        button.classList.add("removeBtn")
        button.innerText = "X"
        
        span.appendChild(p)
        span.appendChild(button)   

        
        search.appendChild(span)

        if(search.hasChildNodes() === true) {
            searchContainer.style.opacity = 1
        }

        const jobs =  document.querySelectorAll(".job") 
        jobs.forEach(job => {
            if(job.querySelector(`.${targetHabilits.innerText}`) === null) {
                job.style.display = "none"
            }});
        }
    }

    if(targetE.innerText === "Clear") {
        search.innerHTML = ""
        tecss = []

        console.log(tecss)
        const tec =  document.querySelectorAll(".job") 
        tec.forEach((searchh) => {

            if(search.hasChildNodes() === false) {
                searchContainer.style.opacity = 0
                searchh.style.display = "flex"
            }
        });
    }

    if(targetE.classList.contains("removeBtn")) {
        const parentE = targetE.closest("span")
        const p = parentE.querySelector("p")
        let removedBtn

        if(tecss.includes(p.innerText) === true) {
            removedBtn = tecss.splice(tecss.indexOf(p.innerText), 1)
            parentE.remove()
            console.log(tecss)
        }
        
        const tec =  document.querySelectorAll(".job") 
        tec.forEach((searchh) => {

            if(searchh.querySelector(`.${p.innerText}`)) {
                searchh.style.display = "none"
            }

            if(searchh.querySelector(`.${tecss[0]}`)) {
                searchh.style.display = "flex"
                
                console.log(searchh)

                if(tecss[1]) {
                    if(searchh.querySelector(`.${tecss[1]}`) ) {
                        searchh.style.display = "flex"
                    } else {
                        searchh.style.display = "none"
                    }
                }
            }

            if(search.hasChildNodes() === false) {
                searchContainer.style.opacity = 0
                searchh.style.display = "flex"
            }
        });
    }    
})



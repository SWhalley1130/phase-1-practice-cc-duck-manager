// write your code here!
document.addEventListener("DOMContentLoaded", ()=>
{
    let globalButton;

   
    ///////////////////////////////////////
    // LOADS DUCKS TO TOP OF SCREEN 
    ///////////////////////////////////////
    init();
    function init()
    {
        return fetch('http://localhost:3000/ducks')
        .then(res=>res.json())
        .then(duckData=>
        {
            loadDuckInfo(duckData[0]);
            duckData.forEach(duck=>
            {
                let duckPic=document.createElement('img');
                duckPic.src=duck.img_url;
                duckPic.addEventListener('click',e=>loadDuckInfo(duck))
                document.querySelector("#duck-nav").append(duckPic);
            })
            ////////////////////////////////////////
            // EVENT LISTENER FOR WHEN LIKE IS CLICKED
            ///////////////////////////////////////
            document.querySelector('#duck-display-likes').addEventListener('click', (e)=>
            {
                globalButton.likes++;
                updateLikes(globalButton);
            })
        })
    }

    ///////////////////////////////////////
    // LOADS DUCK INFO WHEN DUCKS ARE CLICKED 
    ///////////////////////////////////////

    function loadDuckInfo(duck)
    {
        globalButton=duck;
        document.querySelector("#duck-display-name").textContent=duck.name;
        document.querySelector("#duck-display-image").src=duck.img_url;


        let likesString=document.querySelector('#duck-display-likes').textContent
        let currentLikes=parseInt(likesString.split(" ")[0]);
        currentLikes=duck.likes;
        document.querySelector('#duck-display-likes').textContent=`${currentLikes} likes`;
    }

    ///////////////////////////////////////
    // EVENT LISTENER FOR NEW DUCK FORM
    ///////////////////////////////////////

    document.querySelector('#new-duck-form').addEventListener('submit',(e)=>
    {
        e.preventDefault();
        handleSubmit();
    })

    ///////////////////////////////////////
    // POSTS NEW DUCK WHEN SUBMIT IS CLICKED
    ///////////////////////////////////////

    function handleSubmit()
    {
        let inputs=document.querySelectorAll('input');
        let formData=
        {
            name:inputs[0].value,
            img_url:inputs[1].value,
            likes:0
        }
        return fetch('http://localhost:3000/ducks',
        {
            method:"POST",
            headers:
            {
                "Content-Type":'application/json',
                "Accepted":'application/json'
            },
            body:JSON.stringify(formData)
        })
        .then(res=>res.json())
        .then(newDuckData=>
        {
            let duckPic=document.createElement('img');
            duckPic.src=newDuckData.img_url;
            duckPic.addEventListener('click',e=>loadDuckInfo(newDuckData))
            document.querySelector("#duck-nav").append(duckPic);
        })
    }

    ///////////////////////////////////////
    // PATCHES NUMBER FOR LIKES
    ///////////////////////////////////////

    function updateLikes(duck)
    {
        return fetch(`http://localhost:3000/ducks/${duck.id}`,
        {
            method:"PATCH",
            headers:
            {
                "Content-Type":'application/json',
                "Accepted":'application/json'
            },
            body:JSON.stringify(duck)
        })
        .then(res=>res.json())
        .then(newDuckData=>
        {
            document.querySelector('#duck-display-likes').textContent=`${newDuckData.likes} likes`;
        })
    }
        
})

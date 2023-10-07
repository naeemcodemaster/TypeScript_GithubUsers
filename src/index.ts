const getUsername = document.querySelector("#user") as HTMLInputElement;
const formSubmit = document.querySelector("#form") as HTMLFormElement;
const data = document.querySelector('.data') as HTMLElement;

interface UserData {
    idd:number;
    login:string;
    avatar_url:string;
    location:string;
    url:string;
}

// reusable function
async function myCustomFetcher<T>(url:string,options?: RequestInit):Promise<T>{
    const response = await fetch(url,options);
    if(!response.ok){
        throw new Error(`Network response was not ok - status ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
    
}

const showResultUI = (singleUser:UserData) =>{
    const {avatar_url,login,url,location,idd} = singleUser;
    data.insertAdjacentHTML(
        'beforeend',
        `<div class='card'>

        <img src=${avatar_url} alt=${login}/>
        <a href="${url}">Github</a>
        
        </div>`
    )
}

function fetchUserData(url:string){
    myCustomFetcher<UserData[]>(url, {}).then((user)=>{
        for(const singleUser of user){
            showResultUI(singleUser);
        }
    });
}

// Default function call
fetchUserData("https://api.github.com/users");


// Search functionality
formSubmit.addEventListener('submit',async(e)=>{
    e.preventDefault();

    const searchTerm = getUsername.value.toLowerCase();
    try{

        const url = 'https://api.github.com/users';
        const allUserData = await myCustomFetcher<UserData[]>(url,{});

        const matchingUsers = allUserData.filter((user)=>{
            return user.login.toLowerCase().includes(searchTerm);
        });
        // clear previous data
        data.innerHTML = "";

        if(matchingUsers.length === 0){
            data?.insertAdjacentHTML(
                "beforeend",
                `<p>Not Found`
            )
        }else{
            for(const singleUser of matchingUsers){
                showResultUI(singleUser);
            }
        }

    }catch(error){
        console.log(error);
    }
})
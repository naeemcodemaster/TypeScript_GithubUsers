"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const getUsername = document.querySelector("#user");
const formSubmit = document.querySelector("#form");
const data = document.querySelector('.data');
// reusable function
function myCustomFetcher(url, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url, options);
        if (!response.ok) {
            throw new Error(`Network response was not ok - status ${response.status}`);
        }
        const data = yield response.json();
        console.log(data);
        return data;
    });
}
const showResultUI = (singleUser) => {
    const { avatar_url, login, url, location, idd } = singleUser;
    data.insertAdjacentHTML('beforeend', `<div class='card'>

        <img src=${avatar_url} alt=${login}/>
        <a href="${url}">Github</a>
        
        </div>`);
};
function fetchUserData(url) {
    myCustomFetcher(url, {}).then((user) => {
        for (const singleUser of user) {
            showResultUI(singleUser);
        }
    });
}
// Default function call
fetchUserData("https://api.github.com/users");
// Search functionality
formSubmit.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const searchTerm = getUsername.value.toLowerCase();
    try {
        const url = 'https://api.github.com/users';
        const allUserData = yield myCustomFetcher(url, {});
        const matchingUsers = allUserData.filter((user) => {
            return user.login.toLowerCase().includes(searchTerm);
        });
        // clear previous data
        data.innerHTML = "";
        if (matchingUsers.length === 0) {
            data === null || data === void 0 ? void 0 : data.insertAdjacentHTML("beforeend", `<p>Not Found`);
        }
        else {
            for (const singleUser of matchingUsers) {
                showResultUI(singleUser);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}));

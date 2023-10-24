let gradeArray = []; //Initializing an array to store the grades

const getGrades = () =>{ //Function to get grades from comments using the DOM
	let ratingBox = document.getElementsByClassName('MetaItem__StyledMetaItem-y0ixml-0');
	gradeArray = [];
	for(let i=0; i<ratingBox.length; i++){
		if(ratingBox[i].textContent.includes('Grade')){
			gradeArray.push(ratingBox[i].children[0].textContent);
		}
	}
}

const gotMessage = (message, sender, sendResponse) => {
	if(message === 'execute'){ //Function is only called when the button is pressed
		getGrades(); 
		chrome.runtime.sendMessage({text: "data", info: gradeArray}); //Sending the gathered info to the popup file
	}
}

chrome.runtime.onMessage.addListener(gotMessage); //Calls the gotMessage function when the listener detects a message


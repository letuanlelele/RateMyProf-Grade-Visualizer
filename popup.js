let makeChart = (AA, A, BBB, BB, B, CCC, CC, C, DDD, DD) =>
{
    let ctx = document.getElementById('chart').getContext('2d');

    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['A+/A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D'],
            datasets: [{
                label: '# of Votes',
                data: [AA, A, BBB, BB, B, CCC, CC, C, DDD, DD],
                backgroundColor: [
                    '#66ff00',
                    '#a6ff00',
                    '#d1ff00',
                    '#e6ff00',
                    '#ffee00',
                    '#ffd800',
                    '#ffae00',
                    '#ff9800',
                    '#ff5800',
                    '#ff1800'
                ],
                borderColor: [
                    '#66ff00',
                    '#a6ff00',
                    '#d1ff00',
                    '#e6ff00',
                    '#ffee00',
                    '#ffd800',
                    '#ffae00',
                    '#ff9800',
                    '#ff5800',
                    '#ff1800'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1
                    }
                }]
            }
        }
    });
}

const formatInfo = (info) => { //Function to parse the array and gather number of grades
    let labels = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D'];
    let results = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    for(let i=0; i<info.length; i++){
        for(let j=0; j<labels.length; j++){
            if(info[i] === labels[j]){
                results[j]++;
                break; 
            }
        }
    }

    makeChart(results[0]+results[1], results[2], results[3], results[4], results[5],
                results[6], results[7], results[8], results[9], results[10], results[11]); //Calling make char function with grade #s as parameters

}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.text === 'data'){
        formatInfo(message.info);
    }
});



const prompted = () => { //Sends a message to the content script to tell it to run
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, 'execute');
    });
}

prompted(); //Runs when the popup is opened











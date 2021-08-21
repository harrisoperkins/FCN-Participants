// Handy function to make sure not running event listener before load.
window.onload=function(){
  // Get form element
  const form = document.getElementById("form");

  // Get form data on submit and call request function
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    getMeetingParticipants(formData.get("meeting-id-field"));

    //removing left over username divs from previus submission
    let list = document.getElementById("usernames");
    while (list.hasChildNodes()) {  
      list.removeChild(list.firstChild);
    }
  });

  // Make request to server.js
  function getMeetingParticipants(meetingId) {
    fetch(`https://fcn-get-participants.herokuapp.com/?meetingId=${meetingId}`)
      .then(response => { //checking network response
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => { //handling data
        //get the participants object from the json data
        const { participants } = data;
        console.log(participants);

        //check if each person's id has already been added, if not push to array and add the element with their username to the page
        let deviceArray = [];
        for (let i = 0; i < participants.length; i++) {
          if (deviceArray.indexOf(participants[i].id) == -1) {
            deviceArray.push(participants[i].id);
            //adding username to the html file as a div tag
            const usernamesDiv = document.createElement('div');
            usernamesDiv.setAttribute("class", "userClass")
            usernamesDiv.textContent = participants[i].user_name; //set div text content to the participant's username
            document.getElementById("usernames").appendChild(usernamesDiv);
          }
        }
      }
      )
      .catch(error => { //handling network error
        console.error('Error:', error);
      });
  }
}
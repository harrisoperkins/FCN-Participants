// Handy function to make sure not running event listener before load.
window.onload=function(){
  // Get form
  const form = document.getElementById("form");

  // Get form data on submit and call request function
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form)
    getMeetingParticipants(formData.get("meeting-id-field"));
  });

  // Make request to server.js
  function getMeetingParticipants(meetingId) {
    fetch(`https://fcn-get-participants.herokuapp.com/?meetingId=${meetingId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        const { participants } = data;
        let user_names = [];
        for (let i = 0; i < participants.length; i++) {
          console.log(participants[i].user_name);
          const name = participants[i].user_name;
          user_names.push(name);
          const usernamesDiv = document.createElement('div');
          usernamesDiv.textContent = participants[i].user_name;
          document.getElementById("usernames").appendChild(usernamesDiv);
        }
        //document.getElementById("usernames").textContent = user_names;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}
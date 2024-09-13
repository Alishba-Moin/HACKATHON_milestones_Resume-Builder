document.getElementById('dynamic-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
  
    const username = document.getElementById('username') as HTMLInputElement;
    const name = document.getElementById('name') as HTMLInputElement;
    const email = document.getElementById('email') as HTMLInputElement;
    const phoneNo = document.getElementById('phone-no') as HTMLInputElement;
    const education = document.getElementById('education') as HTMLTextAreaElement;
    const workExperience = document.getElementById('work-experience') as HTMLTextAreaElement;
    const skills = document.getElementById('skills') as HTMLTextAreaElement;

    if(username && name && email && phoneNo && education && workExperience && skills){
        const Username = username.value
        const Name = name.value
        const Email = email.value
        const PhoneNo = phoneNo.value
        const Education = education.value
        const WorkExperience = workExperience.value
        const Skills = skills.value
        const uniquePath = `resumes/${Username.replace(/\s+/g, "_")}_index.html`

    
        const ResumeOutput = `
        <h2>${Name}</h2>
        <p><strong>Email:</strong> ${Email}</p>
        <p><strong>Phone-No:</strong> ${PhoneNo}</p>
        <h3>Education</h3>
        <p>${Education}</p>
        <h3>Work Experience</h3>
        <p>${WorkExperience}</p>
        <h3>Skills</h3>
        <p>${Skills}</p>
      `;
  
    const downloadLink = document.createElement('a')
      downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(ResumeOutput)
      downloadLink.download = uniquePath;
      downloadLink.textContent = "Download Your Resume!"


    const resumeOutput = document.getElementById('resume-output');
    if (resumeOutput) {
      resumeOutput.innerHTML = ResumeOutput;
      resumeOutput.classList.remove('hidden')
      resumeOutput.appendChild(downloadLink);

      const button = document.createElement('div');
      button.id = 'button';
      resumeOutput.appendChild(button);

      const downloadButton = document.createElement("button");
      downloadButton.textContent = "Download As PDF";
      downloadButton.addEventListener("click", () => {
        window.print()
      })
      button.appendChild(downloadButton);

      const shareLinkButton = document.createElement("button");
      shareLinkButton.textContent = "Copy Shareable Link!"
      shareLinkButton.addEventListener("click", async() => {
        try{
            const ShareableLink = `https://yourdomain.com/resumes/${Name.replace(/\s+/g, "_")}_index.html`

            await navigator.clipboard.writeText(ShareableLink)
            alert('Shareable Linked Copied To Clipboard!')
        }
        catch(err){
            console.error(`Failed to copy link!`, err);
            alert('Failed To Copy Link To Clipboard.Please Try Again!') 
        }
      });
      button.appendChild(shareLinkButton)
    }
    else{
        console.log("Resume output not found.")
    }
   }else {
        console.log("One or more form elements are missing!"); 
    }
});
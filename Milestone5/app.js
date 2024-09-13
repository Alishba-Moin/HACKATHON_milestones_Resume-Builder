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
var _a;
(_a = document.getElementById('dynamic-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phoneNo = document.getElementById('phone-no');
    const education = document.getElementById('education');
    const workExperience = document.getElementById('work-experience');
    const skills = document.getElementById('skills');
    if (username && name && email && phoneNo && education && workExperience && skills) {
        const Username = username.value;
        const Name = name.value;
        const Email = email.value;
        const PhoneNo = phoneNo.value;
        const Education = education.value;
        const WorkExperience = workExperience.value;
        const Skills = skills.value;
        const uniquePath = `resumes/${Username.replace(/\s+/g, "_")}_index.html`;
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
        const downloadLink = document.createElement('a');
        downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(ResumeOutput);
        downloadLink.download = uniquePath;
        downloadLink.textContent = "Download Your Resume!";
        const resumeOutput = document.getElementById('resume-output');
        if (resumeOutput) {
            resumeOutput.innerHTML = ResumeOutput;
            resumeOutput.classList.remove('hidden');
            resumeOutput.appendChild(downloadLink);
            const button = document.createElement('div');
            button.id = 'button';
            resumeOutput.appendChild(button);
            const downloadButton = document.createElement("button");
            downloadButton.textContent = "Download As PDF";
            downloadButton.addEventListener("click", () => {
                window.print();
            });
            button.appendChild(downloadButton);
            const shareLinkButton = document.createElement("button");
            shareLinkButton.textContent = "Copy Shareable Link!";
            shareLinkButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const ShareableLink = `https://yourdomain.com/resumes/${Name.replace(/\s+/g, "_")}_index.html`;
                    yield navigator.clipboard.writeText(ShareableLink);
                    alert('Shareable Linked Copied To Clipboard!');
                }
                catch (err) {
                    console.error(`Failed to copy link!`, err);
                    alert('Failed To Copy Link To Clipboard.Please Try Again!');
                }
            }));
            button.appendChild(shareLinkButton);
        }
        else {
            console.log("Resume output not found.");
        }
    }
    else {
        console.log("One or more form elements are missing!");
    }
});

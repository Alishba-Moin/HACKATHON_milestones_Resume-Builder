"use strict";
// Select form elements with type-checking
const steps = document.querySelectorAll('.form-step');
const nextButtons = document.querySelectorAll('.next-btn');
const prevButtons = document.querySelectorAll('.prev-btn');
const resumeContent = document.getElementById('resume-output');
const resumeDiv = document.getElementById('resume');
const submitButton = document.getElementById('submit-btn');
const progressSteps = document.querySelectorAll('.progress-step');
const profilePictureInput = document.getElementById('profilePicInput');
const profilePreview = document.getElementById('profilePicPreview');
const profilePicture = document.getElementById('profile-picture');
const editButton = document.getElementById('edit-profile-picture');
const deleteButton = document.getElementById('delete-profile-picture');
// Step counters and counters for dynamic fields
let currentStep = 0;
let educationCount = 1;
let experienceCount = 1;
// Show the first step initially
steps[currentStep]?.classList.add('active');
updateProgress(); // Initialize progress
// Function to update the progress bar
function updateProgress() {
    progressSteps.forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index < currentStep) {
            step.classList.add('completed');
        }
        else if (index === currentStep) {
            step.classList.add('active');
        }
    });
}
// Function to handle navigation between steps
function goToStep(stepIndex) {
    if (stepIndex >= 0 && stepIndex < steps.length) {
        steps[currentStep].classList.remove('active');
        currentStep = stepIndex;
        steps[currentStep].classList.add('active');
        updateProgress();
    }
}
// Event listeners for next and previous buttons
nextButtons.forEach((button) => {
    button.addEventListener('click', () => {
        goToStep(currentStep + 1);
    });
});
prevButtons.forEach((button) => {
    button.addEventListener('click', () => {
        goToStep(currentStep - 1);
    });
});
// Function to add more education fields
function addMoreEducation() {
    const educationFields = document.getElementById('education-fields');
    if (educationFields) {
        const educationEntry = document.createElement('div');
        educationEntry.className = 'education-entry';
        educationEntry.innerHTML = ` 
            <input type="text" class="school" placeholder="School/University" required> 
            <div class="education-inputs"> 
                <input type="text" class="degree" placeholder="Degree" required> 
                <input type="text" class="year" placeholder="Year (e.g., 2022)" required> 
            </div> 
        `;
        educationFields.appendChild(educationEntry);
        educationCount++;
    }
}
// Function to add more experience fields
function addMoreExperience() {
    const experienceFields = document.getElementById('experience-fields');
    if (experienceFields) {
        const experienceEntry = document.createElement('div');
        experienceEntry.className = 'experience-entry';
        experienceEntry.innerHTML = ` 
            <input type="text" class="job-title" placeholder="Job Title" required> 
            <input type="text" class="company" placeholder="Company Name" required> 
            <input type="date" class="start-date" required> 
            <input type="date" class="end-date"> 
            <input class="responsibilities" placeholder="Responsibilities" required></input> 
        `;
        experienceFields.appendChild(experienceEntry);
        experienceCount++;
    }
}
// Add event listeners for adding dynamic fields
document.getElementById('add-more-education')?.addEventListener('click', addMoreEducation);
document.getElementById('add-more-experience')?.addEventListener('click', addMoreExperience);
// Function to retrieve input values safely
function getInputValue(selector) {
    const input = document.querySelector(selector);
    return input ? input.value : null;
}
// Function to handle image upload and preview
function handleImageUpload() {
    if (profilePictureInput?.files && profilePictureInput.files.length > 0) {
        const file = profilePictureInput.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            if (profilePreview) {
                // Show the preview of the selected profile image
                profilePreview.src = event.target?.result;
                profilePreview.style.display = 'block'; // Ensure the preview is shown
            }
            if (profilePicture) {
                // Set the profile picture element to the new image
                profilePicture.src = event.target?.result;
            }
        };
        reader.readAsDataURL(file); // Read the selected file as data URL
    }
}
// Function to change the profile picture
function changeProfilePicture(event) {
    const fileInput = event.target;
    const file = fileInput.files ? fileInput.files[0] : null;
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const profilePicture = document.getElementById('profile-picture');
            if (profilePicture) {
                profilePicture.src = e.target?.result; // Set the new image as source
            }
        };
        reader.readAsDataURL(file); // Read the file as a data URL
    }
}
// Function to delete the profile picture (reset to default)
function deleteProfilePicture() {
    if (profilePicture) {
        // Set the profile picture back to a default image
        profilePicture.src = "default-dlt-img.png"; // Ensure this path points to your default image
    }
    if (profilePreview) {
        // Hide the profile preview after deletion
        profilePreview.style.display = 'none';
    }
}
// Edit Button (for changing the profile picture)
editButton?.addEventListener('click', function () {
    profilePictureInput?.click(); // Trigger the file input
});
// Delete Button (to delete the profile picture)
deleteButton?.addEventListener('click', deleteProfilePicture);
// Function to generate and display the resume content
function generateResumeContent() {
    const name = getInputValue('#name');
    const email = getInputValue('#email');
    const phone = getInputValue('#phone');
    const location = getInputValue('#location'); // Get location from the proper input
    // Check and include profile picture if it exists
    let profilePictureHtml = '';
    if (profilePreview && profilePreview.src) {
        profilePictureHtml = `<img src="${profilePreview.src}" alt="Profile Picture" style="max-width: 150px; margin-bottom: 10px;" />`;
    }
    // Education entries
    const educationEntries = Array.from(document.querySelectorAll('.education-entry')).map(entry => {
        const school = entry.querySelector('.school')?.value || '';
        const degree = entry.querySelector('.degree')?.value || '';
        const year = entry.querySelector('.year')?.value || '';
        return `${degree} at ${school}, Graduated: ${year}`;
    });
    // Experience entries
    const experienceEntries = Array.from(document.querySelectorAll('.experience-entry')).map(entry => {
        const jobTitle = entry.querySelector('.job-title')?.value || '';
        const company = entry.querySelector('.company')?.value || '';
        const startDate = entry.querySelector('.start-date')?.value || '';
        const endDate = entry.querySelector('.end-date')?.value || 'Present';
        const responsibilities = entry.querySelector('.responsibilities')?.value || '';
        return `${jobTitle} at ${company}, ${startDate} - ${endDate} <br> Responsibilities: ${responsibilities}`;
    });
    // Skills
    const skills = (getInputValue('.skills') || '').split(',').map(skill => skill.trim()).filter(skill => skill);
    // Generate the skills list HTML
    const skillsListHtml = skills.length > 0
        ? `<ul class="skills-list">${skills.map(skill => `<li>${skill}</li>`).join('')}</ul>`
        : '<p>No skills provided</p>';
    // Displaying the resume
    if (resumeContent) {
        resumeContent.innerHTML = `
            <div class="header">
                <div class="profile-pic">
                    ${profilePictureHtml}
                </div>
                <h3>${name || 'Name not provided'}</h3>
                <div class="contact-info">
                    <p>Email: ${email || 'N/A'}</p>
                    <p>Phone: ${phone || 'N/A'}</p>
                    <p>Location: ${location || 'Not Provided'}</p> 
                </div>
            </div>
            <h4>Education</h4>
            <p>${educationEntries.join('<br>')}</p>
            <h4>Work Experience</h4>
            <p>${experienceEntries.join('<br>')}</p>
            <h4>Skills</h4>
            ${skillsListHtml}
        `;
    }
    if (resumeDiv) {
        resumeDiv.style.display = 'block';
    }
}
// Add an event listener to handle image upload
profilePictureInput?.addEventListener('change', handleImageUpload);
// Submit button event listener
submitButton?.addEventListener('click', generateResumeContent);
// Editing functionality
document.getElementById('resume-output')?.addEventListener('click', function (event) {
    const target = event.target;
    if (target.classList.contains('edit-btn')) {
        const section = target.dataset.section;
        const contentElement = document.getElementById(`output-${section}`);
        if (contentElement) {
            contentElement.setAttribute('contenteditable', 'true');
            contentElement.focus();
            // Change the button to "Save"
            target.textContent = 'Save';
            target.classList.remove('edit-btn');
            target.classList.add('save-btn');
        }
        else {
            console.error(`Content element for section ${section} not found.`);
        }
    }
    else if (target.classList.contains('save-btn')) {
        const section = target.dataset.section;
        const contentElement = document.getElementById(`output-${section}`);
        if (contentElement) {
            contentElement.setAttribute('contenteditable', 'false');
            // Change the button back to "Edit"
            target.textContent = 'Edit';
            target.classList.remove('save-btn');
            target.classList.add('edit-btn');
        }
        else {
            console.error(`Content element for section ${section} not found.`);
        }
    }
});

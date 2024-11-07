"use strict";
// Select form elements with type-checking
const steps = document.querySelectorAll('.form-step');
const nextButtons = document.querySelectorAll('.next-btn');
const prevButtons = document.querySelectorAll('.prev-btn');
const resumeContent = document.getElementById('resume-content');
const resumeDiv = document.getElementById('resume');
const submitButton = document.getElementById('submit-btn');
const progressSteps = document.querySelectorAll('.progress-step');
const profilePictureInput = document.getElementById('profilePicInput');
const profilePreview = document.getElementById('profilePicPreview');
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
            <input class="responsibilities" type="text" placeholder="Responsibilities" />
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
                profilePreview.src = event.target?.result;
                profilePreview.style.display = 'block'; // Show the preview
            }
        };
        reader.readAsDataURL(file);
    }
}
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

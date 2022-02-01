console.log("test");

document.getElementById('name').focus();


const otherJob = document.getElementById('other-job-role')
otherJob.style.display='none';

const jobRole = document.getElementById('title');

jobRole.addEventListener('input', () => {
    if (event.target.value === 'other') {
        otherJob.style.display='';
    } else {
        otherJob.style.display='none';
    }
});
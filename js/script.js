console.log("test");

document.getElementById('name').focus();


const otherJob = document.getElementById('other-job-role')
otherJob.style.display='none';

const jobRole = document.getElementById('title');

jobRole.addEventListener('input', e => {
event.target.value === 'other' ? otherJob.style.display = '' : otherJob.style.display = 'none';
});

color.disabled = true;

const designOptions = document.querySelectorAll('.shirt-designs option');
const colorOptions = document.querySelectorAll('#color option');

// Program the "Design" <select> element to listen for user changes.
design.addEventListener('input', () => { 
// When a change is detected:
// - The "Color" <select> element should be enabled.
    color.disabled = false;
    const selected = event.target.value;
// - The "Color" <select> element should display an available color.
    for (let i = 0; i < colorOptions.length; i++) {
        const ColorOptionTheme = colorOptions[i].getAttribute('data-theme');
        const availableColors = () => {            
           if (selected === ColorOptionTheme) {
            colorOptions[i].style.display = ''
            colorOptions[i].selected = true;
           } else {
            colorOptions[i].style.display = 'none';
           }
        }
        availableColors()          
    }
    colorOptions[0].style.display = 'none';
});


const activities = document.getElementById('activities');
const total = document.getElementById('activities-cost');
let totalCost = 0;
activities.addEventListener('input', () => {
    const selectedCost = +event.target.getAttribute('data-cost');
    if (event.target.checked) {
        totalCost += selectedCost;
    } else {
        totalCost -= selectedCost
    }
    console.log(totalCost)
    total.innerHTML = `Total: ${totalCost}`;
});


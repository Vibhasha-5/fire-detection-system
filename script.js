// Sensor states for demo
let sensorStates = {
    smoke: 0,
    flame: 0,
    temp: 0,
    danger: 0
};

// Page navigation function
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    // Update nav button active states
    const navButtons = document.querySelectorAll('.nav-links button');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
    });

    const activeNavButton = document.getElementById('nav-' + pageId);
    if (activeNavButton) {
        activeNavButton.classList.add('active');
    }

    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Update sensor values when clicked
function updateSensor(type) {
    const smokeEl = document.getElementById('smoke-value');
    const smokeStatus = document.getElementById('smoke-status');
    const flameEl = document.getElementById('flame-value');
    const flameStatus = document.getElementById('flame-status');
    const tempEl = document.getElementById('temp-value');
    const tempStatus = document.getElementById('temp-status');
    const dangerEl = document.getElementById('danger-value');
    const dangerStatus = document.getElementById('danger-status');

    sensorStates[type] = (sensorStates[type] + 1) % 3;

    if (type === 'smoke') {
        const values = ['45 PPM', '150 PPM', '300 PPM'];
        const statuses = ['SAFE', 'WARNING', 'DANGER'];
        const classes = ['status-safe', 'status-warning', 'status-danger'];
        
        smokeEl.textContent = values[sensorStates.smoke];
        smokeStatus.textContent = statuses[sensorStates.smoke];
        smokeStatus.className = 'status-badge ' + classes[sensorStates.smoke];
    } else if (type === 'flame') {
        const values = ['NO', 'POSSIBLE', 'YES'];
        const statuses = ['SAFE', 'WARNING', 'DANGER'];
        const classes = ['status-safe', 'status-warning', 'status-danger'];
        
        flameEl.textContent = values[sensorStates.flame];
        flameStatus.textContent = statuses[sensorStates.flame];
        flameStatus.className = 'status-badge ' + classes[sensorStates.flame];
    } else if (type === 'temp') {
        const values = ['28°C', '55°C', '85°C'];
        const statuses = ['NORMAL', 'HIGH', 'CRITICAL'];
        const classes = ['status-safe', 'status-warning', 'status-danger'];
        
        tempEl.textContent = values[sensorStates.temp];
        tempStatus.textContent = statuses[sensorStates.temp];
        tempStatus.className = 'status-badge ' + classes[sensorStates.temp];
    } else if (type === 'danger') {
        const values = ['15/100', '60/100', '95/100'];
        const statuses = ['LOW RISK', 'MODERATE', 'HIGH RISK'];
        const classes = ['status-safe', 'status-warning', 'status-danger'];
        
        dangerEl.textContent = values[sensorStates.danger];
        dangerStatus.textContent = statuses[sensorStates.danger];
        dangerStatus.className = 'status-badge ' + classes[sensorStates.danger];
    }
}

// Simulate different alert scenarios
function simulateAlert(level) {
    if (level === 'safe') {
        document.getElementById('smoke-value').textContent = '30 PPM';
        document.getElementById('smoke-status').textContent = 'SAFE';
        document.getElementById('smoke-status').className = 'status-badge status-safe';
        
        document.getElementById('flame-value').textContent = 'NO';
        document.getElementById('flame-status').textContent = 'SAFE';
        document.getElementById('flame-status').className = 'status-badge status-safe';
        
        document.getElementById('temp-value').textContent = '25°C';
        document.getElementById('temp-status').textContent = 'NORMAL';
        document.getElementById('temp-status').className = 'status-badge status-safe';
        
        document.getElementById('danger-value').textContent = '10/100';
        document.getElementById('danger-status').textContent = 'LOW RISK';
        document.getElementById('danger-status').className = 'status-badge status-safe';
        
        alert('✓ All systems normal. Environment is safe.');
    } else if (level === 'warning') {
        document.getElementById('smoke-value').textContent = '180 PPM';
        document.getElementById('smoke-status').textContent = 'WARNING';
        document.getElementById('smoke-status').className = 'status-badge status-warning';
        
        document.getElementById('flame-value').textContent = 'POSSIBLE';
        document.getElementById('flame-status').textContent = 'WARNING';
        document.getElementById('flame-status').className = 'status-badge status-warning';
        
        document.getElementById('temp-value').textContent = '58°C';
        document.getElementById('temp-status').textContent = 'HIGH';
        document.getElementById('temp-status').className = 'status-badge status-warning';
        
        document.getElementById('danger-value').textContent = '65/100';
        document.getElementById('danger-status').textContent = 'MODERATE';
        document.getElementById('danger-status').className = 'status-badge status-warning';
        
        alert('⚠ WARNING: Elevated smoke and temperature levels detected. Monitoring situation...');
    } else if (level === 'danger') {
        document.getElementById('smoke-value').textContent = '350 PPM';
        document.getElementById('smoke-status').textContent = 'DANGER';
        document.getElementById('smoke-status').className = 'status-badge status-danger';
        
        document.getElementById('flame-value').textContent = 'YES';
        document.getElementById('flame-status').textContent = 'DANGER';
        document.getElementById('flame-status').className = 'status-badge status-danger';
        
        document.getElementById('temp-value').textContent = '92°C';
        document.getElementById('temp-status').textContent = 'CRITICAL';
        document.getElementById('temp-status').className = 'status-badge status-danger';
        
        document.getElementById('danger-value').textContent = '98/100';
        document.getElementById('danger-status').textContent = 'HIGH RISK';
        document.getElementById('danger-status').className = 'status-badge status-danger';
        
        alert('🔥 FIRE DETECTED! SMS alert sent to registered numbers. Evacuate immediately!');
    }
}

// Initialize page on load
document.addEventListener('DOMContentLoaded', function() {
    showPage('home');
});
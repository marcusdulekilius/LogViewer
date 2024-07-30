document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = 'http://158.101.165.104/api/generic-logs';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const statusBody = document.getElementById('status-body');
            const uniqueIps = [...new Set(data.map(log => log.ip))];
            
            uniqueIps.forEach(ip => {
                checkDeviceStatus(ip, statusBody);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

function checkDeviceStatus(ip, statusBody) {
    const url = `http://${ip}`;

    fetch(url, { mode: 'no-cors' })
        .then(() => {
            appendStatusRow(ip, 'UP', 'status-up', statusBody);
        })
        .catch(() => {
            appendStatusRow(ip, 'DOWN', 'status-down', statusBody);
        });
}

function appendStatusRow(ip, status, statusClass, statusBody) {
    const row = document.createElement('tr');
    const ipCell = document.createElement('td');
    const statusCell = document.createElement('td');

    ipCell.textContent = ip;
    statusCell.textContent = status;
    statusCell.className = statusClass;

    row.appendChild(ipCell);
    row.appendChild(statusCell);

    statusBody.appendChild(row);
}

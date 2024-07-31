document.addEventListener('DOMContentLoaded', () => {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const apiEndpoint = 'http://158.101.165.104/api/service-status-detail';
    const serviceList = document.getElementById('service-list');

    fetch(proxy + apiEndpoint)
        .then(response => response.json())
        .then(data => {
            serviceList.innerHTML = '';

            const services = Array.isArray(data) ? data : [data];

            let activeCount = 0;
            let inactiveCount = 0;
            const serverCount = {};

            services.forEach(service => {
                const listItem = document.createElement('li');
                listItem.className = 'service-item';

                listItem.innerHTML = `
                    <p><strong>Service ID:</strong> ${service.service_id || 'N/A'}</p>
                    <p><strong>Server Name:</strong> ${service.server_name || 'N/A'}</p>
                    <p><strong>Server IP:</strong> ${service.server_ip || 'N/A'}</p>
                    <p><strong>Service Name:</strong> ${service.service_name || 'N/A'}</p>
                    <p><strong>Status:</strong> ${service.service_status ? 'Active' : 'Inactive'}</p>
                    <p><strong>Last Access:</strong> ${service.last_access ? new Date(service.last_access).toLocaleString() : 'N/A'}</p>
                `;

                serviceList.appendChild(listItem);

                if (service.service_status) {
                    activeCount++;
                } else {
                    inactiveCount++;
                }

                const serverName = service.server_name || 'Unknown';
                if (serverCount[serverName]) {
                    serverCount[serverName]++;
                } else {
                    serverCount[serverName] = 1;
                }
            });

            // Bar chart
            const barChartCtx = document.getElementById('barChart').getContext('2d');
            new Chart(barChartCtx, {
                type: 'bar',
                data: {
                    labels: Object.keys(serverCount),
                    datasets: [{
                        label: 'Number of Services',
                        data: Object.values(serverCount),
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            // Pie chart
            const pieChartCtx = document.getElementById('pieChart').getContext('2d');
            new Chart(pieChartCtx, {
                type: 'pie',
                data: {
                    labels: ['Active', 'Inactive'],
                    datasets: [{
                        data: [activeCount, inactiveCount],
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(255, 99, 132, 0.2)'
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 99, 132, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true
                }
            });
        })
        .catch(error => {
            console.error('Error fetching service data:', error);
        });

    const switchToggle = document.querySelector('.switch input');
    switchToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
    });
});

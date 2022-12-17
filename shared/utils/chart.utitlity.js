export const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      title: {
        display: false,
        text: 'Chart.js Bar Chart',
      }
    },
    scales: {
      x: {
        display: false,
        title: {
          display: true,
          text: 'Month'
        }
      },
      y: {
        display: false,
        title: {
          display: false,
          text: 'Value'
        },
        ticks: {
          color: 'red'
        }
      }
    }
};

export const labels = ['January 1st', 'January 2nd', 'January 3rd', 'January 4th', 'January 5th', 'January 6th', 'January 7th'];
  
export const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => Math.floor(Math.random() * 1000)),
        backgroundColor: '#FDE077',
        borderColor: 'red',
      }
    ],
};
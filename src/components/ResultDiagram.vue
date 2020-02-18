<script>
  import {Pie, mixins} from 'vue-chartjs'

  export default {
    extends: Pie,
    mixins: [mixins.reactiveData, mixins.reactiveProp],
    props: {
      chartData: {type: Object, required: true}
    },
    data() {
      return {
        options: {
          animation: {
            animateRotate: false
          },
          responsive: true,
          lineTension: 2,
          circumference: Math.PI,
          rotation: Math.PI * -1,
          maintainAspectRatio: false,
          tooltips: {
            callbacks: {
              label: function (item, data) {
                let total = 0;
                for (let x of data.datasets[item.datasetIndex].data) {
                  total += x;
                }
                let label = data.labels[item.index] + ": ";
                label += (data.datasets[item.datasetIndex].data[item.index] * 100 / total).toFixed(2) + "%";
                label += " (" + data.datasets[item.datasetIndex].data[item.index] + " Stimmen)";
                return label;
              }
            },
          },
          legend: {
            display: false, // Default canvas legend causes weird sizing issues when
            position: "bottom",
            labels: {
              fontColor: "white",
            },
            onClick: (e) => e.stopPropagation()
          }
        }
      }
    },
    mounted() {
      this.renderChart(this.chartData, this.options);
    },
  }
</script>

<style scoped>
  * {
    padding: 10px;
    color: white;
  }
</style>

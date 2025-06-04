import { useState, useEffect, useRef } from "react";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
  Title,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { getUserExerciseStatistics } from "../../api";

Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
  Title,
  zoomPlugin
);

function StatisticsComponent({ selectedExerciseId }) {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);
  const [options, setOptions] = useState({});

  const handleResetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
  };

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const response = await getUserExerciseStatistics(token, selectedExerciseId);

        const sorted = response
          .map((item) => ({
            x: new Date(item.date),
            weight: item.weight,
            repetitions: item.repetitions,
          }))
          .sort((a, b) => a.x - b.x);

        if (sorted.length === 0) return;

        const firstDate = sorted[0].x;
        const lastDate = sorted[sorted.length - 1].x;

        const isMobile = window.innerWidth < 768;
        const rangeDays = isMobile ? 14 : 30;
        const bufferDays = 2;

        const msDay = 1000 * 60 * 60 * 24;

        const initialMin = new Date(
          Math.max(
            firstDate.getTime(),
            lastDate.getTime() - msDay * (rangeDays + bufferDays)
          )
        );
        const initialMax = new Date(lastDate.getTime() + msDay * bufferDays);

        const limitMin = new Date(firstDate.getTime() - msDay * bufferDays);
        const limitMax = new Date(lastDate.getTime() + msDay * bufferDays);

        // Aquí calculamos el max del eje Y según todos los datasets visibles (todos al principio)
        const calculateYMax = (datasets) => {
          const allY = [];
          datasets.forEach((dataset) => {
            dataset.data.forEach((point) => {
              if (point.y !== null && point.y !== undefined) allY.push(point.y);
            });
          });
          if (allY.length === 0) return 20;
          const max = Math.max(...allY);
          return Math.max(20, Math.ceil(max * 1.15));
        };

        const datasets = [
          {
            label: "Peso (kg)",
            data: sorted.map((d) => ({ x: d.x, y: d.weight })),
            borderColor: "#38ef7d",
            backgroundColor: "rgba(56, 239, 125, 0.2)",
            tension: 0.4,
            pointRadius: 4,
            borderWidth: 3,
            spanGaps: true,
          },
          {
            label: "Repeticiones",
            data: sorted.map((d) => ({ x: d.x, y: d.repetitions })),
            borderColor: "#f97316",
            backgroundColor: "rgba(249, 115, 22, 0.2)",
            tension: 0.4,
            pointRadius: 4,
            borderWidth: 3,
            spanGaps: true,
          },
        ];

        const initialYMax = calculateYMax(datasets);

        setChartData({ datasets });

        setOptions({
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 100,
            easing: "linear",
          },
          scales: {
            x: {
              type: "time",
              time: {
                unit: "day",
                tooltipFormat: "dd MMM yy",
                displayFormats: {
                  day: "dd MMM",
                },
              },
              min: initialMin,
              max: initialMax,
              grid: {
                color: "#2d3748",
              },
              ticks: {
                color: "#cbd5e0",
                autoSkip: true,
                maxRotation: 0,
              },
            },
            y: {
              beginAtZero: true,
              max: initialYMax, // <-- Aquí ya se pone el max correcto al cargar
              grid: {
                color: "#2d3748",
              },
              ticks: {
                color: "#cbd5e0",
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: "#edf2f7",
                font: {
                  size: 14,
                },
              },
              onClick: (e, legendItem, legend) => {
                const chart = legend.chart;
                const originalClick = Chart.defaults.plugins.legend.onClick;
                originalClick.call(legend, e, legendItem, legend);

                // Calculamos max para datasets visibles tras toggle
                const newYMax = (() => {
                  const allY = [];
                  chart.data.datasets.forEach((dataset, i) => {
                    if (!chart.isDatasetVisible(i)) return;
                    dataset.data.forEach((point) => {
                      if (point.y !== null && point.y !== undefined) allY.push(point.y);
                    });
                  });
                  if (allY.length === 0) return 20;
                  const max = Math.max(...allY);
                  return Math.max(20, Math.ceil(max * 1.15));
                })();

                chart.options.scales.y.max = newYMax;
                chart.update({
                  duration: 0,
                  easing: "linear",
                });
              },
            },
            tooltip: {
              backgroundColor: "#1a202c",
              titleColor: "#63b3ed",
              bodyColor: "#ffffff",
              borderColor: "#4a5568",
              borderWidth: 1,
            },
            zoom: {
              limits: {
                x: {
                  min: limitMin.getTime(),
                  max: limitMax.getTime(),
                },
              },
              pan: {
                enabled: true,
                mode: "x",
              },
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: "x",
              },
            },
          },
        });
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStatistics();
  }, [selectedExerciseId]);

  return (
    <div className="bg-gradient-to-b from-red-900 via-gray-900 to-black p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-white text-center mb-4">
        Estadísticas del Ejercicio
      </h2>

      {chartData ? (
        <div className="h-[320px]">
          <Line ref={chartRef} data={chartData} options={options} locale="es" />
        </div>
      ) : (
        <p className="text-gray-400 text-center mt-10">
          No hay datos aún para este ejercicio.
        </p>
      )}

      <div className="flex justify-center gap-4 mt-6">
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition duration-300"
          onClick={handleResetZoom}
        >
          Reiniciar vista
        </button>
      </div>
    </div>
  );
}

export default StatisticsComponent;

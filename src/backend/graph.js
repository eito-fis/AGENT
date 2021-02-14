import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";

export function renderMetrics(agent, metric, container) {
	let values = []

	agent.metrics[metric].forEach((value, i) => {
		values.push({x: i, y: value});
	});

	console.log(values);

	tfvis.render.linechart(
		container.current,
		{values},
		{
			xLabel: "Update steps",
			yLabel: metric,
			height: 170,
		}
	);
}

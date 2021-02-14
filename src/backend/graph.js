import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";

export function renderMetrics(agent, metric, container) {
	data = []
	agent.metrics[metric].forEach((value, i) => {
		data.push([i, value]);
	});
	tfvis.render.linechart({
		container,
		{values: data},
		{
			xLabel: "Update steps",
			yLabel: metric,
		}
	});
}

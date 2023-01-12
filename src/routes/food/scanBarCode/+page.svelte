<script lang="ts">
	import { BrowserBarcodeReader, VideoInputDevice } from '@zxing/library';
	import { onMount } from 'svelte';

	let devices: VideoInputDevice[];
	let selectedDevice: VideoInputDevice;
	let codeReader: BrowserBarcodeReader;
	let resultText: string;

	const start = () => {
		console.log('start');
		codeReader
			.decodeOnceFromVideoDevice(selectedDevice.deviceId, 'video')
			.then((result) => {
				console.log(result);
				resultText = result.getText();
			})
			.catch((err) => {
				console.error(err);
				resultText = err;
			});
		console.log(`Started continous decode from camera with id ${selectedDevice.deviceId}`);
	};

	const reset = () => {
		resultText = '';
		codeReader.reset();
		console.log('Reset.');
	};

	onMount(() => {
		codeReader = new BrowserBarcodeReader();
		console.log('ZXing code reader initialized');
		codeReader
			.getVideoInputDevices()
			.then((videoInputDevices) => {
				devices = videoInputDevices;
				selectedDevice = videoInputDevices[0];
			})
			.catch((err) => {
				console.error(err);
			});
	});
</script>

<div>Scan Barcode</div>

<div>
	<button on:click={() => start()}>Start</button>
	<button on:click={() => reset()}>Reset</button>
</div>

<div>
	<video id="video" width="600" height="400" style="border: 1px solid gray" />
</div>

<label for="sourceSelect">Change video source:</label>
{#if devices}
	<select id="sourceSelect">
		{#each devices as device}
			<option
				on:change={(event) => {
					selectedDevice = devices.filter((device) => {
						return device.deviceId === event.currentTarget.value;
					})[0];
				}}
				value={device.deviceId}>{device.label}</option
			>
		{/each}
	</select>
{/if}

<label>Result: {resultText ?? ''}</label>
<pre><code id="result" /></pre>

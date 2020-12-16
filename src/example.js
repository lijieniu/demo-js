async function test() {
	await getData();
	console.log(222);
}
function getData() {
	return new Promise(resolve => {
		setTimeout(() => {
			console.log(1111);
			resolve();
		}, 1000);
	});
}

test();
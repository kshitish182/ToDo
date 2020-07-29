import * as React from 'react';

const TextArea = () => {

	React.useEffect(() => 
		{
			document.addEventListener('keydown', () => {
				setTimeout(calculateHeight, 0);
			})
		}
	,[]);

	const [height, setHeight]= React.useState<number>(36);
	
	const calculateHeight = () => {
		const ref= document.getElementById('textarea-id');
		if(!ref) {
			return;
		}

			console.log(ref,ref.offsetHeight, ref.scrollHeight);

			return setHeight(ref.scrollHeight);
		}
		
		console.log(height);

	return (
		<textarea id="textarea-id" className="text-input" rows={Math.ceil(height / 18)} style={{height: 'auto', overflow: 'hidden', lineHeight: '18px'}} />
	);
}

export default TextArea;
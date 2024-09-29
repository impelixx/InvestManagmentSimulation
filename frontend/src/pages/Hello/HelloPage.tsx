import { useState } from "react";
import axios from "axios";

export const HelloPage = () => {

  const [response, setResponse] = useState<any>("Update me");

  return (
		<div>
			<h1 className='text-red-200 font-bold underline'>Hello world!</h1>
		</div>
	)
}

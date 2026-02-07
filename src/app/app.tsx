import { Input } from "@/shared/components";
import { MailIcon } from "@/shared/icons";

export const App = () => {
	return (
		<div>
			<h1>App</h1>
			<MailIcon />
			<Input type="text" placeholder="Тест" appearance="primary" />
			<Input type="text" placeholder="Тест" appearance="secondary" />
		</div>
	);
};

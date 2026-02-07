import { PagesRouterProvider } from "./providers/pages-router-provider";
import { QueryClientProviderWrapper } from "./providers/query-client-provider-wrapper";

export const App = () => {
	return (
		<QueryClientProviderWrapper>
			<PagesRouterProvider />
		</QueryClientProviderWrapper>
	);
};

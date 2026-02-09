import { lazy } from "react";

export { Button } from "./button/button";
export { Input } from "./input/input";
export { Container } from "./container/container";
export { Heading } from "./heading/heading";
export { CheckBox } from "./checkbox/checkbox";
export { FallbackLoader } from "./fallback-loader/fallback-loader";
export { Spinner } from "./spinner/spinner";
export { InputLabel } from "./input-label/input-label";

export const Modal = lazy(() =>
	import("./modal/modal").then((module) => ({ default: module.Modal }))
);

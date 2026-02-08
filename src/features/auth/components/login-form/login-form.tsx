import { useMutation } from "@tanstack/react-query";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { useNavigate } from "react-router";

import { queryClient } from "@/shared/api";
import { Button, CheckBox, Input } from "@/shared/components";
import { PAGES_ROUTES } from "@/shared/config";

import { getMeOptions } from "../../api/get-me";
import { handleAuthOptions } from "../../api/handle-auth";
import type { IAuth, IAuthResponse } from "../../model";
import type { IAuthError } from "../../model/auth";

import styles from "./styles.module.scss";

export const LoginForm = () => {
	const [formState, setFormSate] = useState<IAuth>({
		username: "",
		password: ""
	});
	const [authError, setAuthError] = useState<IAuthError | null>(null);
	const [rememberMe, setRememberMe] = useState(false);
	const navigate = useNavigate();
	const onSuccess = (data: IAuthResponse | undefined) => {
		if (data) {
			if (rememberMe) {
				localStorage.setItem("accessToken", data.accessToken);
			} else {
				sessionStorage.setItem("accessToken", data.accessToken);
			}
			queryClient.fetchQuery(getMeOptions);
			navigate(PAGES_ROUTES.PRODUCTS);
		}
	};
	const onError = (error: unknown) => {
		if (error instanceof Error) {
			setAuthError({ message: error.message });
		}
	};
	const { mutate, isPending } = useMutation(
		handleAuthOptions(formState.username, formState.password, onSuccess, onError)
	);
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormSate({
			...formState,
			[e.target.name]: e.target.value
		});
	};
	const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		setAuthError(null);
		mutate();
	};
	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			{!!authError && (
				<div className={styles.error}>
					{authError?.message === "Invalid credentials"
						? "Неверный логин или пароль"
						: "Что то пошло не так попробуйте ещё раз или перезагрузите страницу"}
				</div>
			)}
			<div className={styles.inputs}>
				<div className={styles.field}>
					<label htmlFor="username">Логин</label>
					<Input
						type="text"
						id="username"
						appearance="primary"
						placeholder="Логин"
						name="username"
						onChange={handleChange}
					/>
				</div>
				<div className={styles.field}>
					<label htmlFor="password">Пароль</label>
					<Input
						type="password"
						id="password"
						appearance="primary"
						placeholder="Пароль"
						name="password"
						onChange={handleChange}
					/>
				</div>
			</div>
			<div className={styles.remember}>
				<CheckBox
					onChange={(e) => setRememberMe(e.target.checked)}
					checked={rememberMe}
				/>
				<span>Запомнить меня</span>
			</div>
			<Button appeareence="primary" size="lg" disabled={isPending}>
				Войти
			</Button>
		</form>
	);
};

import { FC, useContext, useEffect, useRef, useState } from 'react';
import useAxios from 'axios-hooks';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

import './LoginSignup.styles.scss';
import { LoginContext } from '../../Contexts/LoginContext';

/*
    This is the login page. UI and functionalities would be added here
*/

enum focusType {
	Add = 'ADD',
	Remove = 'REMOVE',
}

type FormValues = {
	username: string;
	password: string;
};

const Login: FC = () => {
	const [passwordType, setPasswordType] = useState<string>('password');
	const [buttonActive, setButtonActive] = useState<boolean>(false);
	const passwordDiv = useRef<HTMLDivElement>(null);
	const { register, watch } = useForm<FormValues>();
	const { setLoggedInUser } = useContext(LoginContext)!;

	// watch for when the username and password values change
	const watchFields: string[] = watch(['username', 'password']);

	const focusHandler = (type: focusType) => {
		if (type === focusType.Add) {
			passwordDiv.current!.classList.add('focus');
		} else if (type === focusType.Remove) {
			passwordDiv.current!.classList.remove('focus');
		} else {
			return;
		}
	};

	const [{ loading }, handleLogin] = useAxios(
		{
			url: '/auth/login',
			method: 'post',
		},
		{ manual: true }
	);

	const handleSubmit = () => {
		localStorage.setItem(
			'loggedInUser',
			JSON.stringify({ name: 'Uchechukwu', token: 'jhdvahjvjhdavjhav' })
		);
		setLoggedInUser({ name: 'Uchechukwu', token: 'jhdvahjvjhdavjhav' });
	};

	useEffect(() => {
		// disable or enable submit button based on username and password value length
		if (watchFields[0]?.length && watchFields[1]?.length) {
			setButtonActive(true);
		} else {
			setButtonActive(false);
		}
	}, [watchFields]);

	return (
		<section id='login'>
			<div className='login__container'>
				<h1 className='get__started'>Welcome to Employees Get Information</h1>
				<div className='arrow__down'>{/* <ArrowDown /> */}</div>
				<form action='' className='login__form' onSubmit={handleSubmit}>
					<h3 className='follow__up__text'>Login</h3>
					<div className='form__group'>
						<label htmlFor='username'></label>
						<input
							type='username'
							id='username'
							placeholder='Username'
							{...register('username', {
								required: true,
								// pattern: {
								// 	value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								// 	message: 'username field requires an “aiesec.net” mail',
								// },
							})}
							required
						/>
						<p className='error_username'></p>
						<p className='error_username'></p>
					</div>
					<div className='form__group'>
						<label htmlFor='password'></label>
						<div className='password__eye__div' ref={passwordDiv}>
							<input
								type={passwordType}
								id='password'
								placeholder='Password'
								{...register('password', {
									required: true,
									pattern: {
										value:
											/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
										message:
											'Password should be at least 8 characters, 1 uppercase letter, 1 lowercase leter, 1 number & 1 Symbol',
									},
								})}
								onFocus={() => focusHandler(focusType.Add)}
								onBlur={() => focusHandler(focusType.Remove)}
								required
							/>
							<span
								className={
									passwordType === 'password' ? 'eye__slash' : 'eye__slash none'
								}
								onClick={() => setPasswordType('text')}
							>
								<AiFillEyeInvisible />
							</span>
							<span
								className={passwordType === 'text' ? 'eye' : 'eye none'}
								onClick={() => setPasswordType('password')}
							>
								<AiFillEye />
							</span>
						</div>
					</div>

					<button className='submit__button' disabled={!buttonActive}>
						LOG IN
					</button>

					<div className='reset__password__link'>
						<p className='forgot__password'>
							Don't have an account? &nbsp;
							<Link to='/signup'>Signup</Link>
						</p>

						<p className='reset__password'>
							<Link to='/'>ResetPassword</Link>
						</p>
					</div>
				</form>

				<p className='copyright__text'>© Copyright pmcrg 2021.</p>
			</div>
		</section>
	);
};

export default Login;

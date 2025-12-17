import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import './MapAuthorization.css'; // 

interface FormData {
  login: string;
  password: string;
}

interface InputState {
  focused: boolean;
  hasValue: boolean;
}

type InputStates = Record<keyof FormData, InputState>;

export const MapAuthorization = (): ReactNode => {
    const [formData, setFormData] = useState<FormData>({
        login: '',
        password: ''
      });
      
      const [inputStates, setInputStates] = useState<InputStates>({
        login: { focused: false, hasValue: false },
        password: { focused: false, hasValue: false }
      });
    
      const loginRef = useRef<HTMLInputElement>(null);
      const passwordRef = useRef<HTMLInputElement>(null);
    
      useEffect(() => {
        // Проверяем начальные значения при монтировании
        if (loginRef.current) {
          setInputStates(prev => ({
            ...prev,
            login: { ...prev.login, hasValue: loginRef.current!.value.trim() !== '' }
          }));
        }
        
        if (passwordRef.current) {
          setInputStates(prev => ({
            ...prev,
            password: { ...prev.password, hasValue: passwordRef.current!.value.trim() !== '' }
          }));
        }
      }, []);
    
      const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        setInputStates(prev => ({
          ...prev,
          [name]: { ...prev[name as keyof FormData], hasValue: value.trim() !== '' }
        }));
      };
    
      const handleFocus = (name: keyof FormData): void => {
        setInputStates(prev => ({
          ...prev,
          [name]: { ...prev[name], focused: true }
        }));
      };
    
      const handleBlur = (name: keyof FormData): void => {
        setInputStates(prev => ({
          ...prev,
          [name]: { 
            ...prev[name], 
            focused: false,
            hasValue: formData[name].trim() !== ''
          }
        }));
      };
    
      const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        
        console.log('Логин:', formData.login);
        console.log('Пароль:', formData.password);
        
        alert('Вход выполнен успешно');
      };
    
      const getInputClassName = (name: keyof FormData): string => {
        const state = inputStates[name];
        return `form-group ${state.focused ? 'focused' : ''} ${state.hasValue ? 'has-value' : ''}`;
      };
    
      return (
        <div className="login-container">
          <h1 className="login-title">Вход в личный кабинет</h1>
          
          <form id="loginForm" onSubmit={handleSubmit}>
            <div className={getInputClassName('login')}>
              <input
                ref={loginRef}
                type="text"
                id="login"
                name="login"
                placeholder=" "
                required
                value={formData.login}
                onChange={handleInputChange}
                onFocus={() => handleFocus('login')}
                onBlur={() => handleBlur('login')}
              />
              <label htmlFor="login">Логин</label>
            </div>
            
            <div className={getInputClassName('password')}>
              <input
                ref={passwordRef}
                type="password"
                id="password"
                name="password"
                placeholder=" "
                required
                value={formData.password}
                onChange={handleInputChange}
                onFocus={() => handleFocus('password')}
                onBlur={() => handleBlur('password')}
              />
              <label htmlFor="password">Пароль</label>
            </div>
            
            <button type="submit" className="login-button">
              Войти
            </button>
          </form>
        </div>
      );
}
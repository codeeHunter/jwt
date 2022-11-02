import React, {useContext, useEffect, useState} from 'react';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {IUser} from "./models/IUser";
import UserService from "./services/UserService";

function App() {
  const {store} = useContext(Context)
  const [users, setUsers] = useState<IUser[]>([])
  
  useEffect(() => {
    if(localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])
  
  const getUsers = async () => {
    try {
      const response = await UserService.fetchUsers()
      setUsers(response.data)
    } catch (e) {
      console.log(e)
    }
  }
  
  if(store.isLoading) {
    return <div>Загрузка...</div>
  }
  
  if(!store.isAuth) {
    return (
      <LoginForm />
    )
  }
  
  console.log(store.user.isActivated)
  
  return (
    <div className="App">
      <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : "Авторизуйтесь!" }</h1>
      <h1>{store.user.isActivated ? "Аккаунт потвержден по почте": "Потвердите аккаунт"}</h1>
      <button onClick={() => store.logout()}>Выйти</button>
      <div>
        <button onClick={getUsers}>Получить пользователей</button>
      </div>
      {users.map(user =>
        <div key={user.id}>{user.email}</div>
      )}
    </div>
  );
}

export default observer(App);

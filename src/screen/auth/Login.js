import React, { useCallback, useState } from 'react';
import {View, Text} from 'react-native';
import {AppContainer} from '../../components/AppContainer';
import {BackButton} from '../../components/button/BackButton';
import {Spacer} from '../../components/Spacer';
import {AppHeading} from '../../components/AppHeading';
import { AppInput } from '../../components/AppInput';
import { fieldTypes } from '../../constant/type';
import { AppButton } from '../../components/button/AppButton';
import { Validator } from '../../helper/Validator';

const Login = () => {
  const [data,setData] = useState({
    email: "",
    password: "",
  });
  const [error,setError] = useState({
    type: "",
    msg: ""
  });

  const changeFieldByType=useCallback((value, key)=>{
    let _data = data;
    _data[key] = value;
    setData({..._data});
  },[data]);

  const getErrorByType=useCallback((type)=>{
    if(error.type === type){
      return error.msg;
    }
    return "";
  },[error]);

  const onSubmit=useCallback(()=>{
    if(data.email === ""){
      const msg = "Email is required";
      setError({msg, type: fieldTypes.email});
      return;
    }
    if(!Validator.validateEmail(data.email)){
      const msg = "Email is not valid";
      setError({msg, type: fieldTypes.email});
      return;
    }
    if(data.password === ""){
      const msg = "Password is required";
      setError({msg, type: fieldTypes.password});
      return;
    }
    setError({msg: "", type: ""});
  },[data,error]);

  return (
    <AppContainer>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
        }}>
        <BackButton />
        <View
          style={{
            padding: 10,
          }}>
          <AppHeading title={'Sign in'} fontSize={32} />
          <Spacer size={30}/>
          <AppInput
            label='Email'
            onChangeText={(value)=>changeFieldByType(value, fieldTypes.email)}
            defaultValue={data.email}
            error={getErrorByType(fieldTypes.email)}
            keyboardType={"email-address"}
            autoCapitalize="none"
          />
          <Spacer/>
          <AppInput
            label='Password'
            onChangeText={(value)=>changeFieldByType(value, fieldTypes.password)}
            defaultValue={data.password}
            error={getErrorByType(fieldTypes.password)}
          />
          <Spacer size={50} />

          <AppButton
            title="SIGN IN"
            onPress={onSubmit}
          />
        </View>
      </View>
    </AppContainer>
  );
};

export default Login;

import React, { useCallback, useEffect, useState } from 'react';
import {View, Text} from 'react-native';
import {AppContainer} from '../../components/AppContainer';
import {BackButton} from '../../components/button/BackButton';
import {Spacer} from '../../components/Spacer';
import {AppHeading, AppText} from '../../components/AppHeading';
import { AppInput } from '../../components/AppInput';
import { fieldTypes } from '../../constant/type';
import { AppButton } from '../../components/button/AppButton';
import { Row } from '../../components/Row';
import { Icons } from '../../assets/icons';
import { TouchableButton } from '../../components/TouchableButton';
import { AppNavigation } from '../../route/app_navigation';
import { Validator } from '../../helper/Validator';
import { getRegisterForm } from '../../api/form';
import { registerUserByApi } from '../../api/api_method/AuthApi';
import { Helper } from '../../helper/Helper';
import { setLoginDetail } from '../../store/action';

const Register = () => {
  const [data,setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    activity: false,
  });
  const [error,setError] = useState({
    type: "",
    msg: ""
  });

  useEffect(()=>{
    setData({...data, activity: false});
  },[])


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
    if(data.name === ""){
      const msg = "Name is required";
      setError({msg, type: fieldTypes.name});
      return;
    }
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
    if(data.confirmPassword === ""){
      const msg = "Confirm Password is required";
      setError({msg, type: fieldTypes.confirmPassword});
      return;
    }
    if(data.confirmPassword !== data.password){
      const msg = "Password and Confirm Password not match";
      setError({msg, type: fieldTypes.confirmPassword});
      return;
    }
    setError({msg: "", type: ""});
    registerUser();
  },[data,error]);

  const registerUser=useCallback(async()=>{
    const form = getRegisterForm({
      name: data.name,
      email: data.email,
      password: data.password
    });
    setData({...data, activity: true});
    const res = await registerUserByApi({form});
    setData({...data, activity: false});
    if(res.detail){
      const user = {
        ...res.detail?.newUser,
        token: res.detail?.token,
      };
      setLoginDetail(user);
    }
  },[data]);

  const onLogin=useCallback(()=>{
    AppNavigation.navigateToLogin();
  },[])

  return (
    <AppContainer>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
        }}>
        {/* <BackButton /> */}
        <View
          style={{
            padding: 10,
          }}>
          <AppHeading title={'Sign up'} fontSize={32} />
          <Spacer size={30}/>
          <AppInput
            label='Name'
            onChangeText={(value)=>changeFieldByType(value, fieldTypes.name)}
            defaultValue={data.name}
            error={getErrorByType(fieldTypes.name)}
          />
          <Spacer/>
          <AppInput
            label='Email'
            onChangeText={(value)=>changeFieldByType(value, fieldTypes.email)}
            defaultValue={data.email}
            error={getErrorByType(fieldTypes.email)}
          />
          <Spacer/>
          <AppInput
            label='Password'
            onChangeText={(value)=>changeFieldByType(value, fieldTypes.password)}
            defaultValue={data.password}
            error={getErrorByType(fieldTypes.password)}
          />
          <Spacer/>
          <AppInput
            label='Confirm Password'
            onChangeText={(value)=>changeFieldByType(value, fieldTypes.confirmPassword)}
            defaultValue={data.confirmPassword}
            error={getErrorByType(fieldTypes.confirmPassword)}
          />
          <Spacer/>
          <TouchableButton onPress={onLogin} style={{alignItems: 'flex-end'}}>
            <Row gap={5}>
              <AppText
                title={"Already have an account?"}
              />
              <Icons.RightArrowIcon/>
            </Row>
          </TouchableButton>
          <Spacer size={50} />

          <AppButton
            title="SIGN UP"
            onPress={onSubmit}
            activity={data.activity}
          />
        </View>
      </View>
    </AppContainer>
  );
};

export default Register;

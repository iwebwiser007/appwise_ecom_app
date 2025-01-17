import React, { useCallback, useState } from 'react';
import {View, Text} from 'react-native';
import {AppContainer} from '../../components/AppContainer';
import {BackButton} from '../../components/button/BackButton';
import {Spacer} from '../../components/Spacer';
import {AppHeading, AppText} from '../../components/AppHeading';
import { AppInput } from '../../components/AppInput';
import { fieldTypes } from '../../constant/type';
import { AppButton } from '../../components/button/AppButton';
import { Validator } from '../../helper/Validator';
import { loginUserByApi } from '../../api/api_method/AuthApi';
import { Helper } from '../../helper/Helper';
import { setUserStorage } from '../../store/Asyncstorage';
import { setLoginDetail } from '../../store/action';
import { Icons } from '../../assets/icons';
import { Row } from '../../components/Row';
import { TouchableButton } from '../../components/TouchableButton';
import { colors } from '../../constant/color';
import { AppNavigation } from '../../route/app_navigation';

const Login = () => {
  const [data,setData] = useState({
    email: "tulsi111197@gmail.com",
    password: "123456",
    activity: false,
  });
  const [error,setError] = useState({
    type: "",
    msg: "",
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

  const onSubmit=useCallback(async()=>{
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
    setData({...data, activity: true});
    const res = await loginUserByApi({
      email: data.email,
      password: data.password
    });
    const user = {
      ...res.detail?.user,
      token: res.detail?.token
    }
    Helper.log("user",user);
    if(res.detail){
      setLoginDetail(user);
    }
    setData({...data, activity: false});
  },[data,error]);

  const onForgetPassword=useCallback(()=>{
    AppNavigation.navigateToForgetPassword()
  },[])

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
          <Spacer/>
                    <TouchableButton onPress={onForgetPassword} style={{alignItems: 'flex-end'}}>
                      <Row gap={5}>
                        <AppText
                          title={"Forgot your password?"}
                        />
                        <Icons.RightArrowIcon color={colors.primary}/>
                      </Row>
                    </TouchableButton>
          <Spacer size={50} />

          <AppButton
            title="SIGN IN"
            onPress={onSubmit}
            activity={data.activity}
            disabled={data.activity}
          />
        </View>
      </View>
    </AppContainer>
  );
};

export default Login;

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
import { h } from '../../constant/dimension';

const ForgetPassword = () => {
  const [data,setData] = useState({
    email: "",
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
          <AppHeading title={'Forget password'} fontSize={32} />
          <Spacer size={h(6)}/>
          <AppText
            title={"Please, enter your email address. You will receive a link to create a new password via email."}

          />
          <Spacer size={20}/>
          <AppInput
            label='Email'
            onChangeText={(value)=>changeFieldByType(value, fieldTypes.email)}
            defaultValue={data.email}
            error={getErrorByType(fieldTypes.email)}
            keyboardType={"email-address"}
            autoCapitalize="none"
          />
          <Spacer/>
          <Spacer size={50} />

          <AppButton
            title="SEND"
            onPress={onSubmit}
            activity={data.activity}
            disabled={data.activity}
          />
        </View>
      </View>
    </AppContainer>
  );
};

export default ForgetPassword;

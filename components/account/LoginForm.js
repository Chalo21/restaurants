import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'

import Loading from '../Loading'

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValues())
    
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    
    const [loading, setLoading] = useState(false)
    
    const navigation = useNavigation()

    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text})
    }

    const doLogin = () => {
        console.log("Login")
    }
    return (
        <View style ={styles.container}>
            <Input
                containerStyle={styles.input}
                placeholder= "Ingresa tu email..."
                onChange={(e) => onChange(e, "email")}
                keyboardType="email-address"
                errorMessage={errorEmail}
                defaultValue={formData.email}
                />
            <Input
                containerStyle={styles.input}
                placeholder= "Ingresa tu contraseña..."
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                    type="material-community"
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    iconStyle={styles.icon}
                    onPress={() => setShowPassword(!showPassword)}
                    />
                }
                onChange={(e) => onChange(e, "password")}
                errorMessage={errorPassword}
                defaultValue={formData.password}
            />
            <Button
                title="Iniciar Sesión"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => doLogin()}
            />
            <Loading isVisible={loading} text="Iniciando Sesión..."/> 
        </View>
    )
}

const defaultFormValues = () => {
    return { email: "", password: "" }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },

    input : {
        width: "100%"
    },

    btnContainer :{
        marginTop: 20,
        width: "95%",
        alignSelf: "center"
    },

    btn : {
        backgroundColor: "#6d1a1a"
    },

    icon : {
        color: "#84bcbc"
    }
})

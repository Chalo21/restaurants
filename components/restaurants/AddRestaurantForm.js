import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'

export default function AddRestaurantForm({ toastRef, setLoading, navigation}) {
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorName, setErrorName] = useState(null)
    const [errorDescription, setErrorDescription] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorAddress, setErrorAddress] = useState(null)
    const [errorPhone, setErrorPhone] = useState(null)

    const AddRestaurant = () => {
        console.log(formData)
        console.log("Meloooooooooo")
    }
    return (
        <View style={styles.viewContainer}>
            <FormAdd
                formData={formData}
                setFormData={setFormData}
                errorName={errorName}
                errorDescription={errorDescription}
                errorEmail={errorEmail}
                errorPhone={errorPhone}
            />
            <Button
                title="Crear Restaurante"
                onPress={AddRestaurant}
                buttonStyle={styles.btnAddRestaurant}
            />
        </View>
    )
}

function FormAdd({ formData, setFormData, errorName, errorDescription, errorEmail, errorAddress, errorPhone}) {
    const [country, setCountry] = useState("CO")
    const [callingCode, setCallingCode] = useState("57")
    const [phone, setPhone] = useState("")

    const onChange = (e, type) => {
        setFormData({... formData, [type]: e.nativeEvent.text})
    }

    return (
        <View style={styles.viewForm}>
            <Input
                placeholder="Nombre del restaurante..."
                defaultValue={formData.name}
                onChange={(e) => onChange(e, "name")}
                errorMessage={errorName}
            />
            <Input
                placeholder="Dirección del restaurante..."
                defaultValue={formData.address}
                onChange={(e) => onChange(e, "address")}
                errorMessage={errorAddress}
            />
            <Input
                placeholder="Email del restaurante..."
                keyboardType="email-address"
                defaultValue={formData.email}
                onChange={(e) => onChange(e, "email")}
                errorMessage={errorEmail}
            />
            <View style={styles.phoneView}>
                <CountryPicker
                    withFlag
                    withCallingCode
                    withFilter
                    withCallingCodeButton
                    containerStyle={styles.countryPicker}
                    countryCode={country}
                    onSelect={(country) => {
                        setFormData({...formData, "country": country.cca2, "callingCode": country.callingCode[0]})
                    }}
                />
                <Input
                    placeholder="WhatsApp del restaurante..."
                    keyboardType="phone-pad"
                    containerStyle={styles.inputPhone}
                    defaultValue={formData.phone}
                    onChange={(e) => onChange(e, "phone")}
                    errorMessage={errorPhone}
                />
            </View>
                <Input
                    placeholder="Descripción del restaurante..."
                    multiline
                    containerStyle={styles.textArea}
                    defaultValue={formData.description}
                    onChange={(e) => onChange(e, "description")}
                    errorMessage={errorDescription}
                />
        </View>
    )
}

const defaultFormValues = () => {
    return {
        name: "",
        description: "",
        email: "",
        phone: "",
        address: "",
        country: "CO",
        callingCode: "57"
    }
}

const styles = StyleSheet.create({
    viewContainer : {
        height:"100%"
    },
    viewForm : {
        marginHorizontal: 10,
    },
    textArea : {
        height: 100,
        width: "100%"
    },
    phoneView : {
        width: "80%",
        flexDirection: "row"
    },
    inputPhone : {
        width: "80%"
    },
    btnAddRestaurant :{
        margin: 20,
        backgroundColor:"#6d1a1a"
    }
})
